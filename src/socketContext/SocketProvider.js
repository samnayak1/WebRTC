/* import React,{createContext,useContext} from 'react'
//useMemo
//import {io} from 'socket.io-client'

const SocketContext=createContext(null)

export const useSocket=()=>{
    const socket=useContext(SocketContext)
    return socket
}

export const SocketProvider=(props)=>{
 //const socket=useMemo(()=>io('http://localhost:5001'),[])
 const socket='hi'

    return(
           <SocketContext.Provider value={socket}>

            {props.children}
           </SocketContext.Provider>

    )
} */