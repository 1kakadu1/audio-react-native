import { IAudiData } from "models"
import { State } from "react-native-track-player"

export interface AudioPlayerContextType {
    duration: number
    isPlayerReady: boolean
    playBackState: State | undefined
    position: number
    activeTrack: IAudiData | undefined
    isWidgetPlayerHidden: boolean
    setIsWidgetPlayerHidden: (value: boolean) => void
    clearPlaylist: VoidFunction
    skipToPosition: (pos: number, disabled?: boolean | null) => Promise<void>
    togglePlayback: (playback?: State | undefined, disabled?: boolean | null) => Promise<void>
    skipToTrack: (index: number) => Promise<void>,
    skipToNext: (disabled?: boolean | null)=> Promise<void>
    skipToPrev: (disabled?: boolean | null)=> Promise<void>
    isFirstTrack: boolean, 
    isLastTrack: boolean,
    indexTrack: number,
    changePlaylist: ()=> void,
    updateUrlTrack: (audio: IAudiData) => Promise<void>,
    addTracks: (audioList: IAudiData[], insetTo?: number) => Promise<void>
  }