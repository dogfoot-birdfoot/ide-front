import { createSlice } from "@reduxjs/toolkit"

interface FileTreeState {
  value: boolean
}

const initialState: FileTreeState = {
  value: true
}

export const FileTreeSlice = createSlice({
  name: "fileTree",
  initialState,
  reducers: {
    toggleTreeVisible: state => {
      state.value = !state.value
    },
    closeTree: state => {
      state.value = false
    }
  }
})

export const { toggleTreeVisible, closeTree } = FileTreeSlice.actions
export default FileTreeSlice.reducer
