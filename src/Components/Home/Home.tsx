import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../Actions/userAction";
function Home(){
    const [username, setUsername] = useState<string>("");
    const dispatch = useDispatch();
    
    useEffect(() => {
        (
            async () =>{
            await fetch("http://127.0.0.1:8000/user/user", {
            method: 'GET',
            credentials: 'include',
            }).then(res => console.log(res))
        })();
    }, []);

    fetch("http://127.0.0.1:8000/user/user", {
                method: 'GET',
                credentials: 'include',
                })
    return (
        <>
        <div>
            hi
        </div>
        </>
    )
}



export default Home