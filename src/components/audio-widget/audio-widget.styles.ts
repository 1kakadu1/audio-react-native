import {StyleSheet} from 'react-native';
import { COLORS } from '../../styles/glabal.styles';
export const SIZE_ICON = 20;
export default StyleSheet.create({
    container:{
        width: '100%',
        height: 80,
        padding: 20,
        flexDirection: "row",
        gap: 20,
        alignItems: "center",
        overflow: "hidden",
        position: "absolute",
        left: 0,
        bottom: 0,
        backgroundColor: '#fff'
    },
    title:{
        // sflexGrow: 1
        width: '70%'
    },
    row:{
        flexDirection: "row",
        gap: 20,
        alignItems: "center",
        justifyContent: "space-between"
    },
    time:{

    },
    btn:{
        
    }
    
});