import React from "react"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from "@chakra-ui/react"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"

import TextChannels from "./TextChannels"
import { useGetWorkspacesQuery } from "../../store/services/diskordApi"

const ChannelPane = () => {
  const {
    data: servers,
    error,
    isLoading
  } = useGetWorkspacesQuery()

  interface dState {
    diskord: { activeServer: string; activeChannel: string }
  }

  const diskordState = useSelector(
    (state: dState) => state.diskord
  )

  const serverId = diskordState.activeServer

  if (isLoading) {
    return <div>Loading...</div>
  }
  const serverGroup = servers.find(
    (item: { workSpaceId: number }) =>
      item.workSpaceId === Number(serverId)
  )

  return (
    <div className="flex flex-col w-60 h-full bg-[#3f4147]">
      <div className="flex top-0 pl-3 pt-3 pr-3 w-full h-12 border-2 border-[#3f4147] border-b-slate-500">
        <Menu>
          <div className="flex w-full ">
            <MenuButton
              textColor="white"
              fontWeight="bold"
              fontFamily="sans-serif"
            >{`${
              serverGroup?.workSpaceName !== undefined
                ? serverGroup.workSpaceName.toUpperCase()
                : ""
            }'s Server`}</MenuButton>
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
