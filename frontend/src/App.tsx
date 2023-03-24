import React from "react"
import { Routes, Route } from "react-router-dom"
import LeftNavbar from "./components/LeftNavbar/LeftNavbar"
import MessageInput from "./components/Message/MessageInput"

function App() {
  return (
    <div className="flex w-screen h-screen bg-[#28292d]">
      <LeftNavbar />
      <Routes>
        <Route
          path="/channels/:channleId"
          element={<MessageInput />}
        />
      </Routes>
    </div>
  )
}

export default App
