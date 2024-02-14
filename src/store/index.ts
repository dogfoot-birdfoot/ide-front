import { configureStore } from "@reduxjs/toolkit"
import chatButtonReducer from "@/pages/IDEPage/ChatButtonSlice"
import fileTreeReducer from "@/pages/IDEPage/FileTreeSlice"

export const store = configureStore({
  reducer: {
    chatButton: chatButtonReducer,
    fileTree: fileTreeReducer
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
