import { Route, Switch } from "react-router-dom";
import HTML from "./websocket/HTML";
import Train from "./Train/Train";
import Navbar from "../Navbar/Navbar";
export const TestRouter = ({ match }: { match: any }) => {

    return (
        <>
            <Switch>
                <Route path={match.path + '/train'} component={Train} />
                <Route path={match.path + '/test'} component={HTML} />
            </Switch>
        </>
    )
}

/*
            <WebSocketProvider>
                <Chatting />
                <TextInputBox />
            </WebSocketProvider>
*/