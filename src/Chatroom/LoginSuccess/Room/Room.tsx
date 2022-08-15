import React, {useContext} from 'react';
import { Values } from '../../Chatroom';
import { Link } from "react-router-dom";

import moment from 'moment';
import _ from 'lodash';
import {v4 as uuidv4} from 'uuid';

function Room({socket}: any) {
  const { username, room, setRoom } = useContext(Values);

  //const handleChangeRoom = (e:React.ChangeEvent<HTMLInputElement>): void => {
  const handleChangeRoom = (e: any) => {
    let new_room = _.cloneDeep(e.target.innerHTML);

    if(room !== ""){
      leaveRoom();
    }
    setRoom(new_room);
    socket.emit("join_room", {
      uuid: uuidv4(),
      type: "joined",
      username: username,
      message: `${username} Joined the ${new_room}, HELLO!!`,
      date_time: moment().format('MMMM Do YYYY, h:mm:ss a'),
      room: new_room
    });
  }

  const leaveRoom = () => {
    let cur_room = _.cloneDeep(room);
    socket.emit("leave_room", {
      uuid: uuidv4(),
      type: "left",
      username: username,
      message: `${username} left the ${cur_room}, GOODBYE!!`,
      date_time: moment().format('MMMM Do YYYY, h:mm:ss a'),
      room: cur_room
    });
  }

  const handleLogout = () => {
    leaveRoom();
    setRoom("");
  }

  return (
    <div className='room'>
      <label className='room-header'>{"Available Room"}</label>
      <button className={room === "ROOM-1" ? 'room-selected' : 'room-default'} onClick={handleChangeRoom}>ROOM-1</button>
      <button className={room === "ROOM-2" ? 'room-selected' : 'room-default'} onClick={handleChangeRoom}>ROOM-2</button>
      <button className={room === "ROOM-3" ? 'room-selected' : 'room-default'} onClick={handleChangeRoom}>ROOM-3</button>
      <button className={room === "ROOM-4" ? 'room-selected' : 'room-default'} onClick={handleChangeRoom}>ROOM-4</button>
      <Link to="/" id="login" className="logout-btn" onClick={handleLogout}>{"Logout"}</Link>
    </div>
  )
}

export default Room
