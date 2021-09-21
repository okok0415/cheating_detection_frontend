import React, { useContext, useState } from 'react'
import { WebSocketContext } from './WebSocketProvider';

function Chatting() {
    const ws = useContext(WebSocketContext);
    const [items, setItems] = useState<string[]>([]);

    const addItem = (item: string) => {
        setItems([
            ...items,
            item
        ]);
    };

    ws.current.onmessage = (evt: MessageEvent) => {
        const data = JSON.parse(evt.data)
        addItem(data.message);
    };

    return (
        <ul>
            {
                items.map((message) => {
                    return (
                        <li>{message}</li>
                    )
                })
            }
        </ul>
    )
}

export default Chatting