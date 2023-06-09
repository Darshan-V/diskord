import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Routes, Route } from "react-router-dom"
import { useLocation } from "react-router-dom"
import LeftNavbar from "./components/LeftNavbar/LeftNavbar"
import MessagesContainer from "./components/Message/MessagesContainer"
import Signup from "./components/Regestration/Signup"

function App() {
  const location = useLocation()
  interface dState {
    isLoggedIn: boolean
  }

  const isLoggedIn = useSelector(
    (state: dState) => state.isLoggedIn
  )

  return (
    <div className="flex w-screen h-screen bg-[#28292d]">
      {location.pathname !== "/" ? <LeftNavbar /> : ""}
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route
          path="/diskord/servers/:serverId?/channels?/:channelId?"
          element={<MessagesContainer />}
        />
      </Routes>
    </div>
  )
}

export default App
