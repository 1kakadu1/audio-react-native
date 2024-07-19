import {StyleSheet} from 'react-native';
import { COLORS } from '../../styles/glabal.styles';

export const SIZE_ICON = 40;

export default StyleSheet.create({
    preview:{
        alignItems: 'center',
        justifyContent: 'center',
        width: 280,
        height: 280,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: COLORS.border,
        marginBottom: 20
    },
    image:{
        alignItems: 'center',
        justifyContent: 'center',
        width: 280,
        height: 280,
        borderRadius: 20,
        marginBottom: 20
    },
    container:{
        paddingTop: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: "space-between",
        flex: 1
    },
    title:{
        paddingBottom: 6,
        paddingTop: 12,
        textAlign: 'center',
        //fontWeight: 900,
        fontSize: 22
    },
    description:{
        paddingTop: 6,
        paddingBottom: 12,
        fontSize: 14,
        textAlign: 'center'
    },
    actions:{
        width: '100%',
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    header:{
        alignItems: 'center',
        justifyContent: 'center'
    },
    range:{
        width: "100%",
    },
    sliderContainer:{
        width: '100%'
    },
    time:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    actions__nav:{
        alignItems: "center",
        gap: 40,
        flexDirection: "row"
    },
    actions__nav__prev:{
        width: SIZE_ICON*1.5,
        height: SIZE_ICON*1.5,
        borderColor: "#000",
        borderWidth: 2,
        borderRadius: 90,
        alignItems: "center",
        justifyContent:"center"
    },
    actions__nav__next:{
        width: SIZE_ICON*1.5,
        height: SIZE_ICON*1.5,
        borderColor: "#000",
        borderWidth: 2,
        borderRadius: 90,
        alignItems: "center",
        justifyContent:"center"
    },
    actions__nav__play:{
        width: SIZE_ICON*2.5,
        height: SIZE_ICON*2.5,
        borderColor: "#000",
        borderWidth: 2,
        borderRadius: 90,
        alignItems: "center",
        justifyContent:"center"
    }
});