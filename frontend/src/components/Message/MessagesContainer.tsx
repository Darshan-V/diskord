import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import MessageInput from "./MessageInput"
import MessageBoxHeader from "./MessageBoxHeader"
import MessageBox from "./MessageBox"
import {
  setSelectedChannel,
  setSelectedServer
} from "../../store/features/diskord/diskordSlice"

const MessagesContainer = () => {
  interface dState {
    activeChannel: string
    activeServer: string
  }

  const dispatch = useDispatch()

  const [messages, setMessages] = useState<[]>([])
  const appState = useSelector((state: dState) => state)
  const channelId = appState.activeChannel
  const serverId = appState.activeServer
  const params = useParams()

  useEffect(() => {
    if (params) {
      dispatch(setSelectedServer(params.serverId))
    }
  })

  return (
    <>
      {channelId &&
      serverId &&
      params.channelId === String(channelId) ? (
        <div className="flex flex-col w-full h-screen  bg-[#252526]">
          <MessageBoxHeader />
          <MessageBox messages={messages} />
          <MessageInput setMessages={setMessages} />
        </div>
      ) : null}
    </>
  )
}

export default MessagesContainer
