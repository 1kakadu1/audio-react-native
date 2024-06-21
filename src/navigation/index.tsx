import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeScreen } from "../screens/home/home.screen";
import { AboutScreen } from "../screens/about/about.screen";
import { RootStackParamList, ScreenName } from "./navigation.model";
import { AudioScreen } from "../screens/audio/audio.screen";




const Stack = createNativeStackNavigator<RootStackParamList>();

export const NavigationApp = ()=>{
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={ScreenName.home}>
                <Stack.Group>
                    <Stack.Screen name={ScreenName.home} component={HomeScreen} />
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
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    )
} 