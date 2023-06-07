import React, { useEffect, useMemo, useState } from "react";
import Cell from "../Cell/Cell";
import { checkWin, checkTie, cells } from "../helpers/gameLogic";
import { Box, Button, Typography } from "@mui/material";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas, useLoader } from "@react-three/fiber";
import positions from "../helpers/positions";

const Board = ({
  messages,
  name,
  room,
  socket,
  setMessages,
  setCanStart,
  restart,
  setRestart,
}) => {
  const [board, setBoard] = useState(cells);
  const [player, setPlayer] = useState("X");
  const [canPlay, setCanPlay] = useState(true);
  const [end, setEnd] = useState("");
  const handleCellClick = (e) => {
    const id = e.eventObject.coord;
    if (board[id] == "" && canPlay) {
      setBoard((prev) => ({ ...prev, [id]: player }));
      const message = {
        event: "message",
        room,
        name,
        id,
        type: player,
      };
      socket.send(JSON.stringify(message));
      setCanPlay(false);
    }
  };

  useEffect(() => {
    const newMove = messages.id;
    if (messages.type === "X") {
      setPlayer("O");
    }
    console.log(messages.id);
    messages.id
      ? setBoard((prev) => ({ ...prev, [newMove]: messages.type }))
      : null;
    setCanPlay(true);
  }, [messages]);

  useEffect(() => {
    const winner = checkWin(board);
    const tie = checkTie(board);
    if (winner || tie) {
      setCanPlay(false);
      setEnd(winner ? winner : tie);
      setMessages("");
    }
  }, [board]);

  useEffect(() => {
    if (restart) {
      setBoard(cells);
      setMessages("");
      setCanPlay(true);
    }
  }, [restart]);

  console.log("RESTART",restart);
  console.log("SET BOARD", board);

  const boardModel = useLoader(GLTFLoader, "./models/board.glb");
  const plusModel = useLoader(GLTFLoader, "./models/plus.glb");
  const nullModel = useLoader(GLTFLoader, "./models/null.glb");
  const emptyModel = useLoader(GLTFLoader, "./models/empty.glb");
  return (
    <section className="main-section">
      <Typography className="text-center">New game</Typography>
      {!end ? (
        <Box sx={{ width: "80vw", height: "80vh" }}>
          <Canvas
            camera={{ position: [0, 1, 0.3], rotation: [-Math.PI / 2.3, 0, 0] }}
            shadows
          >
            <directionalLight position={[1.5, 1.5, 1.5]} castShadow />
            <primitive
              object={boardModel.scene}
              position={[0, 0, 0]}
              children-0-castShadow
            />
            {positions.map((position, i) => (
              <Cell
                key={position}
                board={board}
                emptyModel={emptyModel}
                nullModel={nullModel}
                plusModel={plusModel}
                position={position}
                coord={`${i}`}
                handleCellClick={handleCellClick}
              />
            ))}
            {/* <OrbitControls target={[1, 1, 1]} />
            <axesHelper args={[1]} />*/}
            {/* <Stats /> */}
          </Canvas>

          {/* <Box sx={{display:"flex"}}> 
            <Cell handleCellClick={handleCellClick} id={"0"} text={board[0]} />
            <Cell handleCellClick={handleCellClick} id={"1"} text={board[1]} />
            <Cell handleCellClick={handleCellClick} id={"2"} text={board[2]} />
          </Box>
          <Box sx={{display:"flex"}}>
            <Cell handleCellClick={handleCellClick} id={"3"} text={board[3]} />
            <Cell handleCellClick={handleCellClick} id={"4"} text={board[4]} />
            <Cell handleCellClick={handleCellClick} id={"5"} text={board[5]} />
          </Box>
          <Box sx={{display:"flex"}}>
            <Cell handleCellClick={handleCellClick} id={"6"} text={board[6]} />
            <Cell handleCellClick={handleCellClick} id={"7"} text={board[7]} />
            <Cell handleCellClick={handleCellClick} id={"8"} text={board[8]} />
          </Box> */}
        </Box>
      ) : (
        <Box>
          <Box sx={{zIndex: 1,
          color: "white",
          position: "relative", }}>
            Game over! <br /> {end.winner ? `Winner:${end.winner}` : "Tie!"}
          </Box>
          <Button
            sx={{ bgcolor: "grey", color: "white" }}
            onClick={() => {
              setRestart(restart+1);
              setEnd("");
            }}
          >
            New Game
          </Button>
        </Box>
      )}
    </section>
  );
};

export default Board;
