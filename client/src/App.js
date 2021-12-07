import "./App.css";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { TextField, Button, Typography } from "@mui/material";

const endpoint = "http://localhost:5000";
const socket = io(endpoint);

function App() {
  const [messages, setMessages] = useState(["Start!"]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getMessages();
  }, [messages.length]);

  const getMessages = () => {
    socket.on("message", (msg) => {
      setMessages([...messages, msg]);
    });
  };

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const onClick = () => {
    if (message !== "") {
      socket.emit("message", message);
      setMessage("");
    } else {
      alert("Please add a message!");
    }
  };

  return (
    <div className='App' style={{ marginTop: 20 }}>
      {messages.length > 0 &&
        messages.map((msg) => (
          <div>
            <Typography variant='h6'>{msg}</Typography>
          </div>
        ))}
      <TextField
        id='standard-textarea'
        value={message}
        name='message'
        onChange={(e) => onChange(e)}
        label='Enter your Message!'
        placeholder='Placeholder'
        multiline
        variant='standard'
        style={{ marginTop: "200px", marginBottom: "20px" }}
      />
      <div>
        <Button variant='contained' onClick={onClick}>
          Send
        </Button>
      </div>
    </div>
  );
}

export default App;
