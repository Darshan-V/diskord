import React from "react"
import { Tooltip } from "@chakra-ui/react"
import { BiHash } from "react-icons/bi"
import {
  BsSignpost2,
  BsPinAngleFill,
  BsBellFill,
  BsPeopleFill,
  BsInboxFill
} from "react-icons/bs"

const MessageBoxHeader = () => {
  const icons = [
    { name: "Threads", icon: BsSignpost2 },
    {
      name: "Pinned Messages",
      icon: BsPinAngleFill
    },
    {
      name: "Notifications",
      icon: BsBellFill
    },
    {
      name: "Show Member List",
      icon: BsPeopleFill
    },
    {
      name: "Inbox",
      icon: BsInboxFill
    }
  ]

  return (
    <div className="flex  top-0 pl-3  pr-3 w-full h-12 border-2 border-[#3f4147] border-b-slate-500 justify-between items-center">
      <div className="flex w-1/4 h-full items-center">
        <BiHash className="text-gray-500 text-2xl" />

        <h2 className="text-gray-400 font-sans font-semibold">
          &nbsp; &nbsp;general
        </h2>
      </div>
      <div className="flex w-1/4 justify-evenly">
        {icons.map((icon, i) => (
          <Tooltip
            label={icon.name}
            placement="bottom"
            key={i}
          >
            <span className=" hover:cursor-pointer">
              <icon.icon className="text-gray-500 text-xl" />
            </span>
          </Tooltip>
        ))}
      </div>
    </div>
  )
}

export default MessageBoxHeader
