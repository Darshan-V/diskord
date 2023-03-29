import React from "react"
import MessageInput from "./MessageInput"
import MessageBoxHeader from "./MessageBoxHeader"

const MessagesContainer = () => {
  return (
    <div className="flex flex-wrap w-full h-full bg-[#252526]">
      <MessageBoxHeader />
      <MessageInput />
    </div>
  )
}

export default MessagesContainer
