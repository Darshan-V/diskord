import { createSlice } from "@reduxjs/toolkit"

export interface DiskordState {
  activeServer: string
  activeChannel: string
}

const initialState: DiskordState = {
  activeServer: "",
  activeChannel: ""
}

const diskordSlice = createSlice({
  name: "diskord",
  initialState,
  reducers: {
    setSelectedServer: (state, action) => {
      state.activeServer = action.payload
    },
    setSelectedChannel: (state, action) => {
      state.activeChannel = action.payload
    }
  }
})

export const { setSelectedServer, setSelectedChannel } =
  diskordSlice.actions

export default diskordSlice.reducer
