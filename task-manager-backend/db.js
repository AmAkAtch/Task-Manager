const mongoose = require("mongoose");

const connectDB = async() => {
    try{
        await mongoose.connect("mongodb://localhost:27017/taskmanager", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }catch(err){
        console.error("Failed to connect to MongoDb", err);
        process.exit(1);
    }
};

module.exports = connectDB ;