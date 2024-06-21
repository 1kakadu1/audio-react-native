import { StatusBar } from "expo-status-bar"
import { View, Text } from "react-native-ui-lib"
import { RootStackParamList, ScreenName } from "../../navigation/navigation.model";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { LayoutBase } from "components/layouts/layoute-base";
import { useEffect } from "react";
import { setAudioList, setAudioProgress, setCurrentTrack } from "store/audio/audio.slice";
import { useAppDispatch, useAppSelector } from "store";
import TrackPlayer, { State } from "react-native-track-player";
import { useAudioControl } from "contexts/audio/audio.hook";
import { useAudioPlayerContext } from "contexts/audio/audio.context";

export type AudioScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  ScreenName.audio
>;

export function AudioScreen({ route }: AudioScreenNavigationProp) {
    const { isPlayerReady, togglePlayback, skipToTrack, activeTrack  } = useAudioPlayerContext()
    const { audio } = useAppSelector(state => state.audio);
    const dispatch = useAppDispatch();

    const setCurrentPlaylist = () => {
        if (isPlayerReady) {
          togglePlayback(State.Playing)
        }
        dispatch(setAudioList(audio))
        dispatch(setCurrentTrack(route.params.item.id))
    }
    

    useEffect(() => {
        //setTimeout(() => setIsFirstRender(false), 2000)
        const currentIndex = audio.findIndex((elem) => route.params.item.id === elem.id)
    
        // if ((audio.length !== audio.length || JSON.stringify(a) === JSON.stringify(audio) && currentIndex > -1)) {
        //   setCurrentPlaylist()
        //   return
        // }
    
        if (currentIndex > -1 && route.params.item.id !== activeTrack?.id) {
          skipToTrack(currentIndex)
        }
      }, [route.params.item.id])
    
    //   useEffect(() => {
    //     if (playBackState === State.Error && activeTrack) {
    //       Snackbar.show({ text: PlayAudioErrorMessage.PlayError, backgroundColor: colors.red, numberOfLines: 3 })
    //       dispatch(removeFromDownloadedList(activeTrack.id))
    //       dispatch(setAudioProgress({ id: activeTrack.id, progress: 0 }))
    //       setDownloadProgress({ [activeTrack.id]: 0 })
    //       deleteFile(activeTrack.url)
    //       navigation.goBack()
    //       setTimeout(() => {
    //         clearPlaylist()
    //         setIsWidgetPlayerHidden(true)
    //       }, 1000)
    //     }
    //   }, [playBackState])

    return (
      <View>
          <StatusBar style="auto" />
          <Text>
              {JSON.stringify(route.params.item)}
          </Text>
      </View>
    );
}