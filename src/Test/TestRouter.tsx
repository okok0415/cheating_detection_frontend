import React from "react"
import Test from "./Test"
import WebSocketProvider from "./websocket/WebSocketProvider";
import Chatting from "./websocket/Chatting";
import TextInputBox from "./websocket/TextInputBox";
import Video from "./websocket/Video";

export const TestRouter = () => {
    return (
        <>
            <WebSocketProvider>
                <Video />
                <Chatting />
                <TextInputBox />
            </WebSocketProvider>
        </>
    )
}