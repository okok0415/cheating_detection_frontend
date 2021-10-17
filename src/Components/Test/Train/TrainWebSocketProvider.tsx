import React, { useRef, useContext } from 'react';
const WebSocketContext = React.createContext<any>(null);
export { WebSocketContext };
const API_PATH = 'ws://localhost:8000/ws/train/'
export default ({ children }: { children: React.ReactNode }) => {
    const webSocketURL = API_PATH
    let ws = useRef<WebSocket | any>(null);
    let count = 0;
    if (!ws.current && count === 0) {
        ws.current = new WebSocket(webSocketURL);
        count += 1
        ws.current.onopen = () => {
            console.log("connected to " + webSocketURL);
        };
        ws.current.onclose = (error: string) => {
            console.log("disconnect from " + webSocketURL);
            console.log(error)
        };
        ws.current.onerror = (error: string) => {
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
