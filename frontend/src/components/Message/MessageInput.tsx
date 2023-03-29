import React, { useEffect } from "react"
import { io, Socket } from "socket.io-client"
import { Input, InputGroup } from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useAppDispatch } from "../../store/store"
import { setSelectedServer } from "../../store/features/diskord/diskordSlice"


const socket = io('http://localhost:3000');


const MessageInput = () => {


  const params = useParams()
  const dispatch: useAppDispatch = useDispatch()
  useEffect(() => {
    if (params) {
      dispatch(setSelectedServer(params.serverId))
    }
    socket.connect()
    socket.on('connect',()=>{
      console.log('socketId',socket.id)
    })
  }, [])

  return (
    <div className="flex  top-0 pl-3  pr-3 w-full h-12 border-none pb-5  justify-between items-center bg-[#3a3a3c]">
      <InputGroup
        position="relative"
        paddingLeft="3rem"
        paddingRight="3rem"
      >
        <div className="flex w-full bg-[#4e4e50] rounded-lg pl-3 pr-3 h-10">
          <Input
            variant="unstyled"
            size="lg"
            textColor="white"
            placeholder={`message #channelName`}
          />
        </div>
      </InputGroup>
    </div>
  )
}

export default MessageInput
