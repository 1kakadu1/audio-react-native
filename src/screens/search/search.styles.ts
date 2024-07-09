import {StyleSheet} from 'react-native';
import { COLORS } from '../../styles/glabal.styles';

export default StyleSheet.create({
    input:{
        flexGrow: 1,
        height: 40,
        borderColor: COLORS.border,
        borderWidth: 1,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        paddingHorizontal: 10
    },
    inputWrap:{
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginTop: 40
    },
    btn:{
        width: 40,
        height: 40,
        borderColor: COLORS.border,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    list:{
        width: "100%",
        gap: 10,
        paddingHorizontal: 20,
        marginTop: 15
    },
    listItem:{
        width: "100%",
        fontSize: 18,
        paddingVertical: 10,
        flexDirection:"row",
        alignItems: "center",
        justifyContent: "space-between"
    }
});