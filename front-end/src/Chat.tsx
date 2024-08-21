import { useState, useEffect } from 'react';

interface message {
  from: string
  date: string
  message: string
  roomId: string
}

const BACKEND_ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT
const BACKEND_RECEIVE = import.meta.env.VITE_BACKEND_RECEIVE
const BACKEND_SEND = import.meta.env.VITE_BACKEND_SEND

export const Chat = () => {
  const [from, setFrom] = useState('');
  const [message, setMessage] = useState('');
  const [fetchedMessage, setFetchedMessage] = useState<message>();
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
    async function fetchMessage() {
      const fetched = await fetch(BACKEND_SEND, {
        method: "POST",
        body: JSON.stringify({ from: from, message: message, date: new Date().toISOString(), roomId: "100" })
      })
      console.log(fetched)
    }
    fetchMessage()
  };

  const receiveMessage = () => {
    async function fetchMessage() {
      const fetched = await fetch(BACKEND_RECEIVE)
      const jsoned: message = await fetched.json()
      if (jsoned !== undefined) {
        setFetchedMessage(jsoned)
      }
    }
    console.log(fetchedMessage)
    fetchMessage()
  }

  return (
    <div>
      <h1>Chat Room</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.from}</strong>: {msg.message}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
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
        <button onClick={receiveMessage}>Get from go api</button><br></br>
        {fetchedMessage?.from}<br></br>{fetchedMessage?.message}
      </div>
    </div>
  );
};

export default Chat;