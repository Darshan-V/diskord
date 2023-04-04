import React from "react"
import { Routes, Route } from "react-router-dom"
import LeftNavbar from "./components/LeftNavbar/LeftNavbar"
import MessagesContainer from "./components/Message/MessagesContainer"

function App() {
  return (
    <div className="flex w-screen h-screen bg-[#28292d]">
      <LeftNavbar />
      <Routes>
        <Route
          path="/diskord/servers/:serverId/channels?/:channelId?"
          element={<MessagesContainer />}
        />
      </Routes>
    </div>
  )
}

export default App
