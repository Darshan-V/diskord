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
<<<<<<< HEAD
          path="/channels/:channelId"
          element={<MessagesContainer />}
=======
          path="/diskord/servers/:serverId"
          element={<MessageInput />}
>>>>>>> frontend
        />
      </Routes>
    </div>
  )
}

export default App
