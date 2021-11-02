import { Route, Switch } from "react-router";
import Navbar from "../Navbar/Navbar";
import Test from "./Pages/Test"

export const SupervisorRouter = () => {
    return (
        <>
            <Navbar />
            <Test />
        </>
    )
}

export default SupervisorRouter;