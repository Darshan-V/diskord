import React from "react"
import { Routes, Route } from "react-router-dom"
import ServerSidebar from "./components/ServerSideBar/ServerSidebar"
import ChannelPane from "./components/Channels/ChannelPane.js"

function App() {
  return (
    <div className="flex w-screen h-screen bg-[#28292d]">
      <ServerSidebar />
      <ChannelPane />
    </div>
  )
}

export default App
