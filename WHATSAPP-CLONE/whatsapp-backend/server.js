// importing 
import express from "express";
import mongoose from 'mongoose';
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from 'cors';
// app config
const app = express();
 const port = process.env.PORT || 9000;

 const pusher = new Pusher({
    appId: "1193507",
    key: "f975a732a5456f19f392",
    secret: "9b4ff4cb126dc9c44c91",
    cluster: "eu",
    useTLS: true
  });
  

 // middleware
 app.use(express.json());
 app.use(cors());

 // DB config 
 const connection_url ="mongodb+srv://ram1511:Fo9Ggw5yLC4tiOzO@cluster0.3ap7i.mongodb.net/whatsappdb?retryWrites=true&w=majority";
    mongoose.connect(connection_url,{  // myFirstDatabase 
    useCreateIndex: true,
    useNewUrlParser: true,               // Fo9Ggw5yLC4tiOzO
    userUnifiedTopology: true
    });
 
    const db = mongoose.connection
    db.once('open',() =>{
        console.log("DB connected");

        const msgCollection = db.collection('messagecontents');
        const changeStream = msgCollection.watch();

         changeStream.on('change',(change)=>{
             console.log("A Changed occured",change);
             if(change.operationType=='insert'){
                const messageDetails = change.fullDocument;
                pusher.trigger("messages","inserted",
                {
                    name: messageDetails.name,
                    message: messageDetails.message,
                    timestamp: messageDetails.timestamp,
                    received:messageDetails.received,
                }
                );
            }
            else {
                console.log('Error triggering Pusher')
            }
        
         });

    });

 // api routes
 app.get('/',(req,res)=>res.status(200).send('Hello World'));

 app.get("/messages/sync",(req,res)=>{
      Messages.find((err,data) => {
        if(err){
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }                   
    }) ;                  
});

app.post("/messages/new",(req,res)=>{
    const dbMessage = req.body;
     
    Messages.create(dbMessage,( err,data)=> {
        if(err){
            res.status(500).send(err);
        }
        else {
            res.status(201).send(data);
        }                   
    });                      
});


 // listen
 app.listen(port,()=>console.log(`Listening on localhost:${port}`));