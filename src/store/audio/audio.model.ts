import { IAudiData } from "../../models/audio";

export type AudioProgress = Record<number, number>

export interface IAudioState{
    audio: IAudiData[],
    isLoading: boolean,
    error?: string,
    currentTrack: number | null,
    audioProgress: AudioProgress
    audioDownload: {
        [key: number]: IAudiData
    }
    filter:{
        page: number,
        count: number
    }
}

