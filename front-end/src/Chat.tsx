import  { useState, useEffect } from 'react';

interface message {
    username : string
    message : string
}

const BACKEND_ENDPOINT=import.meta.env.VITE_BACKEND_ENDPOINT

export const Chat = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<message[]>([]);

  useEffect(() => {
    const ws = new WebSocket(BACKEND_ENDPOINT);

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setMessages((messages) => [...messages, msg]);
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    const ws = new WebSocket(BACKEND_ENDPOINT);
    const msg = {
      username: username,
      message: message,
    };
    ws.onopen = () => {
      ws.send(JSON.stringify(msg));
    };
    setMessage('');
  };

  return (
    <div>
      <h1>Chat Room</h1>
        <div>
          {messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.username}</strong>: {msg.message}
            </div>
          ))}
        </div>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;