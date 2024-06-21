import { State, Track } from "react-native-track-player"

export interface AudioPlayerContextType {
    duration: number
    isPlayerReady: boolean
    playBackState: State | undefined
    position: number
    activeTrack: Track | undefined
    isWidgetPlayerHidden: boolean
    isWidgetOnBottom: boolean
    setIsWidgetPlayerHidden: (value: boolean) => void
    setIsWidgetOnBottom: (value: boolean) => void
    clearPlaylist: VoidFunction
    skipToPosition: (pos: number, disabled?: boolean | null) => Promise<void>
    togglePlayback: (playback?: State | undefined, disabled?: boolean | null) => Promise<void>
    skipToTrack: (index: number) => Promise<void>
  }