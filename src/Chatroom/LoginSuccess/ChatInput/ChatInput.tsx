import React, {useContext} from 'react';
import { Values } from '../../Chatroom';

import moment from 'moment';
import {v4 as uuidv4} from 'uuid';

function ChatInput({socket}: any) {
  const { username, message, setMessage, room, setChatlog } = useContext(Values);

  const handleMessage = (e: { target: { value: string; }; }) => {
    setMessage(e.target.value);
  }

  const handleSendButton = () => {
    let payload = {
      uuid: uuidv4(),
      type: "message",
      username: username,
      message: message,
      date_time: moment().format('MMMM Do YYYY, h:mm:ss a'),
      room: room
    }
    setChatlog((prevChatlog: any) => [...prevChatlog, payload]);
    socket.emit("send_message", payload );
    setMessage("");
  }

  return (
    <div className='chat-input'>
      <input className='input' value={message} onChange={handleMessage}/>
      <button className='send-btn' onClick={handleSendButton}>&#9655;</button>
    </div>
  )
}

export default ChatInput
