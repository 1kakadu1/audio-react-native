import { createAppAsyncThunk } from "../../utils/redux.utils";
import { apiAudio } from "../../api/api-services";
import { setAudioList, setCountAudioList, setPageAudioList } from "store/audio/audio.slice";

export const getSearchAudioList = createAppAsyncThunk(
    'search/getSearchAudioList',
    async (q: string, { rejectWithValue, dispatch }) =>{
        try {
            const response = await apiAudio.getAudioList(q);
            if(response.results.length > 0){
                dispatch(setAudioList(response.results))
                dispatch(setCountAudioList(response.count))
                dispatch(setPageAudioList(1))
            }
            return {
                search: q,
                data: response.results
            }
        } catch (error: any) {
            return  rejectWithValue(error.message)
        }
    }
  )
  