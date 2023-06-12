import { configureStore, Store } from "@reduxjs/toolkit"
import diskordReducer from "./features/diskord/diskordSlice"
import { diskordCoreApi } from "./services/diskordApi"

export type useAppDispatch = typeof store.dispatch
export type useAppSelector = typeof store.getState

export const store: Store<any> = configureStore({
  reducer: {
    [diskordCoreApi.reducerPath]: diskordCoreApi.reducer,
    diskord: diskordReducer
  },
  // diskord: diskordReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(diskordCoreApi.middleware)
})
