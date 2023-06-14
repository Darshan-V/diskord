import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  Tooltip,
  Avatar,
  AvatarBadge
} from "@chakra-ui/react"

import { setSelectedServer } from "../../store/features/diskord/diskordSlice"
import { useAppDispatch } from "../../store/store"
import CreateServer from "./CreateServer"

const ServerIcons = ({ data }: any) => {
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

  return (
    <div>
      <ul className="flex flex-col justify-start h-full">
        {data.map(
          (
            space: {
              workSpaceId: number
              workSpaceName:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    | string
                    | React.JSXElementConstructor<any>
                  >
                | React.ReactFragment
                | null
                | undefined
            },
            i: React.Key | null | undefined
          ) => (
            <div
              key={i}
              className="flex w-20 h-20 hover:cursor-pointer"
              onClick={() => {
                handleClickServer(space.workSpaceId)
              }}
              onContextMenu={(e) => {
                e.preventDefault()
                console.log("right click")
              }}
            >
              {space.workSpaceId === activeServer ? (
                <div className="w-1 h-14 bg-white my-auto rounded-tr-xl rounded-br-xl"></div>
              ) : null}
              {/* <div className="w-1 h-2 bg-white my-auto rounded-tr-xl rounded-br-xl"></div> */}
              <Tooltip
                label={space.workSpaceName}
                placement="right"
                hasArrow={true}
              >
                <Avatar
                  name={`${space.workSpaceName}`}
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
          )
        )}
        <div className="flex w-20 h-20 cursor-pointer">
          <CreateServer />
        </div>
      </ul>
    </div>
  )
}

export default ServerIcons
