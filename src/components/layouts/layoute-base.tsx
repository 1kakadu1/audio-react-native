import { AudioPlayerProvider } from "contexts/audio/audio.context"
import { AudioLayout } from "./audio-layout"
import { SafeAreaView } from "react-native-safe-area-context"

export const LayoutBase = ({children}: {children: React.ReactNode}) =>{
    return(
        <SafeAreaView>
            <AudioPlayerProvider>
                    {children}
            </AudioPlayerProvider>
        </SafeAreaView>
    )
}