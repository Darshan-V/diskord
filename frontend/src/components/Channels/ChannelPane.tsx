import React from "react"
import TextChannels from "./TextChannels"
import { useSelector } from "react-redux"
import diskData from "./../../diskData.json"

const ChannelPane = () => {
  interface dState {
    activeServer: string
    activeChannel: string
  }

  const diskordState = useSelector((state: dState) => state)

  const serverId: string = diskordState.activeServer
  const serverGroup = diskData.find(
    (item) => item.id === Number(serverId)
  )

  return (
    <div className="flex flex-col w-60 h-full bg-[#3f4147] ">
      <div className="flex  top-0 pl-3 pt-3 w-full h-12 border-2 border-[#3f4147] border-b-slate-500">
        <span className="text-white">
          {serverGroup?.serverName?.toUpperCase()}
        </span>
      </div>
      <div>
        <TextChannels />
      </div>
    </div>
  )
}

export default ChannelPane
