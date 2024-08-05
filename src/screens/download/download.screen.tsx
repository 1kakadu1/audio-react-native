import { CardAudio } from "components/card/card-audio.component";
import { useAudioPlayerContext } from "contexts/audio/audio.context";
import { StatusBar } from "expo-status-bar"
import { IAudiData } from "models";
import { useMemo } from "react";
import { FlatList, View } from "react-native";
import { useAppSelector } from "store";

const renderItem = ({item}: {item: IAudiData}) => <CardAudio audio={item} isDelete/>

export function DownloadScreen() {
    const { audioDownload, currentTrack, isLoading } = useAppSelector((state) => state.audio);
    const { isWidgetPlayerHidden } = useAudioPlayerContext();
    const audioList = useMemo(()=>{
        return Object.values(audioDownload)
    }, [audioDownload])
    return (
        <View>
            <StatusBar style="auto" />
            {
                audioList.length > 0  && (
                    <FlatList
                        contentContainerStyle={{paddingBottom: isWidgetPlayerHidden ? 0 : 80, paddingTop: isLoading &&  audioList.length > 0 ? 30 : 0}}
                        data={audioList}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                        extraData={currentTrack}
                    />
                )
            }
        </View>
    );
}