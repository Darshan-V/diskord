import { createSlice } from "@reduxjs/toolkit"
import { io, Socket } from "socket.io-client"

export interface DiskordState {
  activeServer: string
  activeChannel: string
  socket: Socket
  isLoggedIn: boolean
  workspaces:[]
  channels:[]
  messages:{}
}

const initialState: DiskordState = {
  activeServer: "",
  activeChannel: "",
  socket: io("http://localhost:3000"),
  isLoggedIn: false,
  workspaces:[],
  channels:[],
  messages:{}
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
    setMessages:(state,action) => {
      state.messages = action.payload
    }
  }
})

export const { setSelectedServer, setSelectedChannel, setLoggedInStatus } =
  diskordSlice.actions

export default diskordSlice.reducer
