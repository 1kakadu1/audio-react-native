import React, { createContext, FC, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'store'
import { View } from 'react-native'
import { AudioPlayerContextType } from './audio.model'
import { useAudioControl } from "./audio.hook"
import { setAudioProgress } from 'store/audio/audio.slice'
import { AudioWidget } from 'components/audio-widget/audio-widget.component'

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined)

export const useAudioPlayerContext = () => {
  const context = useContext(AudioPlayerContext)
  if (!context) {
    throw new Error('useAudioPlayerContext must be used within a AudioPlayerProvider')
  }
  return context
}

export const AudioPlayerProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isWidgetPlayerHidden, setIsWidgetPlayerHidden] = useState(true)
  const { audioProgress, currentTrack, audio } = useAppSelector(state => state.audio);
  const isInit = useRef(false);
  const dispatch = useAppDispatch()

  const {
    playBackState,
    isPlayerReady,
    position,
    activeTrack,
    duration,
    clearPlaylist,
    togglePlayback,
    skipToPosition,
    skipToTrack,
    skipToPrev,
    skipToNext,
    isFirstTrack,
    isLastTrack,
    indexTrack,
    changePlaylist,
    addTracks
  } = useAudioControl();

  useEffect(() => {
    if (activeTrack?.id !== undefined && activeTrack?.id !== null ) {
      dispatch(setAudioProgress({ id: activeTrack.id, progress: position }))
      if (duration && Math.ceil(position) >= duration) {
        setTimeout(() => dispatch(setAudioProgress({ id: activeTrack.id, progress: 0 })), 300)
      }
    }
  }, [position])

  useEffect(() => {
    if(!isInit.current && audio.length > 0 && isPlayerReady){
      const audioIndex = audio.findIndex(item => item.id === currentTrack);
      if (!isInit.current && currentTrack && audioProgress[currentTrack] !== undefined && audioIndex !== -1) {
        skipToTrack(audioIndex, false).then(()=>{
          setIsWidgetPlayerHidden(false);
        }).finally(()=> isInit.current = true);
      }
    }

  }, [isPlayerReady, currentTrack, audio])


  return (
    <AudioPlayerContext.Provider
      value={{
        duration,
        isPlayerReady,
        playBackState,
        position,
        activeTrack,
        isWidgetPlayerHidden,
        setIsWidgetPlayerHidden,
        clearPlaylist,
        togglePlayback,
        skipToPosition,
        skipToTrack,
        skipToNext,
        skipToPrev,
        isFirstTrack,
        isLastTrack,
        indexTrack,
        changePlaylist,
        addTracks
      }}
    >
      <View style={{flex: 1, overflow: "hidden"}}>
        {children}
        <AudioWidget 
          isWidgetPlayerHidden={isWidgetPlayerHidden} 
          setIsWidgetPlayerHidden={setIsWidgetPlayerHidden}
          activeTrack={activeTrack}
          position={position}
          togglePlayback={togglePlayback}
          playBackState={playBackState} 
        />
      </View>
    </AudioPlayerContext.Provider>
  )
}