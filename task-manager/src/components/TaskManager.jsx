import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import axios from "axios";

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(()=>{
        const fetchTasks = async() => {
            try{
                const response = await axios.get("http://localhost:3000/api/tasks");
                setTasks(response.data);
                setLoading(false);
            }catch{
                setError("Failed to fetch tasks");
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    const addTask = async (name) => {
        try{
            console.log(name);
        const response = await axios.post("http://localhost:3000/api/tasks", {
            title: name,
            completed: false
        });
        console.log(response);
        setTasks([...tasks, response.data]);
    }catch(err){
        setError("Failed to add Task");
    }
    };

    const toggleTask = async(id) => {
        const task = tasks.find(task => task._id === id);
        try{
            const response = await axios.put(`http://localhost:3000/api/tasks/${id}`,{
                completed: !task.completed,
            });
            setTasks(tasks.map(task => task._id === id ? {...task, completed: !task.completed} : task))
        }catch(err){
            setError("Failed to update the task")
        }
    };

    const deleteTask = async(id) => {
        try{
            await axios.delete(`http://localhost:3000/api/tasks/${id}`);
            setTasks(tasks.filter(task => task._id !== id))
        }catch(error){
            setError("Failed to delete the task");
        }
    };

    const filteredTask = tasks.filter(task => filter === 'all' ? true : filter === 'completed' ? task.completed : !task.completed);

    return(
        <div style={{padding: '20px'}}>  
            <h1>Task Manager</h1>
            {loading && <p>Loading Tasks...</p>}
            {error && <p style={{color:"red"}}>{error}</p>}

            <input type="text" placeholder="Enter Task Name" onKeyDown={(e)=>{
                if(e.key === 'Enter' && e.target.value){
                    addTask(e.target.value);
                    e.target.value="";
                    
                }
                }}/>
            <div>
                <button onClick = {() => setFilter('all')}>All</button>
                <button onClick = {() => setFilter('completed')}>Completed</button>
                <button onClick = {() => setFilter('pending')}>Pending</button>
                <TaskList tasks={filteredTask} onToggle={toggleTask} onDelete={deleteTask}/>
            </div>
        </div>
    );
}

export default TaskManager;