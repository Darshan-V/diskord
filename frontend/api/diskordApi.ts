import axios from "axios"

const baseUrl = "http://localhost:3000"

const getAllServers = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/workspaces`
    )
    return response.data
  } catch (error) {}
}

export { getAllServers }
