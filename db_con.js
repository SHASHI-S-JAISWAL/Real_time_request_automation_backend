const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose') ;
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// replace the uri string with your connection string.
const uri = "mongodb+srv://shashi:shashi@cluster0-xp6g0.mongodb.net/sdb?retryWrites=true&w=majority"
/*
mongoose.connect(uri, { useNewUrlParser: true,useUnifiedTopology: true  }, (err) =>{
    if(!error) {console.log('Connected...'); }
    else
    console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
}).
  catch(error => handleError(error));*/

MongoClient.connect(uri, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   const db = client.db('sdb');
   console.log(db);
   db.collection('users').insertOne(
       {name:'shashi', pass : 'shashi'}
   )
   
   client.close();
  
});
