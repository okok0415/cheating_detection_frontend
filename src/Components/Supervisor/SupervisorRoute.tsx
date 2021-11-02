import { Route, Switch } from "react-router";
import Navbar from "../Navbar/Navbar";
import Test from "./Pages/Test"
import Screen from "./Pages/Screen";
export const SupervisorRouter = () => {
    return (
        <>
            <Navbar />
            <Test />
        </>
    )
}

export const SupervisorScreenRouter = () => {
    return (
        <>
            <Navbar />
            <Screen />
        </>
    )
}

