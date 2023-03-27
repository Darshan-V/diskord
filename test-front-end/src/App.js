import React, { useEffect, useRef } from "react"
import { Peer } from "peerjs"
import { io } from "socket.io-client"

function App() {
  const peerRef = useRef(null)
  const selfPeerIdRef = useRef(null)

  useEffect(() => {
    const peer = new Peer(undefined, {
      host: "localhost",
      port: 3000,
      path: "/api/peer"
    })

    peerRef.current = peer

    peer.on("open", (id) => {
      console.log("peerId", id)
      selfPeerIdRef.current = id
    })

    return () => {
      peer.disconnect()
    }
  }, [])

  useEffect(() => {}, [])

  function makeACall() {
    var conn = peerRef.current.connect("dest-peer-id")
  }

  return (
    <div>
      <button onClick={makeACall}>Call</button>
    </div>
  )
}

export default App
