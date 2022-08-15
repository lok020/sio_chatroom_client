import React, { useEffect, useContext } from 'react';
import { Values } from '../../Chatroom';

import _ from 'lodash';

function Chatlog({socket}: any) {
  const { username, chatlog, setChatlog } = useContext(Values);
  let new_chatlog = _.cloneDeep(chatlog);

  // the whole point of this function is to check if the payload been pushed before to avoid double message show up on the chatlog
  const checkChatExistanceAndPush = (chatlog: any, payload: any) => {
    if (!_.includes(chatlog, payload) ){
      chatlog.push(payload);
      setChatlog((prevChatlog: any) => [...prevChatlog, payload]);
    }
  }

  useEffect(() => {
    socket.on("joined_room", (payload:any) => {
      checkChatExistanceAndPush(new_chatlog, payload);
    })
    
    socket.on("left_room", (payload:any) => {
      checkChatExistanceAndPush(new_chatlog, payload);
    })

    socket.on("receive_message", (payload:any) => {
      checkChatExistanceAndPush(new_chatlog, payload);
    })
  }, [socket])

  return (
    <div className='chatlog'>
      {chatlog.map((obj) => {
        if (obj.type === "joined" || obj.type === "left"){
          return <div key={obj.uuid} className="announcement">
          <div>{obj.message}</div>
        </div>
        }
        else if (obj.type === "message"){
        return <div key={obj.uuid} className="message">
          <div className={obj.username === username ? "my-message" : "other-message"}>
            <div>{obj.message}</div>
            <div>{obj.username}</div>
            <div>{obj.date_time}</div>
          </div>
        </div>
        }
      }
      )}
    </div>
  )
}

export default Chatlog
