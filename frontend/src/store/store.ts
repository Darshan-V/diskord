import { configureStore, Store } from "@reduxjs/toolkit"
import diskordReducer from "./features/diskord/diskordSlice"
import { diskordCoreApi } from "./services/diskordServices"

export type useAppDispatch = typeof store.dispatch
export type useAppSelector = typeof store.getState

export const store: Store<any> = configureStore({
  reducer: {[diskordCoreApi.reducerPath]:diskordCoreApi.reducer},
  // diskord: diskordReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware().concat(diskordCoreApi.middleware),
})
