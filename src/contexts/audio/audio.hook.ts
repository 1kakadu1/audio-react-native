import { useEffect, useState } from 'react'
import TrackPlayer, {
    AppKilledPlaybackBehavior,
    Capability,
    State,
    Track,
    useActiveTrack,
    usePlaybackState,
    useProgress,
    RepeatMode,
    Event
  } from 'react-native-track-player'
import { useAppDispatch, useAppSelector } from 'store'

export const capabilities = [Capability.Play, Capability.Pause, Capability.SkipToPrevious, Capability.SkipToNext]

export async function setupPlayer() {
  let isSetup = false
  try {
    await TrackPlayer.getActiveTrack()
    isSetup = true
  } catch (error) {
    await TrackPlayer.setupPlayer()
    isSetup = true
  } finally {
    return isSetup
  }
}


async function addTrack(tracks: Track[], insetToStart?: boolean) {
  await TrackPlayer.add(tracks, insetToStart ? 0 : undefined)
  await TrackPlayer.setRepeatMode(RepeatMode.Off)
}


export const useAudioControl = () => {
  const { audio: playlist, currentTrack: currentStateTrack, audioProgress } = useAppSelector(store => store.audio);
  const [isPlayerReady, setIsPlayerReady] = useState(false)
  const dispatch = useAppDispatch()
  const { state: playBackState } = usePlaybackState()
  const { position, duration } = useProgress(800);
  const activeTrack = useActiveTrack()
  console.log(activeTrack);
  const skipToPosition = async (pos: number, disabled?: boolean | null) => {
    if (!disabled) {
      await TrackPlayer.seekTo(pos)
    }
  }


  const togglePlayback = async (playback?: State, disabled?: boolean | null) => {
    if (disabled || activeTrack === null) {
      return
    }

    if (playback === State.Paused || playback === State.Ready) {
      await TrackPlayer.play()
    } else if (playback === State.Ended) {
      await skipToPosition(0)
      await TrackPlayer.play()
    } else {
      await TrackPlayer.pause()
    }
  }

  const skipToTrack = async (index: number) => {
    const queue = await TrackPlayer.getQueue()
    const nextTrack = queue[index]
    await TrackPlayer.skip(index, audioProgress[nextTrack?.id] ?? 0)
    if (playBackState) {
      await TrackPlayer.play()
    }
  }

  async function setup(tracks: Track[]) {
    const isSetup = await setupPlayer()

    if (isSetup) {
      await TrackPlayer.reset()
      await addTrack(tracks)
      const trackIndex = playlist.findIndex((item) => item.id === currentStateTrack)
      if (trackIndex > -1) {
      
        await skipToTrack(trackIndex)
      }
      if (trackIndex > -1 && trackIndex === 0 && currentStateTrack) {
        await TrackPlayer.seekTo(audioProgress[currentStateTrack] ?? 0)
      }
    }

    setIsPlayerReady(isSetup)
  }

  const clearPlaylist = async () => {
    if (isPlayerReady) {
      await TrackPlayer.stop()
      await TrackPlayer.reset()
    //   dispatch(setPlaylist([]))
      setIsPlayerReady(false)
    }
  }

  useEffect(() => {
    if (playlist.length) {
      const tracks = playlist.map((item) => ({
        ...item,
        //artwork: item?.image ?? require('assets/images/empty-image.jpeg'),
        url: item.previews['preview-hq-mp3'] || item.previews['preview-hq-ogg'],
      }))
      setup(tracks as unknown as Track[])
    }
  }, [playlist])

  return {
    isPlayerReady,
    clearPlaylist,
    position, 
    duration,
    activeTrack,
    playBackState,
    togglePlayback,
    skipToPosition,
    skipToTrack
  }
}