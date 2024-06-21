import { createAppAsyncThunk } from "../../utils/redux.utils";
import { apiAudio } from "../../api/api-services";

export const getAudioList = createAppAsyncThunk(
    'audio/getAudioList',
    async (q: string, { rejectWithValue }) =>
        apiAudio.getAudioList(q).catch((error) => rejectWithValue(error.message)),
  )
  