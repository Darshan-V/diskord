import React from "react"
import { Routes, Route } from "react-router-dom"
import LeftNavbar from "./components/LeftNavbar/LeftNavbar"

function App() {
  return (
    <div className="flex w-screen h-screen bg-[#28292d]">
      <LeftNavbar />
    </div>
  )
}

export default App
