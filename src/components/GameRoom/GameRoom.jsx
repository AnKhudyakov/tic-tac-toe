import React, { useEffect, useState } from "react";
import Board from "../Board/Board";

const GameRoom = ({
  socket,
  name,
  setConnected,
  canStart,
  setRestart,
  ...props
}) => {
  const handleExit = () => {
    socket.close(1000, `${name}`);
    setConnected(false);
    setRestart(true);
  };
  return (
    <main>
      <div className="d-flex justify-content-between p-3" style={{minWidth:"300px"}}>
        <div> Your name:{name}</div>
        <button className="btn btn-primary" onClick={handleExit}>
          Exit
        </button>
      </div>
      {canStart ? (
        <Board socket={socket} name={name} {...props} />
      ) : (
        <div>Please wait for your opponent...</div>
      )}
    </main>
  );
};

export default GameRoom;
