import React, { useEffect, useState } from "react";
import Board from "../Board/Board";

const GameRoom = ({ socket, name, setConnected, ...props }) => {
  const handleExit = () => {
    socket.close();
    setConnected(false);
  };
  return (
    <main>
      <div className="d-flex justify-content-between p-3">
        Your name:{name}
        <button className="btn btn-primary" onClick={handleExit}>
          Exit
        </button>
      </div>
      <Board socket={socket} name={name} {...props} />
    </main>
  );
};

export default GameRoom;
