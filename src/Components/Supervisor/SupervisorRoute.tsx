import { Route, Switch } from "react-router";
import Navbar from "../Navbar/Navbar";
import Test from "./Pages/Test"
import TestWebSocketProvider from "./Pages/TestWebSocketProvider";

export const SupervisorRouter = () => {
    return (
        <>
            <Navbar />
            <Test />
        </>
    )
}

export default SupervisorRouter;