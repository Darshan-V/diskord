import React from "react"
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box
} from "@chakra-ui/react"

const TextChannels = () => {
  const channelsList: string[] = ["general", "qna", "help"]
  return (
    <Accordion
      defaultIndex={[0]}
      allowMultiple
      allowToggle
      className="pt-3"
    >
      <AccordionItem borderColor="#3f4147">
        <h2>
          <AccordionButton border="none">
            <Box
              as="span"
              flex="1"
              textAlign="left"
              color="gray.400"
              className=" hover:text-white"
            >
              Channels
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <ul>
            {channelsList.map((channel, i) => (
              <div
                key={i}
                className="flex w-full h-10 hover:bg-[#494a4d] hover:cursor-pointer hover:rounded-lg"
              >
                <span className="my-auto p-2 text-md text-[#919395] hover:text-white hover:cursor-pointer">
                  {" "}
                  {channel}
                </span>
              </div>
            ))}
          </ul>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default TextChannels
