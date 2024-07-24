import { TouchableOpacity, View, Text } from 'react-native';
import { IAudiData } from "../../models/audio";
import styles from "./card-audio.styles";
import { formatSecondsToTime } from '../../utils/format.utils';
import { useNavigation } from '@react-navigation/native';
import { Navigation, ScreenName } from '../../navigation/navigation.model';
import AudioIcon from "assets/svg/audio.svg";
import PauseIcon from "assets/svg/pause.svg";
import PlayIcon from "assets/svg/play.svg";
import { State } from 'react-native-track-player';
import { useMemo } from 'react';
import { useAudioPlayerContext } from 'contexts/audio/audio.context';
import Upload from "assets/svg/upload.svg";
import { useAppSelector } from 'store';

export const CardAudio = ({ audio, active }:{audio: IAudiData, active?: number | null})=>{
    const { audioDownload } = useAppSelector(state => state.audio);
    const  {playBackState, activeTrack } = useAudioPlayerContext()
    const isPlay = useMemo(()=>{
      return audio.id === activeTrack?.id && playBackState === State.Playing
    }, [audio.id, activeTrack?.id, playBackState])
    const navigate = useNavigation<Navigation>();
    const gotoAudio = ()=>{
      navigate.navigate(ScreenName.audio, {
        item: audio
      });
    }
     
    return(
      <TouchableOpacity style={styles.item} onPress={gotoAudio}>
          <View style={styles.header}>
            {
              audioDownload[audio.id] && (
                <Upload width={12} height={12}  fill={'#fff'} style={styles.upload} />
              )
            }
            <AudioIcon width={54} height={54} fill={"#000"} style={styles.image}/>
          </View>
          <View style={styles.body}>
            <Text numberOfLines={1}>
              {audio.name.replace("."+audio.type,"")}
            </Text>
            {audio.description && audio.description !== "" &&
                <Text numberOfLines={1} style={styles.description}>
                    {audio.description}
                </Text>
            }
          </View>
          <View style={styles.footer}>
            <Text>{formatSecondsToTime(Math.floor(audio.duration),true)}</Text>
            <TouchableOpacity style={styles.actionDowload}>
              {
                isPlay ?  <PauseIcon width={32} height={32} color={'red'}/> : <PlayIcon width={32} height={32} color={'red'} />
              }
              {/* <DownLoadIcon width={32} height={32} /> */}
            </TouchableOpacity>
          </View>

      </TouchableOpacity>
    )
}