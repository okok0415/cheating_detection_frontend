import { Switch, Route } from "react-router-dom";
import TrainWebSocketProvider from "./Train/TrainWebSocketProvider";
import CalibrateWebSocketProvider from "./Calibrate/CalibrateWebSocketProvider";
import Train from "./Train/Train";
import TestNav from "./TestNav/TestNav";
import HTML from "./websocket/HTML";
import Navbar from "../Navbar/Navbar";
import calibrate from "./informationPage/calibrate";
import collect from "./informationPage/collect";
import test from "./informationPage/test";
import Calibrate from "./Calibrate/Calibrate";

export const TestRouter = ({ match }: { match: any }) => {

    return (
        <>
            <Navbar />
            <TestNav />
            <Switch>
                <Route path={match.path + '/calibrate'} component={calibrate} />
                <Route path={match.path + '/collect'} component={collect} />
                <Route path={match.path + '/test'} component={test} />
            </Switch>
        </>
    )
}

export const CalibrateRouter = () => {
    return (
        <>
            <Navbar />
            <TestNav />
            <CalibrateWebSocketProvider>
                <Calibrate />
            </CalibrateWebSocketProvider>
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

export const SupervisorRouter = () => {
    return (
        <>
            <Navbar />
            <HTML />
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