import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { IAudiData } from "../models";

export enum ScreenName{
    home = "Home",
    about = "About",
    audio = "Audio"
}

export type RootStackParamList = {
    [ScreenName.home]: undefined;
    [ScreenName.about]: { title: string };
    [ScreenName.audio]: { item: IAudiData };
};


export type IHomeScreenPropsHomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ScreenName.home
>;

export type AboutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ScreenName.about
>;

export type Navigation = NativeStackNavigationProp<RootStackParamList, ScreenName, any>