import { createSlice } from "@reduxjs/toolkit"

export interface DiskordState {
  activeServer: string
  activeChannel: string
  isLoggedIn: boolean
  workspaces: []
  channels: []
  messages: {}
}

const initialState: DiskordState = {
  activeServer: "",
  activeChannel: "",
  isLoggedIn: false,
  workspaces: [],
  channels: [],
  messages: {}
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
    },
    setLoggedInStatus: (state, action) => {
      state.isLoggedIn = action.payload
    },
    setMessages: (state, action) => {
      state.messages = action.payload
    }
  }
})

export const {
  setSelectedServer,
  setSelectedChannel,
  setLoggedInStatus
} = diskordSlice.actions

export default diskordSlice.reducer
