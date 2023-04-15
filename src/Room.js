import React, { useEffect,useCallback,useState } from 'react'
import ReactPlayer from 'react-player'
import peer from './Service/Peer'
function Room({socket}) {
 /*
 import { useNavigate } from 'react-router-dom'
 const navigate=useNavigate()
  const handleJoinedUser=useCallback(({email,room})=>{
    console.log(email,room)  
    navigate(`/room/${room}`)      
   },[]) */
   const[remoteId,setRemoteId]=useState(null)
   const[myStream,setMyStream]=useState()
   const[remoteStream,setRemoteStream]=useState()
   const handleRoomJoinedUser=({email,id})=>{
    console.log(`user ${email} id: ${id} has joined room babyyyy`)  
     setRemoteId(id)   
   }

  /*   const handleJoinRoom=(({email,room})=>{
    console.log('you have joined room'+room)
   console.log('email is '+email+' room is '+room)
  }) 
 */

  const handleCallUser=async ()=>{
    const stream=await navigator.mediaDevices.getUserMedia({audio:true,video:true})
    
    const offer=await peer.getOffer()  //creates an offer 
    console.log(offer) 
    await socket.emit('user call',{to:remoteId,offer})   //send your offer to caller
    setMyStream(stream)
  }


  const handleIncomingCall=async ({from,offer})=>{
    setRemoteId(from)
      const stream=await navigator.mediaDevices.getUserMedia({audio:true,video:true})
      setMyStream(stream)
      console.log('incoming call '+'from '+from+' offer '+offer)
      const ans=await peer.getAnswer(offer)
      //console.log('answer is  '+ans)
      socket.emit('call accepted',{to:from,ans})
  }
  const handleCallAccepted=async ({from,ans})=>{
       console.log('answer is '+ans)
        await peer.setlocalDescription(ans)
        console.log('call accepted')
        console.log('stream is '+ myStream)
        console.log('remote stream is '+remoteStream)
        sendStream()

  }

  const sendStream=()=>{
    for(const track of myStream.getTracks()){

      peer.peer.addTrack(track,myStream)
    }
  }

  const handleNegoNeeded=async (e)=>{              //send the negotiation. Create the offer and send to user
     const offer=await peer.getOffer()
     socket.emit('negotiation needed',{offer,to:remoteId})


  }
  const handleNegotiationIncoming=async({from,offer})=>{  //receive the negotiation.Take the offer send and create an answer
         const ans=await peer.getAnswer(offer)
         socket.emit('negotiation done',{to:from,ans})
  }

  const handleNegoFinal=async ({from,ans})=>{
        await peer.setlocalDescription(ans)

  }



  useEffect(() => {
  
    peer.peer.addEventListener('track',async (e)=>{
          const remotestream=e.streams
          setRemoteStream(remotestream[0])
    })

    peer.peer.addEventListener('negotiationneeded',handleNegoNeeded)
  
    return () => {
    // peer.peer.removeEventListener('track')
    // peer.peer.removeEventListener('negotiationneeded',handleNegoNeeded)
    }
  }, [])
  

    useEffect(()=>{
      // socket.on('join_room_receive',handleJoinRoom) //does not work because the socket at server emits before user navigates to this page
      socket.on('room_joined',handleRoomJoinedUser)
      socket.on('incoming call',handleIncomingCall)
      socket.on('call accepted',handleCallAccepted)
      socket.on('negotiation incoming',handleNegotiationIncoming)
      socket.on('negotiation final',handleNegoFinal)
      return(()=>{
      socket.off('room_joined')
      socket.off('join_room_receive')
      socket.off('incoming call') 
      socket.off('call accepted')
      socket.off('negotiation final')
      })
    },[])


  return (



    <div>

           <h3>{remoteId?'connected':'no one in room '}</h3>
           {/* {myStream&&<button onClick={sendStream}>send Stream</button>} */}
           {remoteId?<button onClick={handleCallUser}>Call</button>:null}
           <h2>my stream</h2>
           {myStream&&<ReactPlayer playing height='300px' width='300px' url={myStream}/>}
           <h2>remote stream</h2>
           {remoteStream&&<ReactPlayer playing height='300px' width='300px' url={remoteStream}/>}

    </div>
  )
}

export default Room