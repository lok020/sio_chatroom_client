import React, { useContext } from 'react';
import Room from './Room/Room';
import Chatlog from './ChatLog/Chatlog';
import ChatInput from './ChatInput/ChatInput';

import io from 'socket.io-client';

const socket = io("http://localhost:3001");

function LoginSuccess() {

  return (
    <div className='chatbox'>
      <div className='chatbox-area'>
        <div className='upper-area'>
          <Room socket={socket}/>
          <Chatlog socket={socket}/>
        </div>
        <div className='lower-area'>
          <ChatInput socket={socket}/>
        </div>
      </div>
    </div>
  )
}

export default LoginSuccess
