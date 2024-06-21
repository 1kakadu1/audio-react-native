import {StyleSheet} from 'react-native';
import { COLORS } from '../../styles/glabal.styles';

export default StyleSheet.create({
    image: {
      width: 54,
      height: 54,
    },
    border: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: COLORS.text
    },
    item:{
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 10,
      padding: 6,
      alignItems: "center"
    },
    header:{

    },
    body:{
      flex: 1,
      paddingRight: 10,
    },
    footer:{
        gap: 8,
        flexDirection: 'row',
        alignItems: "center"
    },
    actionDowload:{
        height: 36,
        width: 36
     }
    
  });