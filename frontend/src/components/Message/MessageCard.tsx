import React from "react"
import { useSelector } from "react-redux"
import { Card, CardBody, Avatar } from "@chakra-ui/react"

const MessageCard = (props: {
  messages: any
}): JSX.Element => {
  console.log(props.messages)

  interface dState {
    activeServer: string
    activeChannel: string
  }
  const diskordState = useSelector((state: dState) => state)
  const activeChannel = diskordState.activeChannel

  return (
    <div>
      {props.messages.map((message: any, i: any) => (
        <div key={i}>
          {message.channelId === activeChannel ? (
            <Card
              background={"#3a3a3c"}
              className="hover:bg-[#232324]"
              w="full"
            >
              <CardBody p="2" display="flex" w="full">
                <Avatar
                  size="sm"
                  bg="gray.600"
                  className="hover:cursor-pointer"
                />
                <div className="flex flex-col w-full h-full pr-2 pl-2">
                  <span className="text-gray-100 text-md font-sans">
                    User name
                  </span>
                  <span className="text-gray-400 text-md pl-2">
                    {message.msgTxt}
                  </span>
                </div>
              </CardBody>
            </Card>
          ) : null}
        </div>
      ))}
    </div>
  )
}

export default MessageCard
