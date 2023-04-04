import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  Tooltip,
  Avatar,
  AvatarBadge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button
} from "@chakra-ui/react"

import { setSelectedServer } from "../../store/features/diskord/diskordSlice"
import { useAppDispatch } from "../../store/store"
import { getAllServers } from "./../../../api/diskordApi"
import CreateServer from "./CreateServer"

const ServerIcons = () => {
  const [servers, setServers] = useState<any[]>([])

  const navigate = useNavigate()
  const dispatch: useAppDispatch = useDispatch()

  interface dState {
    activeServer: string
    activeChannel: string
  }

  const diskordState = useSelector((state: dState) => state)
  const activeServer = Number(diskordState.activeServer)
  const activeChannel = Number(diskordState.activeChannel)

  function handleClickServer(id: number) {
    dispatch(setSelectedServer(id))
    navigate(`/diskord/servers/${id}`)
  }

  const getServers = async () => {
    const serversList = await getAllServers()
    setServers(serversList)
  }

  useEffect(() => {
    getServers()
  }, [])

  return (
    <div>
      <ul className="flex flex-col justify-start h-full">
        {servers.map((space, i) => (
          <div
            key={i}
            className="flex w-20 h-20 hover:cursor-pointer"
            onClick={() => {
              handleClickServer(space.workspace_id)
            }}
            onContextMenu={(e) => {
              e.preventDefault()
              console.log("right click")
            }}
          >
            {space.workspace_id === activeServer ? (
              <div className="w-1 h-14 bg-white my-auto rounded-tr-xl rounded-br-xl"></div>
            ) : null}
            {/* <div className="w-1 h-2 bg-white my-auto rounded-tr-xl rounded-br-xl"></div> */}
            <Tooltip
              label={space.workspace_name}
              placement="right"
              hasArrow={true}
            >
              <Avatar
                name={space.workspace_name}
                bg="gray.500"
                className="flex m-auto w-14 h-14 bg-slate-700 rounded-2xl shadow-xl "
              >
                {/* <AvatarBadge
                  boxSize="1.25rem"
                  bg="red.500"
                /> */}
              </Avatar>
            </Tooltip>
          </div>
        ))}
        <div className="flex w-20 h-20 cursor-pointer">
          <CreateServer />
        </div>
      </ul>
    </div>
  )
}

export default ServerIcons
