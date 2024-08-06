import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AUDIO_MOCK, INITIAL_STATE, SLICE_NAME } from './audio.const'
import { IAudiData } from '../../models/audio'
import { getAudioList, loadMoreAudioList } from './audio.thunk'

export const audioSlice = createSlice({
    name: SLICE_NAME,
    initialState: INITIAL_STATE,
    reducers: {
      setAudioLoading: (state,  action: PayloadAction<boolean>)=>{
        state.isLoading = action.payload
      },
      setAudioList: (state,  action: PayloadAction<IAudiData[]>) => {
        state.filter.page = 1;
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
      },
      removeAudioDowload: (state, { payload }:  PayloadAction<IAudiData>) => {
        if(state.audioDownload[payload.id]){
          const audio = {...state.audioDownload};
          delete audio[payload.id];
          state.audioDownload = {...audio};
        }
      },
      setCountAudioList: (state, { payload }: PayloadAction<number>)=>{
        state.filter.count = payload
      },
      setPageAudioList: (state, { payload }: PayloadAction<number>)=>{
        state.filter.page = payload
      },
      setInsdertAudio: (state, { payload }: PayloadAction<boolean>)=>{
        state.insert = payload
      }
    },
    extraReducers:(builder) => {
      builder.addCase(getAudioList.pending, (state) => {
        state.isLoading = true
      })
      builder.addCase(getAudioList.fulfilled, (state, { payload }) => {
        state.audio = [
        ...AUDIO_MOCK,
        ...payload.results
        ];
        state.filter.count = payload.count;
        state.isLoading = false
      })
      builder.addCase(getAudioList.rejected, (state, { payload }) => {
        state.error = payload
        state.isLoading = false
      })

      builder.addCase(loadMoreAudioList.pending, (state) => {
        state.isLoading = true
      })
      builder.addCase(loadMoreAudioList.fulfilled, (state, { payload }) => {
        state.insert = true;
        state.audio = [
        ...state.audio,
        ...payload.results
        ];
        state.filter.count = payload.count;
        state.filter.page = state.filter.page + 1;
        state.isLoading = false
      })
      builder.addCase(loadMoreAudioList.rejected, (state, { payload }) => {
        state.error = payload
        state.isLoading = false
      })
    }
  })

  export const { setInsdertAudio, setAudioList , setAudioProgress, setCurrentTrack, setAudioLoading, addAudioDowload, setPageAudioList, setCountAudioList, removeAudioDowload } = audioSlice.actions
  
  export default audioSlice.reducer