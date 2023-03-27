import React from "react"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button
} from "@chakra-ui/react"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import diskData from "./../../diskData.json"

import TextChannels from "./TextChannels"

const ChannelPane = () => {
  interface dState {
    activeServer: string
    activeChannel: string
  }

  const diskordState = useSelector((state: dState) => state)

  const serverId = diskordState.activeServer
  const serverGroup = diskData.find(
    (item) => item.id === Number(serverId)
  )

  return (
    <div className="flex flex-col w-60 h-full bg-[#3f4147] ">
      <div className="flex  top-0 pl-3 pt-3 pr-3 w-full h-12 border-2 border-[#3f4147] border-b-slate-500">
        <Menu>
          <div className="flex w-full ">
            <MenuButton
              textColor="white"
              fontWeight="bold"
              fontFamily="sans-serif"
            >{`${serverGroup?.serverName.toUpperCase()}'s Server`}</MenuButton>
            <BsChevronDown className="ml-auto" />
          </div>
          <MenuList>
            <MenuItem>Download</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem>Attend a Workshop</MenuItem>
          </MenuList>
        </Menu>
      </div>
      <div>
        <TextChannels />
      </div>
    </div>
  )
}

export default ChannelPane
