export type AudioType = "waw" | "mp3" | "ogg";

export interface IAudioSoundPreview{
    "preview-hq-mp3": string,
    "preview-hq-ogg": string,
    "preview-lq-mp3": string,
    "preview-lq-ogg": string
}

export interface IAudiData{
    id: number,
    url: string,
    name: string,
    tags: string[],
    description: string,
    type: AudioType,
    duration: number,
    download: string,
    previews: IAudioSoundPreview
} 