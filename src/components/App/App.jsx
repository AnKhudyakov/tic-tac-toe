import React from "react";
import { useState } from "react";
import GameRoom from "../GameRoom/GameRoom";

function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [info, setInfo] = useState("");
  const [messages, setMessages] = useState("");
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState(null);
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
        const message = JSON.parse(ev.data);
        if (message.event === "info") {
          setInfo(message.content);
          setConnected(false);
        } else {
          setMessages(message);
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