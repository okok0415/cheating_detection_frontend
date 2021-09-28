import React from "react";
import Signin from "./Signin";
import Signup from "./Signup";


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

export { SigninRouter, SignupRouter };