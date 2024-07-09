import { createAppAsyncThunk } from "../../utils/redux.utils";
import { apiAudio } from "../../api/api-services";
import { setAudioList } from "store/audio/audio.slice";

export const getSearchAudioList = createAppAsyncThunk(
    'search/getSearchAudioList',
    async (q: string, { rejectWithValue, dispatch }) =>{
        try {
            const response = await apiAudio.getAudioList(q);
            if(response.length > 0){
                dispatch(setAudioList(response))
            }
            return {
                search: q,
                data: response
            }
        } catch (error: any) {
            return  rejectWithValue(error.message)
        }
    }
  )
  