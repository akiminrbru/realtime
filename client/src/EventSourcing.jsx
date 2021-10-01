import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LongPulling() {

    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');

    useEffect(() => {
        subscribe();
    }, []);

    const subscribe = async () => {
        const evntSource = new EventSource('http://localhost:5000/connect');
        evntSource.onmessage = function (event) {
            const message = JSON.parse(event.data);
            setMessages(prev => [message, ...prev]);
        }
    }

    const sendMessage = async () => {
        await axios.post('http://localhost:5000/new-messages', {
            message: value,
            id: Date.now()
        });
    }

    return (
      <div className="center">
          <div>
              <div className="from">
                  <input value={value} onChange={e => setValue(e.target.value)} type="text" />
                  <button onClick={sendMessage}>Отправить</button>
              </div>
              <div className="messages">
                {messages.map(mess => 
                    <div className="message" key={mess.id}>
                        {mess.message}
                    </div>)}
              </div>
          </div>
      </div>
    )
}

export default LongPulling;