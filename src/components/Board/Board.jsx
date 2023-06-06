import React, { useEffect, useState } from "react";
import Cell from "../Cell/Cell";
import { checkWin, checkTie, cells } from "../helpers/gameLogic";

const Board = ({
  messages,
  name,
  room,
  socket,
  setMessages,
  setCanStart,
  restart,
}) => {
  const [board, setBoard] = useState(cells);
  const [player, setPlayer] = useState("X");
  const [canPlay, setCanPlay] = useState(true);
  const [end, setEnd] = useState("");
  const handleCellClick = (e) => {
    const id = e.currentTarget.id;
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
    console.log("MSG GOT");
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
      //setCanStart(false);
    }
  }, [board]);

  useEffect(() => {
    if (restart) {
      setBoard(cells);
      setMessages("");
      setCanPlay(true);
    }
  }, [restart]);

  return (
    <section className="main-section">
      <h2 className="text-center">New game</h2>
      {!end ? (
        <div>
          <div className="d-flex">
            <Cell handleCellClick={handleCellClick} id={"0"} text={board[0]} />
            <Cell handleCellClick={handleCellClick} id={"1"} text={board[1]} />
            <Cell handleCellClick={handleCellClick} id={"2"} text={board[2]} />
          </div>
          <div className="d-flex">
            <Cell handleCellClick={handleCellClick} id={"3"} text={board[3]} />
            <Cell handleCellClick={handleCellClick} id={"4"} text={board[4]} />
            <Cell handleCellClick={handleCellClick} id={"5"} text={board[5]} />
          </div>
          <div className="d-flex">
            <Cell handleCellClick={handleCellClick} id={"6"} text={board[6]} />
            <Cell handleCellClick={handleCellClick} id={"7"} text={board[7]} />
            <Cell handleCellClick={handleCellClick} id={"8"} text={board[8]} />
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div> Game over! <br /> {end.winner ? `Winner:${end.winner}` : "Tie!"}{" "}</div>
          <button className="btn btn-primary">Restart</button>
        </div>
      )}
    </section>
  );
};

export default Board;
