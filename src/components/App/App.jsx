import React from "react";
import { useState } from "react";
import GameRoom from "../GameRoom/GameRoom";
import Form from "../ui-kit/form/Form";
import { Box, CardMedia } from "@mui/material";
import bg from "../../assets/video/bg.mp4";
import bgSecond from "../../assets/video/bg-second.mp4";
import {CustomSwitcher} from "../ui-kit/switcher/CustomSwitcher"

function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [info, setInfo] = useState("");
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState("");
  const [connected, setConnected] = useState(false);
  const [restart, setRestart] = useState(false);
  const [canStart, setCanStart] = useState(false);
  const [toggleTheme, setToggleTheme] = useState(true);
  // console.log("MSG", messages);
  const label = { inputProps: { "aria-label": "Color switch demo" } };
  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minWidth: "100%",
        minHeight: "100vh",
      }}
    >
      <CustomSwitcher
        {...label}
        color="default"
        sx={{ zIndex: 1, position: "absolute", bottom: "5%" }}
        checked={toggleTheme}
        onChange={() => setToggleTheme(!toggleTheme)}
      />
      <CardMedia
        sx={{
          display: "block",
          position: "absolute",
          top: 0,
          bottom: 0,
          objectPosition: "center",
          objectFit: "cover",
          width: "100%",
          height: "100%",
          border: "none",
        }}
        component="video"
        src={toggleTheme ? bg : bgSecond}
        autoPlay={true}
        muted={true}
        height="100%"
        loop={!toggleTheme}
      />
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
        <Form
          setSocket={setSocket}
          name={name}
          room={room}
          setRoom={setRoom}
          setName={setName}
          setInfo={setInfo}
          setConnected={setConnected}
          setMessages={setMessages}
          setCanStart={setCanStart}
          setRestart={setRestart}
          toggleTheme={toggleTheme}
        />
      )}
      {info && <div>{info}</div>}
    </Box>
  );
}

export default App;
