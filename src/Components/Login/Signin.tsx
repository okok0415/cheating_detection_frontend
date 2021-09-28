import { useState } from "react";
function Signin() {


    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const onEmailHandler = (e: any) => {
        setEmail(e.currentTarget.value);
    };
    const onPasswordHanlder = (e: any) => {
        setPassword(e.currentTarget.value);
    };

    const onSubmitHandler = (e: any) => {
        e.preventDefault();
        console.log(Email, Password);
    };

    return (
        <div>
            <form
                onSubmit={onSubmitHandler}
                style={{ display: "flex", flexDirection: "column" }}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHanlder} />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Signin;
