import { configureStore } from "@reduxjs/toolkit"
import chatButtonReducer from "@/pages/IDEPage/ChatButtonSlice"

export const store = configureStore({
  reducer: {
    chatButton: chatButtonReducer
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
