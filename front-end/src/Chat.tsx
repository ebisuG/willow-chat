import { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter,  Button, Input } from '@chakra-ui/react'

interface message {
  from: string
  date: string
  message: string
  roomId: string
}

const BACKEND_RECEIVE = import.meta.env.VITE_BACKEND_RECEIVE
const BACKEND_SEND = import.meta.env.VITE_BACKEND_SEND

export const Chat = () => {
  const [from, setFrom] = useState('');
  const [message, setMessage] = useState('');
  const [fetchedMessage, setFetchedMessage] = useState<message[]>();

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
      const fetched = await fetch(BACKEND_RECEIVE + `?roomId=100`)
      const historyObj: { "latestHistory": string[] } = await fetched.json()
      if (historyObj.latestHistory.length !== 0) {
        setFetchedMessage(historyObj.latestHistory.map((elem) => JSON.parse(elem)))
      }
    }
    console.log(fetchedMessage)
    fetchMessage()
  }

  const showHistory = (history: message[] | undefined) => {
    if (!Array.isArray(history) || history === undefined) { return null } else {
      return (history.map((elem: message, index: number) => {
        console.log(elem, index)
        console.log(history)
        const dateObj = new Date(elem.date)
        const dateFormatted = `${dateObj.getFullYear()}-${dateObj.getDate()}-${dateObj.getDay()}`
        return (<>
          <div key={index}>
            <Card>
              <CardBody>
                {dateFormatted} :
                {elem.from}<br></br>
                {elem.message}
              </CardBody>
            </Card>
          </div>
        </>)
      })
      )
    }
  }
  return (
    <div>
      <Card align={"center"}>
        <CardBody>
          <CardHeader fontFamily={"Arial Narrow"} textAlign={"center"}>
            <h1>Chat Room</h1>
          </CardHeader>
          <div>
            {showHistory(fetchedMessage)}
          </div>
        </CardBody>
        <CardFooter>
          <div>
            <Input
              type="text"
              placeholder="From"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            >
            </Input>
            <Input
              type="text"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            >
            </Input>
            <Button m="10px" onClick={sendMessage}>Send</Button>
            <Button m="10px" onClick={receiveMessage}>Receive History</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Chat;