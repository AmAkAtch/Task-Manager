import React from 'react'

const Task = ({task, onToggle, onDelete}) => {
    return(
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0' }}>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.title}
            </span>
            <div>
                <button onClick={() => onToggle(task._id)}>
                    {task.completed ? 'Undo' : 'Complete'}
                </button>
                <button onClick={() => onDelete(task._id)}>Delete</button>
            </div>
        </div>
    );
};

export default Task;