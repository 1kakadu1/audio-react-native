
import { StatusBar } from "expo-status-bar"
import { View, Text } from "react-native-ui-lib"
import {  NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, FlatList } from "react-native";
import { RootStackParamList, ScreenName } from "../../navigation/navigation.model";
import { useAppDispatch, useAppSelector } from "../../store";
import { useEffect } from "react";
import { getAudioList } from "../../store/audio/audio.thunk";
import { IAudiData } from "../../models/audio";
import { CardAudio } from "../../components/card/card-audio.component";
import { LayoutBase } from "components/layouts/layoute-base";

interface IHomeScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, ScreenName.home>;
}

export function HomeScreen( { navigation }: IHomeScreenProps) {
    const {  isLoading, audio } = useAppSelector((state) => state.audio);
    const dispath = useAppDispatch();

    useEffect(()=>{
        if(!isLoading){
           dispath(getAudioList("piano")) 
        }
    }, [])

    return (
        <View>
            <StatusBar style="auto" />
            
            <FlatList
                data={audio}
                renderItem={({item}: {item: IAudiData}) => <CardAudio audio={item}/>}
                keyExtractor={item => item.id.toString()}
                //extraData={selectedId}
            />
            <Button
                title="Go to About"
                onPress={() => navigation.navigate(ScreenName.about, {title: ""})}
            /> 
        </View>
    );
}