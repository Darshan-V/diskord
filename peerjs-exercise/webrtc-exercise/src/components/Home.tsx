import React,{useEffect, useRef, useState} from 'react'
import { MediaConnection, Peer } from 'peerjs'
import {useForm} from '@mantine/form'

type Props = {}

const Home:React.FC<Props> = (_:Props) => {
  const ref= useRef

  const userVideo = ref<HTMLVideoElement|null>(null)
  const [inCall,setInCall] = useState<boolean>(false)
  const [call,setCall] = useState<MediaConnection>()
  const [peer,setPeer] = useState<Peer>()
  const callForm = useForm({
    initialValues: {
      userId: '',
    },
  });
  
  
  useEffect(() => {  
    const newPeer = new Peer();

    newPeer.on('open', () => setPeer(newPeer));
    newPeer.on('call', (call: MediaConnection) => {
      setCall(call);
      setInCall(true);
      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      }).then(stream => {
        call.answer(stream);
        call.on('stream', (userStream: MediaStream) => {
          if (userVideo.current) {
            userVideo.current.srcObject = userStream;
          }
        });

        call.on('error', () => {
          setInCall(false);
        });

        call.on('close', () => {
          setInCall(false);
        });
      });
    })
    return () => newPeer.destroy()
  },[])

  if(inCall){return (
    <>
      <video className='somevideclass' ref={userVideo} autoPlay />
      <button >
        <button
          onClick={() => {
            setInCall(false);
            call?.close();
          }}
         
        >
          <span>phone icon</span> 
        </button>
      </button>
    </>
  );}

  return (
      <div >
        {peer ? (
          <div>
            <p>{peer.id}</p>
            <form onSubmit={callForm.onSubmit(values => {
              setInCall(true);
              callForm.setValues({ userId: '' });
              navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
              }).then(stream => {
                const call = peer.call(values.userId, stream);
  
                setCall(call);
                call.on('stream', (userStream: MediaStream) => {
                  if (userVideo.current) {
                    userVideo.current.srcObject = userStream;
                  }
                });
  
                call.on('error', () => {
                  setInCall(false);
                });
  
                call.on('close', () => {
                  setInCall(false);
                });
              });
            })}>
              <input
                {...callForm.getInputProps('userId')}
                placeholder="User ID here"
              />
              <button
                type="submit"
              >
                Call
              </button>
            </form>
          </div>
        ) : (
          <div><span>Hi there</span></div>
        )}
      </div>
    );
  
}

export default Home