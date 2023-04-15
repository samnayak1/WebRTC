import React,{useState,useEffect,useCallback} from 'react'
//import { useSocket } from './socketContext/SocketProvider'
import { useNavigate } from 'react-router-dom'
function Lobby({socket}) {
  const navigate=useNavigate()
   const [email,setEmail]=useState('')
   const[room,setRoom]=useState('')
  // const socket=useSocket()
   const handleSubmit=async (e)=>{
    await socket.emit('join_room',{email:email,room:room})

    console.log(socket.id+' has been emitted with email '+email+' and room '+room) 
    navigate(`/room/${room}`) 
   
    }

 /*   const handleJoinRoom=(({email,room})=>{
    console.log(' join room receive has been fired')
   //console.log('email is '+email+' room is '+room)
  })  */
   
   useEffect(()=>{
    //Ssocket.on('join_room_receive',handleJoinRoom)
   },[])


  return (
    <div>Lobby

    <form onSubmit={handleSubmit}>
   <input type='text' id='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}placeholder='enter email'></input>
   <br/>
   <input type='text' id='room' value={room} onChange={(e)=>{setRoom(e.target.value)}} placeholder='enter room'></input>
  <button onClick={handleSubmit}>Join room</button>
 </form>

    </div>
  )
}

export default Lobby