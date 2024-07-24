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
      position: "relative"
    },
    body:{
      flex: 1,
      paddingRight: 10,
    },
    description:{
      fontSize: 12
    },
    footer:{
        gap: 8,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'flex-end',
        width: 100
    },
    actionDowload:{
        height: 36,
        width: 36
     },
     upload:{
      position: "absolute",
      zIndex: 2,
      bottom: 8,
      right: 10
     }
    
  });