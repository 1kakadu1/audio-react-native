import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AUDIO_MOCK, INITIAL_STATE, SLICE_NAME } from './audio.const'
import { IAudiData } from '../../models/audio'
import { getAudioList } from './audio.thunk'

export const audioSlice = createSlice({
    name: SLICE_NAME,
    initialState: INITIAL_STATE,
    reducers: {
      setAudioLoading: (state,  action: PayloadAction<boolean>)=>{
        state.isLoading = action.payload
      },
      setAudioList: (state,  action: PayloadAction<IAudiData[]>) => {
        state.audio = action.payload;
      },
      setAudioProgress: (state, { payload }: PayloadAction<{id: number, progress: number}>) => {
        state.audioProgress = { ...state.audioProgress, [payload.id]: payload.progress }
      },
      setCurrentTrack: (state, { payload }:  PayloadAction< number | null>) => {
        state.currentTrack = payload
      },
      addAudioDowload: (state, { payload }:  PayloadAction<IAudiData>) => {
        state.audioDownload = {...state.audioDownload, [payload.id]: payload} 
      }
    },
    extraReducers:(builder) => {
      builder.addCase(getAudioList.pending, (state) => {
        state.isLoading = true
      })
      builder.addCase(getAudioList.fulfilled, (state, { payload }) => {
        state.audio = [
        ...AUDIO_MOCK,
        ...payload
        ];
        state.isLoading = false
      })
      builder.addCase(getAudioList.rejected, (state, { payload }) => {
        state.error = payload
        state.isLoading = false
      })
    }
  })

  export const { setAudioList , setAudioProgress, setCurrentTrack, setAudioLoading, addAudioDowload } = audioSlice.actions
  
  export default audioSlice.reducer