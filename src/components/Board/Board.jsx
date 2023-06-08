import React, { useEffect, useMemo, useState } from "react";
import Cell from "../Cell/Cell";
import { checkWin, checkTie, cells } from "../helpers/gameLogic";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas, useLoader } from "@react-three/fiber";
import positions from "../helpers/positions";

const Board = ({
  messages,
  name,
  room,
  socket,
  setMessages,
  restart,
  setRestart,
  toggleTheme,
}) => {
  const [board, setBoard] = useState(cells);
  const [player, setPlayer] = useState("X");
  const [canPlay, setCanPlay] = useState(true);
  const [end, setEnd] = useState("");
  const isNonMobile = useMediaQuery("(min-width:540px)");

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

  const boardThemeSecord = useLoader(GLTFLoader, "./models/board_second.glb");
  const boardThemeFirst = useLoader(GLTFLoader, "./models/board_first.glb");
  const plusModel = useLoader(GLTFLoader, "./models/plus.glb");
  const nullModel = useLoader(GLTFLoader, "./models/null.glb");
  const emptyFirst = useLoader(GLTFLoader, "./models/empty_first.glb");
  const emptySecond = useLoader(GLTFLoader, "./models/empty_second.glb");

  return (
    <section className="main-section">
      <Typography className="text-center">New game</Typography>
      {!end ? (
        <Box
          sx={{ width: "80vw", height: "80vw", maxHeight: "80vh" }}
          margin={"0 auto"}
          marginTop={isNonMobile?"0":"15vmin"}
        >
          <Canvas
            camera={{ position: [0, 1, 0.5], rotation: [-Math.PI / 2.5, 0, 0] }}
            shadows
          >
            <ambientLight intensity={1} />
            <directionalLight
              intensity={0.4}
              position={[0, 5, -5]}
              castShadow
            />
            <primitive
              object={
                toggleTheme ? boardThemeSecord.scene : boardThemeFirst.scene
              }
              position={[0, 0, 0]}
              children-0-castShadow
            />
            {positions.map((position, i) => (
              <Cell
                key={position}
                board={board}
                emptySecond={emptySecond}
                emptyFirst={emptyFirst}
                modelEmpty={
                  toggleTheme
                    ? emptySecond.scene.clone(true)
                    : emptyFirst.scene.clone(true)
                }
                nullModel={nullModel}
                plusModel={plusModel}
                position={position}
                coord={`${i}`}
                handleCellClick={handleCellClick}
                toggleTheme={toggleTheme}
              />
            ))}
          </Canvas>
        </Box>
      ) : (
        <Box
          sx={{
            zIndex: 1,
            color: "white",
            position: "relative",
            textAlign: "center",
            mt: "20%",
          }}
        >
          <Typography sx={{ zIndex: 1, color: "white" }}>
            Game over! <br /> {end.winner ? `Winner: ${end.winner}` : "Tie!"}
          </Typography>
          <Button
            sx={{ bgcolor: "grey", color: "white", mt: "20px" }}
            onClick={() => {
              setRestart(restart + 1);
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
