import { useEffect } from "react"

function Result() {

    useEffect(() => {
        alert("준비중입니다.")
        window.location.href = "/";
    }, [])

    return (
        <>
            <div>

            </div>
        </>
    )

}


export default Result;