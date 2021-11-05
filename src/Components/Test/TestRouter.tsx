import { Switch, Route } from "react-router-dom";
import Train from "./Train/Train";
import TestNav from "./TestNav/TestNav";
import HTML from "./websocket/HTML";
import Navbar from "../Navbar/Navbar";
import authentication from "./informationPage/authentication";
import collect from "./informationPage/collect";
import screensharing from "./informationPage/screensharing";
import Authentication from "./Authentication/Authentication";
import Test from "./Student/Test";
import Screen from "./Student/Screen";
import Calibrate from "./Calibrate/Calibrate";
import CalibrateWebSocketProvider from "./Calibrate/CalibrateWebSocketProvider";
import calibrate from "./informationPage/calibrate";
//
export const TestRouter = ({ match }: { match: any }) => {

    return (
        <>
            <Navbar />
            <TestNav />
            <Switch>
                <Route path={match.path + '/authentication'} component={authentication} />
                <Route path={match.path + '/calibrate'} component={calibrate} />
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
            <Authentication />

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

            <Train />
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

export const StudentScreenRouter = () => {
    return (
        <>
            <Navbar />
            <Screen />
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