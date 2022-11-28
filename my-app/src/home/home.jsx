
import "./home.css"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from "axios";
const Home = () => {

    const [taskBox, setTaskBox] = useState(false)
    const [userData, setuserData] = useState({})
    const [tasks, settasks] = useState([])
    const [handleTask, sethandletask] = useState([])//to update the page once clilck
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

        axios.post("http://localhost:5000/updateToStart", { id })
            .then(res => {
            })
            .catch(err => {
                console.log(err)
            })

            sethandletask(id)
    }
    const handlePauseBtn = (e, id) => {
        


    }

    const handleStoptBtn = (e, id) => {
        axios.post("http://localhost:5000/updateToComplete", { id })
            .then(res => {
                
            })
            .catch(err => {
                console.log(err)
            })

            sethandletask(id)

    }
    // const ongoingTAsk=tasks.filter(task=>{
    //     return task.status!="completed"
    // })
    // console.log(ongoingTAsk)
    return (
        <>
            <div id="main-container">
                <div id="aside">
                    <h1 id="task-completed">Tasks completed</h1>
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
                                                (task.action === "start") ? <p className="start-btn" onClick={(e) => handleStartBtn(e, task._id)}>{task.action}  <i class="fa fa-play-circle" aria-hidden="true"></i></p> :
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