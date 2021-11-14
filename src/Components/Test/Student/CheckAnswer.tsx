const answer = [
    {
        name: "1",
        style: "gack"
    },
    {
        name: "2",
        style: "gack"
    },
    {
        name: "3",
        style: "gack"
    },
    {
        name: "4",
        style: "gack"
    },
    {
        name: "5",
        style: "gack"
    },
    {
        name: "6",
        style: "gack"
    },
    {
        name: "7",
        style: "gack"
    },
    {
        name: "8",
        style: "gack"
    },
    {
        name: "9",
        style: "gack"
    },
    {
        name: "10",
        style: "gack"
    },
    {
        name: "11",
        style: "gack"
    },
    {
        name: "12",
        style: "gack"
    },
    {
        name: "13",
        style: "gack"
    },
    {
        name: "14",
        style: "gack"
    },
    {
        name: "15",
        style: "gack"
    },
    {
        name: "16",
        style: "gack"
    },
    {
        name: "17",
        style: "gack"
    },
    {
        name: "18",
        style: "gack"
    },
    {
        name: "19",
        style: "gack"
    },
    {
        name: "20",
        style: "gack"
    },
    {
        name: "21",
        style: "gack"
    },
    {
        name: "22",
        style: "ju"
    },
    {
        name: "23",
        style: "ju"
    },
    {
        name: "24",
        style: "ju"
    },
    {
        name: "25",
        style: "ju"
    },
    {
        name: "26",
        style: "ju"
    },
    {
        name: "27",
        style: "ju"
    },
    {
        name: "28",
        style: "ju"
    },
    {
        name: "29",
        style: "ju"
    },
    {
        name: "30",
        style: "ju"
    },

]

export const CheckAnswer = () => {


    return (
        <>

            {answer.map((data) => {
                if (data.style === "gack") {
                    return (
                        <div className="answer-detail">
                            <span>{data.name}</span>
                            <input className="right-radio" type="radio" name={data.name} value="1" />
                            <input className="right-radio" type="radio" name={data.name} value="2" />
                            <input className="right-radio" type="radio" name={data.name} value="3" />
                            <input className="right-radio" type="radio" name={data.name} value="4" />
                            <input className="right-radio" type="radio" name={data.name} value="5" />
                        </div>)
                } else if (data.style === "ju") {
                    return (
                        <div className="answer-detail-ju">
                            <span>{data.name}</span>
                            <input className="right-radio" type="text" name={data.name} />
                        </div>)
                }
            }
            )}
            <div className="btn-center">
                <div className="btn-next"> 제출</div>
            </div>
        </>
    )
}