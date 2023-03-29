import React from "react"
import MessageInput from "./MessageInput"
import MessageBoxHeader from "./MessageBoxHeader"
import MessageBox from "./MessageBox"

const MessagesContainer = () => {
  return (
    <div className="flex flex-col w-full h-screen  bg-[#252526]">
      <MessageBoxHeader />
      <MessageBox/>
      <MessageInput />
    </div>
  )
}

export default MessagesContainer
