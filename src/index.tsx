import TrackPlayer from 'react-native-track-player'

import { registerRootComponent } from 'expo'
import { Appliaction } from 'application/application'
import { playbackService } from 'contexts/audio/audio.services'


registerRootComponent(Appliaction)
TrackPlayer.registerPlaybackService(() => playbackService)