import React from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import CheckItems from "./CheckItems"

function SigninRouter() {

    return (
        <>
            <Signin />
        </>
    )
}

function SignupRouter() {

    return (
        <>
            <Signup />
        </>
    )
}

function CheckItemsRouter() {
    return (
        <>
            <CheckItems />
        </>
    )
}
export { SigninRouter, SignupRouter, CheckItemsRouter };