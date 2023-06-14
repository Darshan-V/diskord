import React, { useEffect, useState } from "react"
import { Input, InputGroup } from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useAppDispatch } from "../../store/store"
import { setSelectedServer } from "../../store/features/diskord/diskordSlice"
import socket from "../../socket"

const MessageInput = (props: { setMessages: any }) => {
  const [value, setValue] = useState("")

  const params = useParams()
  const dispatch: useAppDispatch = useDispatch()

  interface dState {
    diskord: {
      activeServer: string
      activeChannel: string
    }
  }
  const diskordState = useSelector(
    (state: dState) => state.diskord
  )

  interface bMsg {
    self: boolean
    msgTxt: string
    msgTime: string
    channelId: number
    logMsg: boolean
    user: string
  }

  useEffect(() => {
    if (params) {
      dispatch(setSelectedServer(params.serverId))
    }

    socket.on("connect", () => {
      console.log("socketId", socket.id)
    })

    socket.on("join-channel", (msg: any) => {
      console.log(msg)
    })

    socket.on("broadcast-msg", (msg: bMsg) => {
      msg.self = false
      msg.user = navigator.userAgent
      props.setMessages((currentMsgs: any) => {
        return [...currentMsgs, msg]
      })
    })
  }, [])

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(event.target.value)
  }

  const newMessage = {
    msgTxt: value,
    channelId: Number(diskordState.activeChannel),
    self: true,
    user: navigator.userAgent
  }

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    console.log(newMessage)
    socket.emit("new-msg", newMessage)
    props.setMessages((currentMessages: []) => {
      return [...currentMessages, newMessage]
    })

    setValue("")
  }

  return (
    <div className="flex  top-0 pl-3  pr-3 w-full h-12 border-none pb-5  justify-between items-center bg-[#3a3a3c]">
      <InputGroup
        position="relative"
        paddingLeft="3rem"
        paddingRight="3rem"
      >
        <div className="flex w-full bg-[#4e4e50] rounded-lg pl-3 pr-3 h-10">
          <form
            onSubmit={handleSubmit}
            className="flex w-full"
          >
            <Input
              variant="unstyled"
              size="xl"
              textColor="white"
              placeholder={`message #channelName`}
              value={value}
              onChange={handleInputChange}
            />
          </form>
        </div>
      </InputGroup>
    </div>
  )
}

export default MessageInput
