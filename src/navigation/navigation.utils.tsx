import { NavigationContainerRef } from "@react-navigation/native";
import { createRef } from "react";
import { RootStackParamList } from "./navigation.model";

export const navigationRef = createRef<NavigationContainerRef<RootStackParamList>>()