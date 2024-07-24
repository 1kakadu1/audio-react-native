import { Text, TouchableOpacity } from "react-native"
import styles, { SIZE_ICON } from "./audio-widget.styles";
import { State } from "react-native-track-player";
import Play from "assets/svg/play-second.svg";
import Pause from "assets/svg/pause-second.svg";
import { formatSecondsToTime } from "utils/format.utils";
import { useEffect, useMemo, useRef } from "react";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { ScreenName } from "navigation/navigation.model";
import { navigationRef } from "navigation/navigation.utils";
import { IAudiData } from "models";
import { useNetInfo } from "@react-native-community/netinfo";

export interface IAudioWidgetProps{
    isWidgetPlayerHidden: boolean,
    setIsWidgetPlayerHidden: (value: boolean)=> void,
    togglePlayback: (playback?: State | undefined, disabled?: boolean | null) => Promise<void>,
    playBackState: State | undefined
    position: number
    activeTrack: IAudiData | undefined
}

const ActionPlayIcon = ({position, playBackState}:{position: number, playBackState?: State})=>{
    if(position === 0){
        return <Play width={SIZE_ICON } height={SIZE_ICON} />
    } else if(playBackState === State.Playing){
        return <Pause width={SIZE_ICON} height={SIZE_ICON} /> 
    }

    return <Play width={SIZE_ICON } height={SIZE_ICON} /> 
}

export const AudioWidget = ({isWidgetPlayerHidden, position ,togglePlayback, activeTrack , playBackState}: IAudioWidgetProps) =>{
    const translateY = useSharedValue(90);
    const init = useRef(false);
    const { isConnected } = useNetInfo();
    useEffect(()=>{
        init.current = true;
    }, [])

    useEffect(()=>{
        if(init.current){
            if(isWidgetPlayerHidden){
                translateY.value = withTiming(90);
            }else{
                translateY.value = withTiming(0);
            }

        }
    }, [isWidgetPlayerHidden])

    const gotoAudio = ()=>{
        if(activeTrack && navigationRef.current){
            navigationRef.current.navigate(ScreenName.audio, {
                item: activeTrack
            });
        }

      }
    const disabled = useMemo(()=>{
        if(activeTrack === undefined){
            return true
        }

        if(isConnected === false && activeTrack && activeTrack?.url.indexOf("file")){
            return true
        }

        return false;
    }, [isConnected, activeTrack])

    return(
        <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
             <TouchableOpacity
                disabled={disabled} 
                style={styles.btn} 
                onPress={()=> togglePlayback(playBackState)}
            >
                <ActionPlayIcon 
                    playBackState={playBackState}
                    position={position}
                />

              </TouchableOpacity>
              <TouchableOpacity style={styles.row} onPress={gotoAudio}>
                    <Text style={styles.title} numberOfLines={2}>
                        {activeTrack?.name}
                    </Text>
                    <Text>{formatSecondsToTime(Math.floor(
                        position || 0),true)}</Text>
              </TouchableOpacity>
        </Animated.View>
    )
} 