const express = require('express');
const bodyParser=require('body-parser')
const mongoose = require('mongoose');
const postRoute =require("./post_apis/index")
const connectDB =require("./connector")
const cors = require('cors');
const sqlRoute = require('./sql_apis');
const aiRoute =require("./Ai_apis")
const workFlowRoute =require("./workflow_apis")
  const app = express();
  app.use(cors({
    origin: '*',
    credentials: true, // Enable sending cookies
  }));
  app.use(express.json({ limit: '10mb' }))

 
    app.get('/', (req, res) => {
      res.send('Hello, Express!');
    });
    app.use("/user",postRoute)
    app.use("/sql",sqlRoute)
    app.use("/ai",aiRoute)
    app.use("/workflow",workFlowRoute)
    // Start the server
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });




