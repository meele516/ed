const express = require('express');
const postRoute =express.Router()
const selectedlist =require("../models/selectedlist")
const apilist =require("../models/apilist")
const connectDB =require("../connector")
async function lazyload(){
    try {
      await connectDB();
      console.log("MongoDB connection established for route modules");
      postRoute.post("/selectedlist",async(req,res)=>{
        try{
    console.log(req.body)
            const savedlist =new selectedlist(req.body)
            const upload = await savedlist.save()
            res.status(201).send(upload)
        }
        catch(err){
            // console.log(err)
            res.status(404).send({error:JSON.stringify(err)})
        }
    })
    postRoute.get("/selectedlist",async(req,res)=>{
    try{
        const results =await selectedlist.find({})
        res.status(200).send({entities:results})
    }
    catch(err){
        res.status(404).send({error:JSON.stringify(err)})
    }
    })
    postRoute.post("/apilist",async(req,res)=>{
        try{
    console.log(req.body)
            const savedlist =new apilist(req.body)
            const upload = await savedlist.save()
            res.status(201).send(upload)
        }
        catch(err){
            // console.log(err)
            res.status(404).send({error:JSON.stringify(err)})
        }
    })
    postRoute.get("/apilist",async(req,res)=>{
        try{
            const results =await apilist.find({})
            res.status(200).send({entities:results})
        }
        catch(err){
            res.status(404).send({error:JSON.stringify(err)})
        }
        })
  
      // Add route middleware after MongoDB connection is established
     
    } catch (error) {
      console.error('Error establishing MongoDB connection for route modules:', error);
      // Handle connection error as needed
    }
  }
  lazyload()


module.exports=postRoute