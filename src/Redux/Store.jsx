import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../Redux/CartCounterSlice'
import storage from "redux-persist/lib/storage"
import {persistReducer} from "redux-persist"
import { combineReducers } from '@reduxjs/toolkit'
import searchReducer from '../Redux/SearchSlice'

const persistConfig = {
  key:"root",
  storage,
}

const reducer = combineReducers({
  counter: counterReducer,
  search: searchReducer
})

const persistedReducer = persistReducer(persistConfig,reducer)


export const store = configureStore({
  reducer: persistedReducer
})