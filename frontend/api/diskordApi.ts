import axios from "axios"

const baseUrl = "http://localhost:3000"

const getAllServers = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/workspaces`
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const getChannelByServer = async (serverId: string) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/workspaces/${serverId}/channels`
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export { getAllServers, getChannelByServer }
