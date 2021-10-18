import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../Actions/userAction";
function Home() {
    const [name, setName] = useState("lim")
    const dispatch = useDispatch();
    const click = () => {
        const i: any = dispatch(getUser);
        i.then((res: any) => {
            setName(res.payload.username)
        })
        console.log(name);
    }
    useEffect(() => {

    }, []);

    return (
        <>
            <div>
                hi {name}
            </div>
            <button onClick={click}>
                hi
            </button>
        </>
    )
}



export default Home