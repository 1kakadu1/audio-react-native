import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from "../screens/home/home.screen";
import { AboutScreen } from "../screens/about/about.screen";
import { RootStackParamList, ScreenName } from "./navigation.model";
import { AudioScreen } from "../screens/audio/audio.screen";
import { navigationRef } from "./navigation.utils";
import { TouchableOpacity } from "react-native";
import SearchIcon from "../assets/svg/search.svg";
import { SearchScreen } from "screens/search/search.screen";

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
                                <TouchableOpacity
                                  onPress={() =>{
                                    if(navigationRef.current){
                                        navigationRef.current.navigate(ScreenName.search);
                                    }
                                  }}
                                >
                                    <SearchIcon width={20} height={20} />
                                </TouchableOpacity>
                              ),
                            }
                        }
                    />
                    <Stack.Screen name={ScreenName.about} component={AboutScreen} />
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
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    )
} 