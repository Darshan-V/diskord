import {
  createApi,
  fetchBaseQuery
} from "@reduxjs/toolkit/query/react"

export const diskordCoreApi = createApi({
  reducerPath: "diskordCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api"
  }),
  endpoints: (builder) => ({
    getWorkspaces: builder.query<any, void>({
      query: () => "/workspaces"
    }),

    getChannelsByServer: builder.query({
      query: (serverId) =>
        `/workspaces/${serverId}/channels`
    })
  })
})

export const {
  useGetWorkspacesQuery,
  useGetChannelsByServerQuery
} = diskordCoreApi
