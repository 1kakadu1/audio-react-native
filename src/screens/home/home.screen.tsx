
import { StatusBar } from "expo-status-bar"
import { FlatList, Text, View, ActivityIndicator} from "react-native";
import { IHomeScreenPropsHomeScreenNavigationProp } from "../../navigation/navigation.model";
import { useAppDispatch, useAppSelector } from "../../store";
import { useEffect } from "react";
import { getAudioList } from "../../store/audio/audio.thunk";
import { IAudiData } from "../../models/audio";
import { CardAudio } from "../../components/card/card-audio.component";
import { useAudioPlayerContext } from "contexts/audio/audio.context";
import LoadingIcon from "assets/svg/loading.svg"
import Snackbar from "react-native-snackbar";
import { useNetInfo } from "@react-native-community/netinfo";

export function HomeScreen( { navigation, route }: IHomeScreenPropsHomeScreenNavigationProp) {
    const {  isLoading, audio, currentTrack , error} = useAppSelector((state) => state.audio);
    const { search } = useAppSelector(state => state.search);
    const { isWidgetPlayerHidden } = useAudioPlayerContext();
    const { isConnected } = useNetInfo();
    const dispath = useAppDispatch();
    
    useEffect(()=>{
        if(!isLoading){
           dispath(getAudioList(search || "piano")) 
        }
    }, [])

    useEffect(() => {
        if(isConnected === false){
            Snackbar.show({
                text: "Network error.",
                duration: Snackbar.LENGTH_SHORT,
            });
        }
    }, [isConnected])

    useEffect(()=>{
        if(!isLoading && error !== undefined && isConnected === true){
            Snackbar.show({
                text: JSON.stringify(error),
                duration: Snackbar.LENGTH_SHORT,
            });
        }
    }, [isLoading, error, isConnected])

    return (
        <View style={{ position: "relative", flex: 1}}>
            <StatusBar style="auto" />
            {
                (isLoading &&  audio.length === 0) && (
                    <View style={{width: "100%", alignItems: 'center', paddingTop: 12, position: "absolute"}} >
                        <ActivityIndicator style={{width: 30, height: 30}}/>
                    </View>
                )

            }
            {
                (isLoading &&  audio.length > 0) && (
                    <View style={{width: "100%", alignItems: 'center', paddingTop: 12, position: "absolute"}} >
                        <ActivityIndicator style={{width: 30, height: 30}}/>
                    </View>
                )

            }
            {
                audio.length > 0  && (
                    <FlatList
                        contentContainerStyle={{paddingBottom: isWidgetPlayerHidden ? 0 : 80, paddingTop: isLoading &&  audio.length > 0 ? 30 : 0}}
                        data={audio}
                        renderItem={({item}: {item: IAudiData}) => <CardAudio audio={item} active={currentTrack}/>}
                        keyExtractor={item => item.id.toString()}
                        extraData={currentTrack}
                    />
                )
            }

        </View>
    );
}