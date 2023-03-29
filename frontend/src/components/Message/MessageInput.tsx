import React, { useEffect } from "react"
import { Input, InputGroup } from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useAppDispatch } from "../../store/store"
import { setSelectedServer } from "../../store/features/diskord/diskordSlice"

const MessageInput = () => {
  const params = useParams()
  const dispatch: useAppDispatch = useDispatch()
  useEffect(() => {
    if (params) {
      dispatch(setSelectedServer(params.serverId))
    }
  }, [])

  return (
    <div className="flex flex-col relative w-full mb-5">
      <InputGroup
        position="absolute"
        bottom="1"
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
