import { IAudioState } from "./audio.model";

export const INITIAL_STATE: IAudioState = {
    audio: [],
    currentTrack: null,
    isLoading: false,
    error: undefined,
    audioProgress: {}
}
  
export const SLICE_NAME = "audio";