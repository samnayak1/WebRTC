
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Lobby from './Lobby';
import Room from './Room';
//import { SocketProvider } from './socketContext/SocketProvider';
import {io} from 'socket.io-client'

function App() {

  // <SocketProvider>    </SocketProvider>
  
  const socket=io.connect('http://localhost:5002');

 
  return (
    <div className="App">
        
    <BrowserRouter>
   
      <Routes>
       <Route path='/' element={<Lobby socket={socket}/>} />
       <Route path='/room/:roomId' element={<Room socket={socket}/>} /> 
      
      </Routes>
   
    
    </BrowserRouter>
   
    </div>
  );
}

export default App;
