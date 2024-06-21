import TrackPlayer, {Event} from "react-native-track-player"
import { store } from "store"
import { setAudioProgress } from "store/audio/audio.slice"

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
      await setPosition()
      TrackPlayer.pause()
    })
    TrackPlayer.addEventListener(Event.RemotePlay, () => {
      TrackPlayer.play()
    })
    TrackPlayer.addEventListener(Event.RemoteNext, async () => {
      await setPosition()
      const currentTrack = await TrackPlayer.getActiveTrack()
      const queue = await TrackPlayer.getQueue()
      const id = queue[queue.findIndex((item) => item.id === currentTrack?.id) + 1].id
      await TrackPlayer.skipToNext(store.getState().audio.audioProgress[id] ?? 0)
    })
    TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
      await setPosition()
      const currentTrack = await TrackPlayer.getActiveTrack()
      const queue = await TrackPlayer.getQueue()
      const id = queue[queue.findIndex((item) => item.id === currentTrack?.id) - 1].id
      await TrackPlayer.skipToPrevious(store.getState().audio.audioProgress[id] ?? 0)
    })
    TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, async (event) => {
      if (
        event.lastTrack?.duration &&
        Math.ceil(event.lastPosition) + 1 >= event.lastTrack?.duration &&
        event.index !== undefined &&
        currentIndex !== undefined &&
        (event.index > currentIndex || currentIndex === 0)
      ) {
        store.dispatch(setAudioProgress({ id: event.lastTrack?.id, progress: 0 }))
        const audioProgress = store.getState().audio.audioProgress
        if (audioProgress[event?.track?.id]) {
          await TrackPlayer.seekTo(audioProgress[event?.track?.id])
        }
      }
      currentIndex = event.index
    })
  }