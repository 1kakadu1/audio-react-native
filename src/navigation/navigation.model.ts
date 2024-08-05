import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { IAudiData } from "../models";

export enum ScreenName{
    home = "Home",
    about = "About",
    audio = "Audio",
    search = "Search",
    download = "Download"
}

export type RootStackParamList = {
    [ScreenName.home]: undefined;
    [ScreenName.about]: { title: string };
    [ScreenName.audio]: { item: IAudiData };
    [ScreenName.search]: undefined,
    [ScreenName.download]: undefined
};


export type IHomeScreenPropsHomeScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  ScreenName.home
>;

export type AboutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ScreenName.about
>;

export type Navigation = NativeStackNavigationProp<RootStackParamList, ScreenName, any>