import { IAudiData } from "models";
import { IAudioState } from "./audio.model";

export const INITIAL_STATE: IAudioState = {
    audio: [],
    currentTrack: null,
    isLoading: false,
    error: undefined,
    audioProgress: {},
    audioDownload: {},
    filter:{
      page: 1,
      count: 0,
    },
    insert: false,
}
  
export const SLICE_NAME = "audio";

export const AUDIO_MOCK_URL = [
    'https://firebasestorage.googleapis.com/v0/b/cofee-flutter.appspot.com/o/audio%2FZESKULLZ,%20TERRA%20BLVCK,%20Jimmy%20Wit%20an%20H%20feat.%20WA-YA%20-%20Life%20In%20The%20Sun.mp3?alt=media&token=120e943f-5dc1-4e53-a257-dd49cb1f1cb9', 
    'https://firebasestorage.googleapis.com/v0/b/cofee-flutter.appspot.com/o/audio%2FThe%20Lonely%20Tree%20-%20The%20Lonely%20Tree.mp3?alt=media&token=c96d0de8-6aa7-45e5-877e-2e61ab7a81fd',
    'https://firebasestorage.googleapis.com/v0/b/cofee-flutter.appspot.com/o/audio%2FIsaak%20Wolf%20-%20Melancholy.mp3?alt=media&token=6cf14a18-4b24-4b0b-b069-48c69a6c26bc',
    'https://firebasestorage.googleapis.com/v0/b/cofee-flutter.appspot.com/o/audio%2FBleach-OST-Kyoraku_s-Entrance-_extended_%20(1).mp3?alt=media&token=5a4db899-d6c6-4e7d-a13c-5bf3afe3a0b5',
    'https://firebasestorage.googleapis.com/v0/b/cofee-flutter.appspot.com/o/audio%2FSVARDSTAL%20-%20MISERY.mp3?alt=media&token=89383139-0497-4c36-955e-6066861313ff',
    'https://firebasestorage.googleapis.com/v0/b/cofee-flutter.appspot.com/o/audio%2FEVANGELION-x-PLENKA%20-%20%D0%A1%D0%98%D0%9D%D0%94%D0%97%D0%98-%D0%9F%D0%9E%D0%9F%D0%90%D0%9B-%D0%92-%D0%92%D0%98%D0%A7%D0%A5%D0%90%D0%A3%D0%A1-%20MASHUP.mp3?alt=media&token=55835b46-ecd7-4132-aac2-0f044598688a',

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
        url: AUDIO_MOCK_URL[1],
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
        url: AUDIO_MOCK_URL[2],
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
      {
        id: 6666669,
        url: AUDIO_MOCK_URL[3],
        name: "Bleach-OST-Kyoraku_s-Entrance",
        image: "https://firebasestorage.googleapis.com/v0/b/cofee-flutter.appspot.com/o/images%2Fpreview%2FScreenshot_14.png?alt=media&token=a99a3705-c341-49cb-b78a-4b6fcf63e2f7",
        tags: [],
        description: "",
        typeAudio: "mp3",
        duration: 192,
        download: AUDIO_MOCK_URL[3],
        previews: {
          "preview-hq-mp3": AUDIO_MOCK_URL[3],
          "preview-hq-ogg": AUDIO_MOCK_URL[3],
          "preview-lq-mp3": AUDIO_MOCK_URL[3],
          "preview-lq-ogg": AUDIO_MOCK_URL[3]
        }
      },
      {
        id: 6636699,
        url: AUDIO_MOCK_URL[4],
        name: "FSVARDSTAL-MISERY",
        description: "",
        typeAudio: "mp3",
        duration: 156,
        download: AUDIO_MOCK_URL[4],
        previews: {
          "preview-hq-mp3": AUDIO_MOCK_URL[4],
          "preview-hq-ogg": AUDIO_MOCK_URL[4],
          "preview-lq-mp3": AUDIO_MOCK_URL[4],
          "preview-lq-ogg": AUDIO_MOCK_URL[4]
        },
        tags: []
      },
      {
        id: 6663469,
        url: AUDIO_MOCK_URL[5],
        name: "EVANGELION-x-PLENKA - СИНДЗИ-ПОПАЛ-В-ВИЧХАУС- MASHUP",
        image: "https://firebasestorage.googleapis.com/v0/b/cofee-flutter.appspot.com/o/images%2Fpreview%2FScreenshot_13.png?alt=media&token=efcb0793-6c3f-4cd8-b032-eb06b7e3d1a4",
        tags: [],
        description: "",
        typeAudio: "mp3",
        duration: 155,
        download: AUDIO_MOCK_URL[5],
        previews: {
          "preview-hq-mp3": AUDIO_MOCK_URL[5],
          "preview-hq-ogg": AUDIO_MOCK_URL[5],
          "preview-lq-mp3": AUDIO_MOCK_URL[5],
          "preview-lq-ogg": AUDIO_MOCK_URL[5]
        }
      },
]