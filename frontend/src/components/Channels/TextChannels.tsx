import React from "react"
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box
} from "@chakra-ui/react"
import { useSelector } from "react-redux"

import diskData from "../../diskData.json"

const TextChannels = () => {
  interface dState {
    activeServer: string
    activeChannel: string
  }

  const diskordState = useSelector((state: dState) => state)

  const serverId: string = diskordState.activeServer
  const serverGroup = diskData.find(
    (item) => item.id === Number(serverId)
  )
  const channelsList = serverGroup?.channels

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
              <div
                key={i}
                className="flex w-full h-10 hover:bg-[#494a4d] hover:cursor-pointer hover:rounded-lg"
              >
                <span className="my-auto p-2 text-md text-[#919395] hover:text-white hover:cursor-pointer">
                  {"# "}
                  {channel}
                </span>
              </div>
            ))}
          </div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default TextChannels
