import { createSlice } from "@reduxjs/toolkit"

interface ChatButtonState {
  value: boolean
}

const initialState: ChatButtonState = {
  value: false
}

export const ChatButtonSlice = createSlice({
  name: "chatButton",
  initialState,
  reducers: {
    toggleChatButton: state => {
      state.value = !state.value
    },
    closeChatButton: state => {
      state.value = false
    }
  }
})

export const { toggleChatButton, closeChatButton } = ChatButtonSlice.actions
export default ChatButtonSlice.reducer
