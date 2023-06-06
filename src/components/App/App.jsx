import React from "react";
import { useState } from "react";
import GameRoom from "../GameRoom/GameRoom";

function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [info, setInfo] = useState("");
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState("");
  const [connected, setConnected] = useState(false);
  const [restart, setRestart] = useState(false);
  const [canStart, setCanStart] = useState(false);
  const handleConnect = () => {
    setInfo("");
    if (name.length) {
      const socket = new WebSocket(import.meta.env.VITE_API_WS);
      setSocket(socket);
      socket.onopen = () => {
        setConnected(true);
        const message = {
          event: "connection",
          name,
          room,
          id: Date.now(),
        };
        socket.send(JSON.stringify(message));
      };
      socket.onmessage = (ev) => {
       // console.log("event");
        const msg = JSON.parse(ev.data);
        switch (msg.event) {
          case "message":
            setMessages(msg);
            break;
          case "info":
            setInfo(msg.content);
            setConnected(false);
            break;
          case "canStart":
            setCanStart(true);
            break;
          case "opponentLeave":
            setCanStart(false);
            setRestart(true)
            break;
        }
      };
      socket.onclose = () => {
        //alert("Connection closed");
        setConnected(false);
      };
      socket.onerror = () => {
        alert("Connection died");
      };
    } else {
      alert("Please enter name");
    }
  };
 // console.log("MSG", messages);
  return (
    <div className="container mx-auto d-flex items-center justify-content-center flex-col">
      {connected ? (
        <GameRoom
          messages={messages}
          name={name}
          room={room}
          socket={socket}
          setConnected={setConnected}
          setMessages={setMessages}
          canStart={canStart}
          setCanStart={setCanStart}
          restart={restart}
          setRestart={setRestart}
        />
      ) : (
        <div className=" my-4 flex items-center">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="bg-white border shadow-sm px-3 py-2 mx-2"
            placeholder="Your username"
          />
          <input
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            type="number"
            className="bg-white border shadow-sm px-3 py-2 mx-2"
            placeholder="Choose room"
          />
          <button onClick={handleConnect} className="btn btn-primary">
            Enter
          </button>
        </div>
      )}
      {info && <div>{info}</div>}
    </div>
  );
}

export default App;
