import { useState, useEffect } from 'react';

interface message {
  username: string
  message: string
}

const BACKEND_ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT
const BACKEND_RECEIVE = import.meta.env.VITE_BACKEND_RECEIVE

export const Chat = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [fetchedMessage, setFetchedMessage] = useState<message>({ username: "", message: "" });
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

  const receiveMessage = () => {
    async function fetchMessage() {
      const fetched = await fetch(BACKEND_RECEIVE)
      const jsoned: message = await fetched.json()
      if (jsoned !== undefined) {
        setFetchedMessage(jsoned)
      }
    }
    fetchMessage()
  }

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
      <div>
        <button onClick={receiveMessage}>{fetchedMessage.username}<br></br>{fetchedMessage.message}</button>
      </div>
    </div>
  );
};

export default Chat;