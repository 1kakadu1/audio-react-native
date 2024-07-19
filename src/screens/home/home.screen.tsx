
import { StatusBar } from "expo-status-bar"
import { View } from "react-native-ui-lib"
import { FlatList } from "react-native";
import { IHomeScreenPropsHomeScreenNavigationProp } from "../../navigation/navigation.model";
import { useAppDispatch, useAppSelector } from "../../store";
import { useEffect } from "react";
import { getAudioList } from "../../store/audio/audio.thunk";
import { IAudiData } from "../../models/audio";
import { CardAudio } from "../../components/card/card-audio.component";
import { useAudioPlayerContext } from "contexts/audio/audio.context";

export function HomeScreen( { navigation, route }: IHomeScreenPropsHomeScreenNavigationProp) {
    const {  isLoading, audio, currentTrack } = useAppSelector((state) => state.audio);
    const { search } = useAppSelector(state => state.search);
    const { isWidgetPlayerHidden } = useAudioPlayerContext();
    const dispath = useAppDispatch();

    useEffect(()=>{
        if(!isLoading){
           dispath(getAudioList(search || "piano")) 
        }
    }, [])

    return (
        <View >
            <StatusBar style="auto" />
            
            <FlatList
                contentContainerStyle={{paddingBottom: isWidgetPlayerHidden ? 0 : 80}}
                data={audio}
                renderItem={({item}: {item: IAudiData}) => <CardAudio audio={item} active={currentTrack}/>}
                keyExtractor={item => item.id.toString()}
                extraData={currentTrack}
            />
        </View>
    );
}