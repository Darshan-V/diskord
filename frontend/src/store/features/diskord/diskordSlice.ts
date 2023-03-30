import { createSlice } from "@reduxjs/toolkit"
import { io, Socket } from "socket.io-client"

export interface DiskordState {
  activeServer: string
  activeChannel: string
  socket : Socket
}

const initialState: DiskordState = {
  activeServer: "",
  activeChannel: "",
  socket:io('http://localhost:3000')
 
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
   
  }
})

export const { setSelectedServer, setSelectedChannel } =
  diskordSlice.actions

export default diskordSlice.reducer
