import { IAudiData } from "models";
import { IAudioState } from "./audio.model";

export const INITIAL_STATE: IAudioState = {
    audio: [],
    currentTrack: null,
    isLoading: false,
    error: undefined,
    audioProgress: {}
}
  
export const SLICE_NAME = "audio";

export const AUDIO_MOCK_URL = [
    'https://firebasestorage.googleapis.com/v0/b/cofee-flutter.appspot.com/o/audio%2FZESKULLZ,%20TERRA%20BLVCK,%20Jimmy%20Wit%20an%20H%20feat.%20WA-YA%20-%20Life%20In%20The%20Sun.mp3?alt=media&token=120e943f-5dc1-4e53-a257-dd49cb1f1cb9', 
    'https://firebasestorage.googleapis.com/v0/b/cofee-flutter.appspot.com/o/audio%2FThe%20Lonely%20Tree%20-%20The%20Lonely%20Tree.mp3?alt=media&token=c96d0de8-6aa7-45e5-877e-2e61ab7a81fd',
    'https://firebasestorage.googleapis.com/v0/b/cofee-flutter.appspot.com/o/audio%2FIsaak%20Wolf%20-%20Melancholy.mp3?alt=media&token=6cf14a18-4b24-4b0b-b069-48c69a6c26bc',
];

export const  AUDIO_MOCK: IAudiData[] = [
    {
        id: 6666666,
        url: AUDIO_MOCK_URL[0],
        name: "ZESKULLZ, TERRA BLVCK, Jimmy Wit an H feat. WA-YA - Life In The Sun",
        tags: [],
        description: "",
        typeAudio: "mp3",
        duration: 164,
        download: AUDIO_MOCK_URL[0],
        previews: {
          "preview-hq-mp3": AUDIO_MOCK_URL[0],
          "preview-hq-ogg": AUDIO_MOCK_URL[0],
          "preview-lq-mp3": AUDIO_MOCK_URL[0],
          "preview-lq-ogg": AUDIO_MOCK_URL[0]
        },
        image: "https://firebasestorage.googleapis.com/v0/b/cofee-flutter.appspot.com/o/images%2Fpreview%2F800x800cc.jpg?alt=media&token=ae87affe-acea-46d3-9e2c-888ad944c0d7"
      },
      {
        id: 6666667,
        url: AUDIO_MOCK_URL[0],
        name: "The Lonely Tree - The Lonely Tree",
        tags: [],
        description: "",
        typeAudio: "mp3",
        duration: 146,
        download: AUDIO_MOCK_URL[1],
        previews: {
          "preview-hq-mp3": AUDIO_MOCK_URL[1],
          "preview-hq-ogg": AUDIO_MOCK_URL[1],
          "preview-lq-mp3": AUDIO_MOCK_URL[1],
          "preview-lq-ogg": AUDIO_MOCK_URL[1]
        }
      },
      {
        id: 6666668,
        url: AUDIO_MOCK_URL[0],
        name: "Isaak Wolf - Melancholy",
        tags: [],
        description: "",
        typeAudio: "mp3",
        duration: 469,
        download: AUDIO_MOCK_URL[2],
        previews: {
          "preview-hq-mp3": AUDIO_MOCK_URL[2],
          "preview-hq-ogg": AUDIO_MOCK_URL[2],
          "preview-lq-mp3": AUDIO_MOCK_URL[2],
          "preview-lq-ogg": AUDIO_MOCK_URL[2]
        }
      },
]