import React, { Component, FC, useState } from "react"
import { MdOutlineAdd } from "react-icons/md"
import {
  ModalOverlay,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from "@chakra-ui/react"

const CreateServer = () => {
  const OverlayCreateServer: FC = () => (
    <ModalOverlay
      bg="blackAlpha.600"
      backdropFilter="blur(10px) hue-rotate(20deg)"
    />
  )

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [overlay, setOverlay] = useState(
    <OverlayCreateServer />
  )
  return (
    <>
      <div
        className="flex m-auto w-14 h-14 bg-slate-700 rounded-full shadow-xl"
        onClick={() => {
          setOverlay(<OverlayCreateServer />)
          onOpen()
        }}
      >
        <MdOutlineAdd className="m-auto text-3xl font-semibold text-green-500" />
      </div>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <div className="flex flex-col w-full p-3 flex-wrap">
            <div className="m-auto">
              <h2 className="font-mono font-bold text-xl">
                Create Server
              </h2>
            </div>
            <p className="w-full justify-center font-sans font-light text-sm p-3">
              Your server is where you and your friends hang
              out. Make yours and start talking
            </p>
          </div>
          <ModalCloseButton />
          <ModalBody>
            <p>Custom backdrop filters!</p>
          </ModalBody>
          <ModalFooter
            margin={3}
            padding={0}
            display={"flex"}
            flexDir={"column"}
            width={"full"}
          >
            <p className="font-sans font-semibold text-md">
              Already have an invite?
            </p>
            <div className="w-4/5 m-auto p-2">
              <button className="w-full bg-[#4E5058] text-white h-10 rounded-md">
                Join a Server
              </button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateServer
