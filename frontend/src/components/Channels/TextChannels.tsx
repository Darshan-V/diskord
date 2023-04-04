import React from "react"
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box
} from "@chakra-ui/react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { useAppDispatch } from "../../store/store"
import diskData from "../../diskData.json"
import { setSelectedChannel } from "../../store/features/diskord/diskordSlice"

// const socket = io("http://localhost:3000")

const TextChannels = () => {
  const dispatch: useAppDispatch = useDispatch()
  const navigate = useNavigate()
  interface dState {
    activeServer: string
    activeChannel: string
  }

  const diskordState = useSelector((state: dState) => state)

  const socket = useSelector((state: any) => state.socket)

  const serverId: string = diskordState.activeServer
  const serverGroup = diskData.find(
    (item) => item.id === Number(serverId)
  )
  const channelsList = serverGroup?.channels

  function handleClickChannel(id: number) {
    dispatch(setSelectedChannel(id))
    socket.emit("join-channel", id)
    navigate(`/diskord/servers/${serverId}/channels/${id}`)
  }

  return (
    <Accordion
      defaultIndex={[1]}
      allowToggle={true}
      className="pt-3"
    >
      <AccordionItem borderColor="#3f4147">
        <h2>
          <AccordionButton border="none">
            <Box
              as="span"
              flex="1"
              textAlign="left"
              color="gray.400"
              className=" hover:text-white"
              fontSize="sm"
            >
              Text Channels
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <div>
            {channelsList?.map((channel, i) => (
              <div key={i}>
                {channel?.id ===
                Number(diskordState.activeChannel) ? (
                  <div
                    className="flex w-full h-10 bg-[#494a4d] hover:cursor-pointer rounded-lg"
                    onClick={() =>
                      handleClickChannel(channel?.id)
                    }
                  >
                    <span className="my-auto p-2 text-md text-[#919395] hover:text-white hover:cursor-pointer">
                      {"# "}
                      {channel?.name}
                    </span>
                  </div>
                ) : (
                  <div
                    className="flex w-full h-10 hover:bg-[#494a4d] hover:cursor-pointer hover:rounded-lg"
                    onClick={() =>
                      handleClickChannel(channel?.id)
                    }
                  >
                    <span className="my-auto p-2 text-md text-[#919395] hover:text-white hover:cursor-pointer">
                      {"# "}
                      {channel?.name}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default TextChannels
