import React, { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route, HashRouter, Outlet } from "react-router-dom";

import './Chatroom.scss';

import Login from './Login/Login';
import LoginSuccess from './LoginSuccess/LoginSuccess';
import Error from './Error/Error';

export type GlobalValues = {
  username: string;
  setUsername: (c: string) => void;
  room: string;
  setRoom: (c: string) => void;
  chatlog: any[];
  setChatlog: (c: any[] | any) => void;
  message: string;
  setMessage: (c: string) => void;
}

export const Values = createContext<GlobalValues>({
  username: "",
  setUsername: () => {},
  room: "",
  setRoom: () => {},
  chatlog: [],
  setChatlog: () => {},
  message: "",
  setMessage: () => {},
});

function Chatroom() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [chatlog, setChatlog] = useState([]);
  const [message, setMessage] = useState("");

  return (
    <Values.Provider value={{username, setUsername, room, setRoom, chatlog, setChatlog, message, setMessage}}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<Login />} />
            <Route path="Chatroom" element={<LoginSuccess />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Values.Provider>
  )
}

export default Chatroom
