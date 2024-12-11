import React, { useState } from "react";
import TaskList from "./TaskList";

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');

    const addTask = (name) => {
        const newTask = {
            id : Date.now(),
            name,
            completed: false
        };
        setTasks([...tasks, newTask]);
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(task => task.id === id ? {...task, completed: !task.completed} : task))
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id))
    };

    const filteredTask = tasks.filter(task => filter === 'all' ? true : filter === 'completed' ? task.completed : !task.completed);

    return(
        <div style={{padding: '20px'}}>  
            <h1>Task Manager</h1>
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