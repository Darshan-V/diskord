import React from "react"
import { MdOutlineAdd } from "react-icons/md"

const ServerIcons = () => {
  const servers = ["one", "two", "three"]

  return (
    <div>
      <ul className="flex flex-col justify-start h-full">
        {servers.map((space, i) => (
          <div
            key={i}
            className="flex w-20 h-20 hover:cursor-pointer"
          >
            {/* <div className="w-1 h-14 bg-white my-auto rounded-tr-xl rounded-br-xl"></div> */}
            {/* <div className="w-1 h-2 bg-white my-auto rounded-tr-xl rounded-br-xl"></div> */}
            <div className="flex m-auto w-14 h-14 bg-slate-700 rounded-2xl shadow-xl ">
              <span className="font-sans font-semibold text-xl text-white w-6 h-6 m-auto overflow-x-hidden overflow-y-hidden">
                {space}
              </span>
            </div>
          </div>
        ))}
        <div className="flex w-20 h-20 hover:cursor-pointer">
          <div className="flex m-auto w-14 h-14 bg-slate-700 rounded-full shadow-xl">
            <MdOutlineAdd className="m-auto text-3xl font-semibold text-green-500" />
          </div>
        </div>
      </ul>
    </div>
  )
}

export default ServerIcons
