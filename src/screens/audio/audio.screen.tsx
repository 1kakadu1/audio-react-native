import { StatusBar } from "expo-status-bar"
import { View, Text, TouchableOpacity } from "react-native"
import { RootStackParamList, ScreenName } from "../../navigation/navigation.model";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { setCurrentTrack } from "store/audio/audio.slice";
import { useAppDispatch, useAppSelector } from "store";
import { State } from "react-native-track-player";
import NoteIcon from "assets/svg/note.svg";
import Play from "assets/svg/play-second.svg";
import Pause from "assets/svg/pause-second.svg";
import Download from "assets/svg/download.svg";
import Upload from "assets/svg/upload.svg";
import Next from "assets/svg/next.svg";
import Prev from "assets/svg/prev.svg";
import styles, { SIZE_ICON } from "./audio.style";
import Slider from "@react-native-community/slider";
import { formatSecondsToTime } from "utils/format.utils";
import { useAudioPlayerContext } from "contexts/audio/audio.context";
import {Image} from "react-native-expo-image-cache";
import { useDownloadAudio } from "contexts/dowlnoad/dowload.hook";
import { useNetInfo } from "@react-native-community/netinfo";

export type AudioScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  ScreenName.audio
>;

export function AudioScreen({ route }: AudioScreenNavigationProp) {
    const { isConnected } = useNetInfo();
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
    const { audio, audioProgress, currentTrack, audioDownload } = useAppSelector(state => state.audio);
    const [positionInternal, setPositionInternal] = useState(0)
    const [isSliding, setIsSliding] = useState(false)
    const [disabledInternal, setDisabledInternal] = useState<boolean | null>(null)
    const { download, downloadProgress } = useDownloadAudio();
    const isFirstRender = useRef(false);

    const disabled = useMemo(()=>{
      if(activeTrack === undefined){
          return true
      }

      if(isConnected === false && activeTrack && activeTrack?.url.indexOf("file")){
          return true
      }

      return false;
  }, [isConnected, activeTrack])
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

    useEffect(()=>{
      setDisabledInternal(disabled);
    }, [disabled])

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
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={{width: "100%"}}>
            <View style={styles.header}>
              {
                activeTrack?.image ? (
                  <Image 
                  style={styles.image}
                  uri={activeTrack?.image} 
                  />
                )
                :
                (
                  <View style={styles.preview}>
                    <NoteIcon width={240} height={240} fill="#000" />
                  </View>
                )
              }

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
              <View style={{width: "100%", alignItems: "center", justifyContent: "flex-end", flexDirection: "row" }}>
                {
                  activeTrack && downloadProgress[activeTrack?.id] && downloadProgress[activeTrack?.id] !== 100 ? <Text>{(downloadProgress[activeTrack?.id]*100).toFixed(0)}%</Text> : null
                }
                <TouchableOpacity 
                disabled={disabled}
                onPress={()=>{
                  activeTrack && download(activeTrack)
                }}>
                  { activeTrack && audioDownload[activeTrack?.id] ? <Upload width={30} height={30} /> : <Download width={30} height={30} />}  
                </TouchableOpacity>
              </View>
              <View style={styles.actions__nav}>
                <TouchableOpacity disabled={disabled} style={styles.actions__nav__prev} onPress={onPrev}>
                  <Prev width={SIZE_ICON} height={SIZE_ICON} />
                </TouchableOpacity>
                <TouchableOpacity disabled={disabled} style={styles.actions__nav__play} onPress={()=> togglePlayback(playBackState)}>
                  {
                    playBackState === State.Playing ? <Pause width={SIZE_ICON* 1.5} height={SIZE_ICON* 1.5} /> : <Play width={SIZE_ICON * 1.5} height={SIZE_ICON * 1.5} />
                  }
                </TouchableOpacity>
                <TouchableOpacity disabled={disabled} style={styles.actions__nav__prev} onPress={onNext}>
                  <Next width={SIZE_ICON} height={SIZE_ICON} />
                </TouchableOpacity>
              </View>
            </View>

        </View>
    );
}