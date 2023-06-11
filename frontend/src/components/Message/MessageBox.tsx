import React, { useEffect } from "react"
import { useSelector } from "react-redux"

import MessageCard from "./MessageCard"

const MessageBox = (props: {
  messages: any
}): JSX.Element => {
  const socket = useSelector((state: any) => state.socket)
  interface dState {
    activeChannel: string
    activeServer: string
  }
  const diskordState = useSelector((state: dState) => state)
  const serverId = Number(diskordState.activeServer)
  const channelId = Number(diskordState.activeChannel)

  return (
    <div className="w-full h-full bg-[#3a3a3c]">
      {channelId ? (
        <MessageCard messages={props.messages} />
      ) : null}
    </div>
  )
}

export default MessageBox
