import { Route, Switch } from "react-router-dom";
import WebSocketProvider from "./Train/TrainWebSocketProvider";
import HTML from "./websocket/HTML";
import Train from "./Train/Train";
import Navbar from "../Navbar/Navbar";
export const TestRouter = ({ match }: { match: any }) => {

    return (
        <>
            <WebSocketProvider>
                <Train />
            </WebSocketProvider>
        </>
    )
}

/*
            <WebSocketProvider>
                <Chatting />
                <TextInputBox />
            </WebSocketProvider>
*/

/*
            <Switch>
                <Route path={match.path + '/train'} component={Train2} />
                <Route path={match.path + '/test'} component={HTML} />
            </Switch>
*/