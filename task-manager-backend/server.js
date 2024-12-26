const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./db");
const Task = require("./models/Task");
const { default: mongoose } = require("mongoose");

const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());

//connecting to dabase
connectDB();

app.get("/api/tasks", async (req,res)=>{
    try{
        const tasks = await Task.find();
        console.log(JSON.stringify(tasks));
        res.status(200).json(tasks);
    }catch(err){
        res.status(500).json({error:"Failed to fetch Tasks"});
    }
});

app.post("/api/tasks", async(req,res)=>{
    try{
        const newTask = new Task(req.body);
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    }catch(err){
        res.status(400).json({ error: "Failed to add task" });
    }
});

app.put("/api/tasks/:id", async(req, res)=>{
    const taskId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(taskId)){
        return res.status(400).json({ error: "Invalid Task ID" });
    }
    try{
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )
        if(!updatedTask){
            return res.status(404).json({error:"Task not found"});
        }
        res.status(200).json(updatedTask);
    }catch(error){
        res.status(400).json("Failed to update the task");
    }
});

app.delete("/api/tasks/:id", async(req, res)=>{
    const taskId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(taskId)){
        return res.status(400).json({ error: "Invalid Task ID" });
    }
    try{
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if(!deletedTask){
            res.status(404).json({error:"Task not found"});
        }
        res.status(200).json({message:"Task Deleted successfully"})
    }catch(erro){
        res.status(500).json({error:"Failed to delete the task"})
    }
})
const PORT = 3000;
app.listen(3000, () =>{
    console.log(`Server is running at http://localhost:${PORT}`);
});


