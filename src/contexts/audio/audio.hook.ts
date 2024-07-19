import { IAudiData } from 'models'
import { useEffect, useMemo, useRef, useState } from 'react'
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
import { setAudioList, setAudioProgress, setCurrentTrack } from 'store/audio/audio.slice'

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


async function addTrack(tracks: IAudiData[], insetToStart?: boolean) {
  await TrackPlayer.add(tracks, insetToStart ? 0 : undefined)
  await TrackPlayer.setRepeatMode(RepeatMode.Off)
}


export const useAudioControl = () => {
  const { audio: playlist, currentTrack: currentStateTrack, audioProgress, isLoading } = useAppSelector(store => store.audio);
  const [isPlayerReady, setIsPlayerReady] = useState(false)
  const dispatch = useAppDispatch()
  const { state: playBackState } = usePlaybackState()
  const { position, duration } = useProgress(800);
  const activeTrack: IAudiData | null = useActiveTrack() as IAudiData;
  const prevPlaylist  = useRef<IAudiData[] | null>(null);

  const indexTrack = useMemo(()=>{
    return playlist.findIndex(item => item.id === activeTrack?.id);
  }, [activeTrack, playlist]);

  const isLastTrack = useMemo(()=>{
    return indexTrack === playlist.length - 1;
  }, [activeTrack, indexTrack, playlist])

  const isFirstTrack = useMemo(()=>{
    return indexTrack === 0;
  }, [activeTrack, indexTrack, playlist])

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

  const skipToTrack = async (index: number, isPlayStart = true) => {
    const queue = await TrackPlayer.getQueue()
    const nextTrack = queue[index]
    await TrackPlayer.skip(index, audioProgress[nextTrack?.id] ?? 0)
    if (playBackState && isPlayStart) {
      await TrackPlayer.play()
    }
  }

  const skipToPrev = async (disabled?: boolean | null) => {
    if (!disabled) {
      const queue = await TrackPlayer.getQueue()
      const id = queue[queue.findIndex((item) => item.id === activeTrack?.id) - 1].id
      await TrackPlayer.skipToPrevious(audioProgress[id] ?? 0)
    }
  }

  const skipToNext = async (disabled?: boolean | null) => {
    if (!disabled) {
      const queue = await TrackPlayer.getQueue()
      const id = queue[queue.findIndex((item) => item.id === activeTrack?.id) + 1].id
      await TrackPlayer.skipToNext(audioProgress[id] ?? 0)
    }
  }

  async function setup(tracks: IAudiData[], autoPlay: boolean = false) {
    const isSetup = await setupPlayer()
    if (isSetup) {
      await TrackPlayer.stop()
      await TrackPlayer.reset()
      await addTrack(tracks)
      const trackIndex = playlist.findIndex((item) => item.id === currentStateTrack)
      
      if (trackIndex > -1 && autoPlay) {
        await skipToTrack(trackIndex)
      }
      if (trackIndex > -1 && trackIndex === 0 && currentStateTrack) {
        await TrackPlayer.seekTo(audioProgress[currentStateTrack] ?? 0)
      }
    } else{
      //console.log("ERROR SETUP")
    }
    setIsPlayerReady(isSetup)
  }

  const clearPlaylist = async () => {
    if (isPlayerReady) {
      await TrackPlayer.stop()
      await TrackPlayer.reset()
      dispatch(setAudioList([]))
      setIsPlayerReady(false)
    }
  }

  const changePlaylist = ()=>{
    if (playlist.length && JSON.stringify(playlist) !== JSON.stringify(prevPlaylist.current)) {
      const tracks = playlist.map((item) => ({
        ...item,
        artwork: item?.image || undefined,
        image: item.image,
        url: item.previews['preview-hq-mp3'] || item.previews['preview-hq-ogg'],
      }))
      prevPlaylist.current = playlist;
      setup(tracks)
    }
  }

  const hideNext = async (isFirst?: boolean, isLast?: boolean) => {
    setTimeout(() => {
      const filteredCapabilities = capabilities
        .filter((item) => (isFirst ? item !== Capability.SkipToPrevious : item))
        .filter((item) => (isLast ? item !== Capability.SkipToNext : item))
      TrackPlayer.updateOptions({
        capabilities: filteredCapabilities,
        compactCapabilities: filteredCapabilities,
        android: {
          appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
      })
    })
  }


  useEffect(()=>{
    if(currentStateTrack && activeTrack && currentStateTrack !== activeTrack.id){
      setCurrentTrack(activeTrack.id)
    }
  }, [activeTrack?.id])

  useEffect(()=>{
    changePlaylist();
  }, [playlist])

  useEffect(() => {
    if (isPlayerReady) {
      hideNext(isFirstTrack, isLastTrack)
    }
  }, [isFirstTrack, isLastTrack, isPlayerReady])

  return {
    isPlayerReady,
    clearPlaylist,
    position, 
    duration,
    activeTrack: activeTrack as IAudiData | undefined,
    playBackState,
    togglePlayback,
    skipToPosition,
    skipToTrack,
    skipToPrev,
    skipToNext,
    changePlaylist,
    isLastTrack,
    isFirstTrack,
    indexTrack
  }
}