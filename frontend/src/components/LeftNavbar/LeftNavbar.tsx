import React from "react"
import ChannelPane from "../Channels/ChannelPane"
import ServerSidebar from "../ServerSideBar/ServerSidebar"

const LeftNavbar = () => {
  return (
    <div className="flex flex-row h-screen">
      <ServerSidebar />
      <ChannelPane />
    </div>
  )
}

export default LeftNavbar
