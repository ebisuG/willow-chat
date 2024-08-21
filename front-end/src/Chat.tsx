import { useState } from 'react';

interface message {
  from: string
  date: string
  message: string
  roomId: string
}

//response body is {"latestHistory": []}

const BACKEND_RECEIVE = import.meta.env.VITE_BACKEND_RECEIVE
const BACKEND_SEND = import.meta.env.VITE_BACKEND_SEND

export const Chat = () => {
  const [from, setFrom] = useState('');
  const [message, setMessage] = useState('');
  const [fetchedMessage, setFetchedMessage] = useState<message[]>();

  // useEffect(() => {
  //   receiveMessage()
  // }, []);

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
      const historyObj: { "latestHistory": message[] } = await fetched.json()
      if (historyObj.latestHistory.length !== 0) {
        setFetchedMessage(historyObj.latestHistory)
      }
    }
    console.log(fetchedMessage)
    fetchMessage()
  }

  // const canMapUse = (array: Array<any>) => { //eslint-disable-line @typescript-eslint/no-explicit-any
  //   if (array.length === 0) return false;
  //   return true;
  // }

  const showHistory = (history: message[] | undefined) => {
    if (!Array.isArray(history) || history === undefined) { return null } else {
      return (history.map((elem: message, index: number) => {
        console.log(elem, index)
        console.log(history)
        return (<>
          <div key={index}>
            {elem.date}
            {elem.from}
            {elem.message}
          </div>
        </>)
      })
      )
    }
  }
  return (
    <div>
      <h1>Chat Room</h1>
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
        {showHistory(fetchedMessage)}
        {/* {fetchedMessage?.from}<br></br>{fetchedMessage?.message} */}
      </div>
    </div>
  );
};

export default Chat;