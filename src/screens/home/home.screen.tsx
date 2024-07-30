
import { StatusBar } from "expo-status-bar"
import { FlatList, View, ActivityIndicator, RefreshControl} from "react-native";
import { IHomeScreenPropsHomeScreenNavigationProp } from "../../navigation/navigation.model";
import { useAppDispatch, useAppSelector } from "../../store";
import { memo, useCallback, useEffect, useState } from "react";
import { getAudioList, loadMoreAudioList } from "../../store/audio/audio.thunk";
import { IAudiData } from "../../models/audio";
import { CardAudio } from "../../components/card/card-audio.component";
import { useAudioPlayerContext } from "contexts/audio/audio.context";
import Snackbar from "react-native-snackbar";
import { useNetInfo } from "@react-native-community/netinfo";

const renderItem = ({item}: {item: IAudiData}) => <CardAudio audio={item} />

export function HomeScreen( { navigation, route }: IHomeScreenPropsHomeScreenNavigationProp) {
    const {  isLoading, audio, currentTrack , error, filter} = useAppSelector((state) => state.audio);
    const { search } = useAppSelector(state => state.search);
    const { isWidgetPlayerHidden, addTracks } = useAudioPlayerContext();
    const { isConnected } = useNetInfo();
    const dispath = useAppDispatch();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        if(!refreshing && isConnected){
            setRefreshing(true);
            dispath(getAudioList({q: search || "piano", page: 1})).then(()=>{
             setRefreshing(false);
            })
        }
 
    }, [search, isConnected]);

    const handlerLoadMore = () =>{
        if(!isLoading && !refreshing && isConnected){
            setRefreshing(true);
            dispath(
                loadMoreAudioList({q: search || "piano" , page: filter.page + 1})
            ).then((res) =>{
                if(typeof res.payload !== 'string' && res.payload){
                    console.log(res.payload.count)
                    addTracks(res.payload.results);
                }
            }).finally(()=>{
                setRefreshing(false);
            })
        }  
    }

    useEffect(()=>{
        if(!isLoading){
           dispath(getAudioList({q: search || "piano", page: 1}))
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
                        onEndReached={handlerLoadMore}
                        onEndReachedThreshold={0.1}
                        contentContainerStyle={{paddingBottom: isWidgetPlayerHidden ? 0 : 80, paddingTop: isLoading &&  audio.length > 0 ? 30 : 0}}
                        data={audio}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                        extraData={currentTrack}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    />
                )
            }

        </View>
    );
}