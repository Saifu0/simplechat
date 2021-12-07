import "./App.css";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

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
    if (message != "") {
      socket.emit("message", message);
      setMessage("");
    } else {
      alert("Please add a message!");
    }
  };

  return (
    <div className='App'>
      {messages.length > 0 &&
        messages.map((msg) => (
          <div>
            <p>{msg}</p>
          </div>
        ))}
      <input value={message} name='message' onChange={(e) => onChange(e)} />
      <button onClick={() => onClick()}>Send Message</button>
    </div>
  );
}

export default App;
