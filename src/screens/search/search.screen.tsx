import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAudioPlayerContext } from "contexts/audio/audio.context";
import { RootStackParamList, ScreenName } from "navigation/navigation.model";
import { View, ScrollView, TextInput, TouchableOpacity, Text } from "react-native";
import styles from "./search.styles";
import { useState } from "react";
import SearchIcon from "assets/svg/search.svg";
import { useAppDispatch, useAppSelector } from "store";
import { getSearchAudioList } from "store/search/search.thunk";
import PlayIcon from "assets/svg/play.svg";

export type SearchScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  ScreenName.search
>;

export function SearchScreen() {
    const [search, setSearch] = useState("");
    const { localHistory, search: currentSearch } = useAppSelector(state => state.search);
    const { isWidgetPlayerHidden, setIsWidgetPlayerHidden } = useAudioPlayerContext();
    const dispatch = useAppDispatch();

    const getSearchPlaylist = (value: string | undefined)=>{
        if(value !== "" && value){
            dispatch(getSearchAudioList(value)).then((res)=>{
                setIsWidgetPlayerHidden(true);
                setSearch("");
            });
        }
        
    }

    const onChangeText = (text: string)=>{
        setSearch(text)
    }
    const onSubmitEditing = ()=>{
        getSearchPlaylist(search)
    }

    const onSearch = ()=>{
        getSearchPlaylist(search)
    }

    return(
        <ScrollView
            contentContainerStyle={{paddingBottom: isWidgetPlayerHidden ? 0 : 80}}
        >
            <View style={styles.inputWrap}>
                <TextInput
                    placeholder="Enter search text"
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={search}
                    onSubmitEditing={onSubmitEditing}
                />
                <TouchableOpacity
                    style={styles.btn}
                    onPress={onSearch}
                >
                   <SearchIcon width={22} height={22}/> 
                </TouchableOpacity>
            </View>

            <View style={styles.list}>
                {
                    localHistory.map((item, index)=>(
                        <TouchableOpacity style={styles.listItem} onPress={
                            ()=> getSearchPlaylist(item)
                        } key={index}>
                           <Text>{item}</Text> 
                            {
                                item.toLocaleLowerCase() === currentSearch?.toLocaleLowerCase() ?
                                <PlayIcon width={16} height={16} />
                                : null
                            }
                        </TouchableOpacity>
                    ))
                }
            </View>
 
        </ScrollView>
    )
}