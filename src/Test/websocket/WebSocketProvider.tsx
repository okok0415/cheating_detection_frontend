import React, { useRef } from 'react';

const WebSocketContext = React.createContext<any>(null);
export { WebSocketContext };
const API_PATH = 'ws://localhost:8000/ws/chat/lobby/'
export default ({ children }: { children: React.ReactNode }) => {
    const webSocketURL = API_PATH
    let ws = useRef<WebSocket | null>(null);

    if (!ws.current) {
        ws.current = new WebSocket(webSocketURL);
        ws.current.onopen = () => {
            console.log("connected to " + webSocketURL);
        };
        ws.current.onclose = error => {
            console.log("disconnect from " + webSocketURL);
            console.log(error)
        };
        ws.current.onerror = error => {
            console.log("connection error " + webSocketURL);
            console.log(error);
        };
    }

    return (
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    )
}