import React, { useEffect, useState } from "react"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button
} from "@chakra-ui/react"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"

import { getAllServers } from "../../../api/diskordApi"
import TextChannels from "./TextChannels"

const ChannelPane = () => {
  const [servers, setServers] = useState<any[]>([])

  const getServers = async () => {
    const serversList = await getAllServers()
    setServers(serversList)
  }

  useEffect(() => {
    getServers()
  }, [])
  interface dState {
    activeServer: string
    activeChannel: string
  }

  const diskordState = useSelector((state: dState) => state)

  const serverId = diskordState.activeServer
  const serverGroup = servers.find(
    (item) => item.workspace_id === Number(serverId)
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
            >{`${serverGroup?.workspace_name.toUpperCase()}'s Server`}</MenuButton>
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
