import React from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch,useSelector } from "react-redux"
import { Tooltip } from "@chakra-ui/react"

import { setSelectedServer } from "../../store/features/diskord/diskordSlice"
import { useAppDispatch } from "../../store/store"
import CreateServer from "./CreateServer"
import diskData from "./../../diskData.json"

const ServerIcons = () => {
  const servers = diskData

  const navigate = useNavigate()
  const dispatch: useAppDispatch = useDispatch()

  interface dState {
    activeServer: string
    activeChannel: string
  }

  const diskordState = useSelector((state:dState)=>state)
  const activeServer = Number(diskordState.activeServer)
  
  

  function handleClickServer(id: number) {
    dispatch(setSelectedServer(id))
    navigate(`/diskord/servers/${id}`)
  }

  return (
    <div>
      <ul className="flex flex-col justify-start h-full">
        {servers.map((space, i) => (
          <div
            key={i}
            className="flex w-20 h-20 hover:cursor-pointer"
            onClick={() => {
              handleClickServer(space?.id)
            }}
          >
            {space.id === activeServer?
            <div className="w-1 h-14 bg-white my-auto rounded-tr-xl rounded-br-xl"></div>:null}
            {/* <div className="w-1 h-2 bg-white my-auto rounded-tr-xl rounded-br-xl"></div> */}
            <Tooltip
              label={space?.serverName}
              placement="right"
              hasArrow={true}
            >
              <div className="flex m-auto w-14 h-14 bg-slate-700 rounded-2xl shadow-xl ">
                <span className="font-sans font-semibold text-xl text-white w-6 h-6 m-auto overflow-x-hidden overflow-y-hidden">
                  {space?.serverName}
                </span>
              </div>
            </Tooltip>
          </div>
        ))}
        <div className="flex w-20 h-20 hover:cursor-pointer">
          <CreateServer />
        </div>
      </ul>
    </div>
  )
}

export default ServerIcons
