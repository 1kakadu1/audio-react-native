import { TouchableOpacity, View, Text } from 'react-native';
import { IAudiData } from "../../models/audio";
import styles from "./card-audio.styles";
import { formatSecondsToTime } from '../../utils/format.utils';
import { useNavigation } from '@react-navigation/native';
import { Navigation, ScreenName } from '../../navigation/navigation.model';
import AudioIcon from "assets/svg/audio.svg";
import DownLoadIcon from "assets/svg/download.svg";

export const CardAudio = ({ audio }:{audio: IAudiData})=>{

    const navigate = useNavigation<Navigation>();
    const gotoAudio = ()=>{
      navigate.navigate(ScreenName.audio, {
        item: audio
      });
    }
     
    return(
      <TouchableOpacity style={styles.item} onPress={gotoAudio}>
          <View style={styles.header}>
            <AudioIcon width={54} height={54} fill={"#000"} style={styles.image}/>
          </View>
          <View style={styles.body}>
            <Text>
              {audio.name.replace("."+audio.type,"")}
            </Text>
            <Text numberOfLines={1}>в
              {audio.description}
            </Text>
          </View>
          <View style={styles.footer}>
            <Text>{formatSecondsToTime(Math.floor(audio.duration),true)}</Text>
            <TouchableOpacity style={styles.actionDowload}>
              <DownLoadIcon width={32} height={32} />
            </TouchableOpacity>
          </View>

      </TouchableOpacity>
    )
}