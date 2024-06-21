import { AudioPlayerProvider } from "contexts/audio/audio.context"

export const LayoutBase = ({children}: {children: React.ReactNode}) =>{
    return(
        <AudioPlayerProvider>
            {children}
        </AudioPlayerProvider>
    )
}