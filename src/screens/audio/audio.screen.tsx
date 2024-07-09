import { StatusBar } from "expo-status-bar"
import { View, Text, TouchableOpacity } from "react-native"
import { RootStackParamList, ScreenName } from "../../navigation/navigation.model";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import { setCurrentTrack } from "store/audio/audio.slice";
import { useAppDispatch, useAppSelector } from "store";
import { State } from "react-native-track-player";
import NoteIcon from "assets/svg/note.svg";
import Play from "assets/svg/play-second.svg";
import Pause from "assets/svg/pause-second.svg";
import Next from "assets/svg/next.svg";
import Prev from "assets/svg/prev.svg";
import styles, { SIZE_ICON } from "./audio.style";
import Slider from "@react-native-community/slider";
import { formatSecondsToTime } from "utils/format.utils";
import { useAudioPlayerContext } from "contexts/audio/audio.context";
import { AudioLayout } from "components/layouts/audio-layout";

export type AudioScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  ScreenName.audio
>;

export function AudioScreen({ route }: AudioScreenNavigationProp) {
    const { 
      isPlayerReady, 
      position ,
      togglePlayback, 
      skipToTrack, 
      activeTrack , 
      playBackState, 
      skipToNext, 
      skipToPrev, 
      skipToPosition, 
      setIsWidgetPlayerHidden, 
      isWidgetPlayerHidden, 
      isFirstTrack, 
      isLastTrack, 
       
    } = useAudioPlayerContext()
    const { audio, audioProgress, currentTrack } = useAppSelector(state => state.audio);
    const [positionInternal, setPositionInternal] = useState(0)
    const [isSliding, setIsSliding] = useState(false)
    const [disabledInternal, setDisabledInternal] = useState<boolean | null>(null)
    const isFirstRender = useRef(false);

    const dispatch = useAppDispatch();

    useEffect(()=>{
      isFirstRender.current = true;
      if(route.params.item.id !== currentTrack){
        const currentIndex = audio.findIndex((elem) => route.params.item.id === elem.id)
        if(currentIndex > -1){
          dispatch(setCurrentTrack(route.params.item.id))
          skipToTrack(currentIndex)
        }
      }
    },[])

    useEffect(() => {
      if (!isSliding && isFirstRender.current && isPlayerReady) {
        setPositionInternal(position)
      }
    }, [position])
    
    useEffect(() => {
      if ( activeTrack?.id && audioProgress[activeTrack?.id] !== undefined) {
        setPositionInternal(audioProgress[activeTrack?.id])
      }
    }, [activeTrack?.id])

    useEffect(()=>{
      if(!isWidgetPlayerHidden){
        setIsWidgetPlayerHidden(true)
      }

      return ()=>{
        setIsWidgetPlayerHidden(false)
      }
    }, [])

    const onPrev = ()=>{
      if(isFirstTrack){
        skipToPosition(0)
      }else{
        skipToPrev();
      }
    }

    const onNext = ()=>{
      if(isLastTrack){
        skipToPosition(0)
      }else{
        skipToNext();
      }
    }
    return (
      // <AudioLayout route={route}>
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={{width: "100%"}}>
            <View style={styles.header}>
              <View style={styles.preview}>
                <NoteIcon width={240} height={240} fill="#000" />
              </View>
              <View>
                <Text style={styles.title} numberOfLines={1}>{activeTrack?.name}</Text>
                <Text style={styles.description} numberOfLines={2}> 
                  {activeTrack?.description || "unset"}
                </Text>
              </View>
            </View>
            <View style={styles.range}>
              <Slider
                maximumValue={activeTrack?.duration || 0}
                minimumTrackTintColor={"#000"}
                minimumValue={0}
                onSlidingComplete={(value) => {
                  setTimeout(() => setIsSliding(false), 900)
                  skipToPosition(value)
                }}
                onSlidingStart={() => setIsSliding(true)}
                onValueChange={setPositionInternal}
                style={[styles.sliderContainer]}
                thumbTintColor={"#000"}
                value={disabledInternal ? 0 : positionInternal}
              />
              <View style={styles.time}> 
                <Text>{formatSecondsToTime(Math.floor(position),true)}</Text>
                <Text>{formatSecondsToTime(Math.floor(activeTrack?.duration || 0),true)}</Text>
              </View>
            </View>
            </View>

            <View style={styles.actions}>
      
              <View style={styles.actions__nav}>
                <TouchableOpacity style={styles.actions__nav__prev} onPress={onPrev}>
                  <Prev width={SIZE_ICON} height={SIZE_ICON} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actions__nav__play} onPress={()=> togglePlayback(playBackState)}>
                  {
                    playBackState === State.Playing ? <Pause width={SIZE_ICON* 1.5} height={SIZE_ICON* 1.5} /> : <Play width={SIZE_ICON * 1.5} height={SIZE_ICON * 1.5} />
                  }
                </TouchableOpacity>
                <TouchableOpacity style={styles.actions__nav__prev} onPress={onNext}>
                  <Next width={SIZE_ICON} height={SIZE_ICON} />
                </TouchableOpacity>
              </View>
            </View>

        </View>
      // </AudioLayout>
    );
}