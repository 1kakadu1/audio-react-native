import TrackPlayer, {Event} from "react-native-track-player"
import { store } from "store"
import { setAudioProgress, setCurrentTrack } from "store/audio/audio.slice"

export async function setPosition() {
    const currentTrack = await TrackPlayer.getActiveTrack()
    const { position } = await TrackPlayer.getProgress()
    if (currentTrack?.id !== undefined && currentTrack?.id !== null && position > 0) {
        store.dispatch(setAudioProgress({ id: currentTrack.id, progress: position }))
    }
}
  
export async function playbackService() {
    let currentIndex: number | undefined = 0
    TrackPlayer.addEventListener(Event.RemotePause, async () => {
      console.log(Event.RemotePause)
      await setPosition()
      TrackPlayer.pause()
    })
    TrackPlayer.addEventListener(Event.RemotePlay, () => {
      console.log(Event.RemotePlay)
      TrackPlayer.play()
    })
    TrackPlayer.addEventListener(Event.RemoteNext, async () => {
      console.log(Event.RemoteNext)
     await setPosition()

    })
    TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
      console.log(Event.RemotePrevious)
     await setPosition()
     
    })
    TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, async (event) => {
      console.log(Event.PlaybackActiveTrackChanged)
      if (
        event.lastTrack?.duration &&
        Math.ceil(event.lastPosition) + 1 >= event.lastTrack?.duration &&
        event.index !== undefined &&
        currentIndex !== undefined &&
        (event.index > currentIndex || currentIndex === 0)
      ) {
        console.log(Event.PlaybackActiveTrackChanged ,true)
        store.dispatch(setAudioProgress({ id: event.lastTrack?.id, progress: 0 }))
        store.dispatch(setCurrentTrack(event.lastTrack?.id))
        const audioProgress = store.getState().audio.audioProgress
        if (audioProgress[event?.track?.id]) {
          await TrackPlayer.seekTo(audioProgress[event?.track?.id])
        }
      }
      currentIndex = event.index
    })
  }