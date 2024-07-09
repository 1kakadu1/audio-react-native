import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { INITIAL_SEARCH_STATE, SLICE_NAME } from './search.const';
import { getSearchAudioList } from './search.thunk';


export const searchSlice = createSlice({
    name: SLICE_NAME,
    initialState: INITIAL_SEARCH_STATE,
    reducers: {
        addItemToHistory:(state,  action: PayloadAction<string>) => {
            if(!state.localHistory.includes(action.payload)){
                state.localHistory.push(action.payload);
            }
        },
        setSearch:(state,  action: PayloadAction<string>)=>{
            state.search = action.payload;
        }
    },
    extraReducers:(builder) => {
      builder.addCase(getSearchAudioList.pending, (state) => {
        state.isLoading = true
      })
      builder.addCase(getSearchAudioList.fulfilled, (state, { payload }) => {
        state.search = payload.search;
        state.isLoading = false;
        if(!state.localHistory.includes(payload.search)){
          state.localHistory.push(payload.search);
      }
      })
      builder.addCase(getSearchAudioList.rejected, (state, { payload }) => {
        state.error = payload
        state.isLoading = false
      })
    }
  })

  export const { addItemToHistory } = searchSlice.actions
  
  export default searchSlice.reducer