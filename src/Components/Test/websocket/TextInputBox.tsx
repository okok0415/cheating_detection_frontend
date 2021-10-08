import React, { useState, useContext } from 'react'
import { WebSocketContext } from './WebSocketProvider';


function TextInputBox() {
    const [message, setMessage] = useState<any>("");
    const ws = useContext(WebSocketContext);

    const handleChangeText = (e: any) => {
        setMessage(e.target.value);
    }

    const handleClickSubmit = () => {
        const jsonStr = JSON.stringify({
            'peer': "lim",
            'action': "new-peer2",
            'receiver_channel_name': 'lobby',
            'message': message
        })

        ws.current.send(jsonStr);
        setMessage("");
    }

    return (
        <div>
            <input type="text" value={message} onChange={handleChangeText}></input>
            <button type="button" onClick={handleClickSubmit}>Send!</button>
        </div>
    )
}

export default TextInputBox