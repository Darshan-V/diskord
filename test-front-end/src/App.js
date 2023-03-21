import { useState, useEffect } from "react"
import io from "socket.io-client"

function App() {
  const [socket, setSocket] = useState(null)
  const [peerConnection, setPeerConnection] = useState(null)
  const [dataChannel, setDataChannel] = useState(null)
  const [messages, setMessages] = useState([])
  const [messageInput, setMessageInput] = useState("")
  const serverUrl = "http://localhost:3000"

  // initiate socket and RTCPeerConnection
  useEffect(() => {
    console.log("initiating sockets and data-channel")

    setSocket(
      io(serverUrl, {
        transports: ["websocket"]
      })
    )

    setPeerConnection(
      new RTCPeerConnection({
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302"
          }
        ]
      })
    )
  }, [])

  // initiate datachannel
  useEffect(() => {
    if (peerConnection) {
      console.log("adding data-channel")

      const dc = peerConnection.createDataChannel("new-channel")

      dc.onopen = () => {
        console.log("channel opened")
      }

      dc.onmessage = (event) => {
        console.log("recieved message:", event.data)
      }

      dc.onclose = (event) => {
        console.log("data channel closed")
      }

      setDataChannel(dc)
    }
  }, [peerConnection])

  //  socket listeners for incomming signal msgs
  useEffect(() => {
    ;(async () => {
      if (socket && peerConnection) {
        socket.on("message", async (message) => {
          console.log("incomming socket message", message.type)

          if (message.type === "offer") {
            await peerConnection.setRemoteDescription(message)
            const answer = await peerConnection.createAnswer()
            await peerConnection.setLocalDescription(answer)
            socket.emit("answer", answer)
          }

          if (message.type === "answer") {
            await peerConnection.setRemoteDescription(message)
          }

          if (message.type === "candidate") {
            const candidate = new RTCIceCandidate(message)
            await peerConnection.addIceCandidate(candidate)
          }
        })

        // send ice candidates
        peerConnection.onicecandidate = (event) => {
          if (event.candidate && socket) {
            console.log("ice-candidate received") // event.candidate
            socket.emit("iceCandidate", event.candidate) // even.candidate is not null when an ice candidate is found
          }
        }

        // sending offer (SDP) to remote peer
        const sdpOffer = await peerConnection.createOffer()
        await peerConnection.setLocalDescription(sdpOffer)
        console.log("sending sdp-Offer:") // sdpOffer
        socket.emit("offer", sdpOffer)
      }
    })()
  }, [socket, peerConnection])

  const sendMessage = (message) => {
    if (dataChannel && dataChannel.readyState === "open") {
      console.log("data channel openned, sending msg")
      dataChannel.send(message)
      setMessages((messages) => [...messages, { text: message, fromMe: true }])
      return
    }
    console.log("no data channel")
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (messageInput) {
      sendMessage(messageInput)
      setMessageInput("")
    }
  }

  return (
    <div>
      <h1>WebRTC Chat</h1>
      <div>
        {messages.map((message, index) => (
          <div
            key={index}
            style={
              {
                // backgroundColor: message.fromMe ? "lightblue" : "lightgray",
                // padding: "10px",
                // borderRadius: "5px",
                // marginBottom: "10px",
                // alignSelf: message.fromMe ? "flex-end" : "flex-start"
              }
            }
          >
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message here..."
          value={messageInput}
          onChange={(event) => setMessageInput(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default App
