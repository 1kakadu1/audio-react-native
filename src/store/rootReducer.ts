import { combineReducers } from "@reduxjs/toolkit"
import  audio from './audio/audio.slice';

import { PersistConfig, persistReducer, persistStore } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['auth', 'downloadAudio'],
}

export const rootReducer = combineReducers({
    audio
})

export const persistedReducer = persistReducer(persistConfig, rootReducer)

export type RootState = ReturnType<typeof rootReducer>
  