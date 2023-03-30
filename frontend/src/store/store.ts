import { configureStore, Store } from "@reduxjs/toolkit"
import diskordReduser from "./features/diskord/diskordSlice"

export type useAppDispatch = typeof store.dispatch
export type useAppSelector = typeof store.getState

export const store: Store<any> = configureStore({
  reducer: diskordReduser,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  })
})
