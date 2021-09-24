
import WebSocketProvider from "./websocket/WebSocketProvider";
import Chatting from "./websocket/Chatting";
import TextInputBox from "./websocket/TextInputBox";

export const TestRouter = () => {
    return (
        <>
            <WebSocketProvider>
                <Chatting />
                <TextInputBox />
            </WebSocketProvider>
        </>
    )
}