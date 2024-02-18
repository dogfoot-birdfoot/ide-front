import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface InitialDataState {
  value: any
}

const initialState: InitialDataState = {
  value: { root: { children: [], depth: 0 } }
}

export const InitialDataSlice = createSlice({
  name: "initialData",
  initialState,
  reducers: {
    setInitialData: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    }
  }
})

export const { setInitialData } = InitialDataSlice.actions
export default InitialDataSlice.reducer
