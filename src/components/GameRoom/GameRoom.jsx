import React, { useEffect, useState } from "react";
import Board from "../Board/Board";
import { Box, Button, Typography } from "@mui/material";
const GameRoom = ({
  socket,
  name,
  setConnected,
  canStart,
  setCanStart,
  setRestart,
  ...props
}) => {
  const handleExit = () => {
    socket.close(1000, `${name}`);
    setConnected(false);
    setRestart(true);
    setCanStart(false);
  };
  return (
    <main>
      <Box
        sx={{
          minWidth: "300px",
          zIndex: 1,
          color: "white",
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            width: "100%",
          }}
        >
          Your name:{name}
        </Typography>
        <Button onClick={handleExit} sx={{ bgcolor: "grey", color: "white" }}>
          Exit
        </Button>
      </Box>
      {canStart ? (
        <Board
          socket={socket}
          name={name}
          setCanStart={setCanStart}
          {...props}
          setRestart={setRestart}
        />
      ) : (
        <Typography
          sx={{
            zIndex: 1,
            color: "white",
            position: "relative",
            py: 4,
            textAlign: "center",
          }}
        >
          Please wait for your opponent...
        </Typography>
      )}
    </main>
  );
};

export default GameRoom;
