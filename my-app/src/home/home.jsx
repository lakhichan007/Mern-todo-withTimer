
import "./home.css"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from "axios";
const Home = () => {

    const [taskBox, setTaskBox] = useState(false)
    const [userData, setuserData] = useState({})
    const [tasks, settasks] = useState([])
    
    const navigator = useNavigate()
    const token = window.localStorage.getItem("token")
    const currentUSer = window.localStorage.getItem("user")
    // console.log(currentUSer)

    useEffect(() => {
        if (!token) {
            navigator("/")
        }
    }, [])

    useEffect(() => {
        axios.post("http://localhost:5000/addTasks", { user: currentUSer, data: userData })
            .then(res => {
                let allData = res.data.message
                // console.log(allData)
                settasks(allData)
            })
            .catch(err => {
                console.log(err)
            })

    }, [userData])//handle click add new task unnecessary



    const logout = () => {
        window.localStorage.clear()
        navigator("/")
    }
    const addActivity = () => {
        const addTask = document.getElementById("task-popup")
        const add_btn = document.getElementById("add-btn")
        add_btn.innerText === "Add Activity" ? setTaskBox(true) : setTaskBox(false)
        add_btn.innerText === "Add Activity" ? add_btn.innerText = "confirm" :
            add_btn.innerText = "Add Activity"
        if (addTask) {
            let newTask = {
                activity: addTask.value,
                status: "pending",
                time: "",
                action: "start",
                timetaken: ""
            }
            setuserData(newTask)
        }

    }


    const handleStartBtn = (e, id) => {

        const onGoing = tasks.filter(task => {
            return task.status === "Ongoing"
        })
        // console.log(onGoing)
        if (onGoing.length==0) {
            let startTime = new Date().getTime();
            axios.post("http://localhost:5000/updateToStart", { id, time: startTime,user: currentUSer })
                .then(res => {
                    let allData = res.data.message
                
                settasks(allData)
                })
                .catch(err => {
                    console.log(err)
                })

        }
        else {
            alert(`The task ${onGoing[0].activity} is Going on !`)
        }

    }
    const handlePauseBtn = (e, id) => {



    }

    const handleStoptBtn = (e, id) => {
        axios.post("http://localhost:5000/updateToComplete", { id,user: currentUSer })
            .then(res => {

                let allData = res.data.message
                // console.log(allData)
                settasks(allData)
            })
            .catch(err => {
                console.log(err)
            })

    }

    const completedTAsk = tasks.filter(task => {
        return task.status === "completed"
    })
    // console.log(completedTAsk)
    // console.log(handleTask)
    return (
        <>
            <div id="main-container">
                <div id="aside">
                    <h1 id="task-completed">Tasks completed</h1>
                    <div>
                        {completedTAsk.map((ele) => {
                            return (
                                <>
                                    <li id="task-complete-container">{ele.activity}   {ele.timetaken}</li>
                                </>
                            )
                        })}
                    </div>
                    <button id="logout-btn" onClick={logout}>Log out</button>
                </div>
                <div id="middle-page">
                    <div id="header">
                        <img src={require("./images/pic.png")} alt="" />
                        <h1>My Todo list</h1>
                        <span id="user">{currentUSer}</span>
                    </div>
                    <div id="content">

                        {taskBox ? <input id="task-popup" type="text" placeholder="add your task here" /> : <div></div>}
                        <button onClick={addActivity} id="add-btn">Add Activity</button>


                        <div id="table-head">
                            <div>Activity</div>
                            <div>Status</div>
                            <div>
                                <p>Time Taken</p>
                                <p>(Hrs.:Min.:Sec)</p>
                            </div>
                            <div>Action</div>
                        </div>

                        {tasks.map((task) => {

                            return (
                                <>
                                    <div id="table-data">
                                        <div>{task.activity}</div>
                                        <div>{task.status}</div>
                                        <div>{task.timetaken}</div>
                                        <div>
                                            {
                                                (task.action === "start" || task.action === "") ? (task.action === "start") ? <p className="start-btn" onClick={(e) => handleStartBtn(e, task._id)}>{task.action}  <i class="fa fa-play-circle" aria-hidden="true"></i></p> : <p></p> :
                                                    <div className="start-pause-btn">
                                                        <p onClick={(e) => handlePauseBtn(e, task._id)} className="pause-btn">Pause <i class="fa fa-pause-circle" aria-hidden="true"></i></p>
                                                        <p onClick={(e) => handleStoptBtn(e, task._id)} className="stop-btn">Stop <i class="fa fa-stop-circle-o" aria-hidden="true"></i></p>
                                                    </div>
                                            }

                                        </div>

                                    </div>
                                </>
                            )
                        })}

                    </div>
                </div>


            </div>
        </>
    )
}
export default Home