import { createAppAsyncThunk } from "../../utils/redux.utils";
import { apiAudio } from "../../api/api-services";

export const getAudioList = createAppAsyncThunk(
    'audio/getAudioList',
    async ({q, page = 1}:{q:string, page: number}, { rejectWithValue }) =>{
        return apiAudio.getAudioList(q, page).catch((error) => rejectWithValue(error.message))
    },
  )
  
  export const loadMoreAudioList = createAppAsyncThunk(
    'audio/loadMoreAudioList',
    async ({q, page}:{q:string, page: number}, { rejectWithValue }) =>
        apiAudio.getAudioList(q, page).catch((error) => rejectWithValue(error.message)),
  )