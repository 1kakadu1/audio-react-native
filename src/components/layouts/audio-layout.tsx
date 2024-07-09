import { NavigationContext, RouteProp, useRoute } from "@react-navigation/native"
import { RootStackParamList } from "navigation/navigation.model";
import { useEffect, useContext } from "react";
import { View } from "react-native-ui-lib"

export const AudioLayout = ({children, route }:{children: React.ReactNode,  route: RouteProp<RootStackParamList, any>})=>{
    useEffect(()=>{
        console.log(JSON.stringify(route))
    }, [route]);
    
    return <View>
        {children}
    </View>
}