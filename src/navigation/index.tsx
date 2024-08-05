import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from "../screens/home/home.screen";
import { RootStackParamList, ScreenName } from "./navigation.model";
import { AudioScreen } from "../screens/audio/audio.screen";
import { navigationRef } from "./navigation.utils";
import { TouchableOpacity, View } from "react-native";
import SearchIcon from "../assets/svg/search.svg";
import DownloadIcon from "../assets/svg/download.svg";
import { SearchScreen } from "screens/search/search.screen";
import { DownloadScreen } from "screens/download/download.screen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const NavigationApp = ()=>{
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName={ScreenName.home}>
                <Stack.Group>
                    <Stack.Screen 
                        name={ScreenName.home} 
                        component={HomeScreen}
                        options={{
                            headerRight: (props) => (
                                <View style={{flexDirection: "row", gap: 10}}>
                                    <TouchableOpacity
                                    onPress={() =>{
                                        if(navigationRef.current){
                                            navigationRef.current.navigate(ScreenName.download);
                                        }
                                    }}
                                    >
                                        <DownloadIcon width={20} height={20} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                    onPress={() =>{
                                        if(navigationRef.current){
                                            navigationRef.current.navigate(ScreenName.search);
                                        }
                                    }}
                                    >
                                        <SearchIcon width={20} height={20} />
                                    </TouchableOpacity>
                                </View>

                              ),
                            }
                        }
                    />
            
                </Stack.Group>
                <Stack.Group>
                    <Stack.Screen 
                        name={ScreenName.audio} 
                        component={AudioScreen} 
                        options={{
                            animation: 'slide_from_bottom',
                        }}
                    />
                    <Stack.Screen 
                        name={ScreenName.search} 
                        component={SearchScreen} 
                        options={{
                            animation: 'slide_from_bottom',
                        }}
                    />
                    <Stack.Screen 
                        name={ScreenName.download} 
                        component={DownloadScreen} 
                        options={{
                            animation: 'slide_from_bottom',
                        }}
                    />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    )
} 