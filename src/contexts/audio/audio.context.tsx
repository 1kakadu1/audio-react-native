import React, { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { State, Track } from 'react-native-track-player'

import { useAppDispatch, useAppSelector } from 'store'
import { View, Text } from 'react-native'
import { AudioPlayerContextType } from './audio.model'
import { useAudioControl } from "./audio.hook"
import { setAudioProgress } from 'store/audio/audio.slice'

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
  const [isWidgetOnBottom, setIsWidgetOnBottom] = useState(false)
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
    skipToTrack
  } = useAudioControl()

  useEffect(() => {
    if (activeTrack?.id !== undefined && activeTrack?.id !== null && position > 3) {
      dispatch(setAudioProgress({ id: activeTrack.id, progress: position }))
      if (duration && Math.ceil(position) >= duration) {
        setTimeout(() => dispatch(setAudioProgress({ id: activeTrack.id, progress: 0 })), 300)
      }
    }
  }, [Math.floor(position / 3)])

  useEffect(() => {
    if (playBackState !== State.Playing) {
      setIsWidgetPlayerHidden(!isPlayerReady)
    }
  }, [isPlayerReady])


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
        isWidgetOnBottom,
        setIsWidgetOnBottom,
        clearPlaylist,
        togglePlayback,
        skipToPosition,
        skipToTrack
      }}
    >
      {children}
      {!isWidgetPlayerHidden && (
        <View>
            <Text>Виджет</Text>
        </View>
      )}
    </AudioPlayerContext.Provider>
  )
}