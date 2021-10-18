import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../Actions/userAction";
function Home() {
    const [name, setName] = useState("")
    const dispatch = useDispatch();
    useEffect(() => {
        const i: any = dispatch(getUser);
        i.then((res: any) => {
            setName(res.payload.username)
        })
        console.log(name);
    }, []);

    return (
        <>
            <div>
                안녕하세요 {name}!
            </div>
        </>
    )
}



export default Home