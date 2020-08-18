const express = require ('express');
var http = require('http');
const app = express() ;
const dotenv  = require('dotenv');
const mongoose = require('mongoose');
//const cors = require('cors')
//const request = require('request');
var server = http.createServer(app);
// Pass a http.Server instance to the listen method
var io = require('socket.io').listen(server);

const Request = require ('./model/Requests');

const UD = require ('./model/User');

//importing routes
const authRoute = require('./routes/auth');
const todo = require('./routes/todo');
const { request } = require('https');

dotenv.config();

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

//connect to db
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true,useUnifiedTopology: true  }, (err) =>{console.log('Connected...')  });


//middleware
//app.use(cors());
//app.use (express.json()) ;
//app.use(cors());

//route middleware
//app.use ('/api/user',authRoute);
//app.use ('/api/saved',todo);

const PORT = process.env.PORT || 4000;
// The server should start listening
server.listen(PORT, () => console.log('server is listening'));
//app.listen(); 
io.on('connection', function (socket) {
    console.log("Connected succesfully to the socket ...");
    
    
    var news = [
        { title: 'The cure of the Sadness is to play Videogames',date:'04.10.2016'},
        { title: 'Batman saves Racoon City, the Joker is infected once again',date:'05.10.2016'},
        { title: "Deadpool doesn't want to do a third part of the franchise",date:'05.10.2016'},
        { title: 'Quicksilver demand Warner Bros. due to plagiarism with Speedy Gonzales',date:'04.10.2016'},
    ];

    // Send news on the socket
    socket.emit('hi', news);
    socket.emit('event','shashi');
  
    socket.on('my other event', function (data) {
    console.log(data);
    });

    //insert request
    socket.on('get request',async (data) => {
        console.log('trying yo')
        const req  = new Request ({
            created_by :data.created_by,
            to_dept: data.to_dept,
            to_user : data.to_user,
            date: data.date,
            message: data.message ,
            status : 'Pending'
        });
        try {
            
            console.log('trying');
            const savedreq = await req.save() ;
            console.log('savedreq');
            socket.emit('send request',savedreq);
            const all = await  Request.find({}); 
            io.emit('response all req',all )
            console.log('send all req');
        } catch (error) {
            
        }

    });  

    socket.on('create_user',async (data) => {
        console.log('trying yo')
        const ud1 = new UD({
            name: 'user1',
            dept :'dept1',
            password :"password"
        })
        ud1.save();
        
    });  
    socket.on('geUD',async (data) => {
        console.log('tgetall');
         const allUD = await  UD.find({}); 
        socket.emit('allUD',allUD )
    });  

    socket.on('request all req',async (data) => {
         const all = await  Request.find({}); 
        socket.emit('response all req',all )
    });  

    socket.on('update',async (data) => {
        const a = await Request.findOneAndUpdate({_id : data.id }, {status : data.status})
        const all = await  Request.find({}); 
        io.emit('response all req',all )
    });
});

