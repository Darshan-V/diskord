import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const diskordCoreApi = createApi({
    reducerPath : 'diskordCoreApi',
    baseQuery : fetchBaseQuery({baseUrl:'http://localhost:3000/api'}),
    endpoints:(builder)=>({
        getWorkSpaces:builder.query({query:()=>'/workspaces'}),

        getChannelsByServer:builder.query({query:(serverId)=>`/workspaces/${serverId}/channels`})
    })
})

export const {
    useGetWorkSpacesQuery,
    useGetChannelsByServerQuery
}= diskordCoreApi