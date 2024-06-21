import { LayoutBase } from "components/layouts/layoute-base";
import { StatusBar } from "expo-status-bar"
import { View, Text } from "react-native-ui-lib"

export function AboutScreen() {
    return (
        <LayoutBase>
            <StatusBar style="auto" />
            <Text>Audio</Text>
        </LayoutBase>
    );
}