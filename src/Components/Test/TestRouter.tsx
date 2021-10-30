import { Switch, Route } from "react-router-dom";
import TrainWebSocketProvider from "./Train/TrainWebSocketProvider";
import AuthenticationWebSocketProvider from "./Authentication/AuthenticationWebSocketProvider";
import Train from "./Train/Train";
import TestNav from "./TestNav/TestNav";
import HTML from "./websocket/HTML";
import Navbar from "../Navbar/Navbar";
import authentication from "./informationPage/authentication";
import collect from "./informationPage/collect";
import screensharing from "./informationPage/screensharing";
import Authentication from "./Authentication/Authentication";
import Test from "./Student/Test";

export const TestRouter = ({ match }: { match: any }) => {

    return (
        <>
            <Navbar />
            <TestNav />
            <Switch>
                <Route path={match.path + '/authentication'} component={authentication} />
                <Route path={match.path + '/collect'} component={collect} />
                <Route path={match.path + '/screensharing'} component={screensharing} />
            </Switch>
        </>
    )
}

export const AuthenticationRouter = () => {
    return (
        <>
            <Navbar />
            <TestNav />
            <AuthenticationWebSocketProvider>
                <Authentication />
            </AuthenticationWebSocketProvider>
        </>
    )
}


export const TrainRouter = () => {
    return (
        <>
            <TrainWebSocketProvider>
                <Train />
            </TrainWebSocketProvider>
        </>
    )
}

export const StudentRouter = () => {
    return (
        <>
            <Navbar />
            <Test />
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