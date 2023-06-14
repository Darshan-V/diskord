import React from "react"
import ServerIcons from "./ServerIcons"
import { useGetWorkspacesQuery } from "../../store/services/diskordApi"

const ServerSidebar = () => {
  const { data, isLoading } = useGetWorkspacesQuery()

  if (isLoading) {
    return <div>Loading..</div>
  }
  return (
    <div className="flex flex-col h-full w-20 bg-[#1E1F22]">
      <ServerIcons data={data} />
    </div>
  )
}

export default ServerSidebar
