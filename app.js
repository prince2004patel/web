const http = require('http');
const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();
const port = 8000;
const bodyparser = require("body-parser");   //??


//database
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

}
//define mongoose schema
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  age: String,
  gender: String,
  address: String
});

const Contact = mongoose.model('Contact', contactSchema);


//express specific stuff
app.use('/static',express.static('static'))  //for serving static files
app.use(express.urlencoded())

//pug specific stuff
app.set('view engine','pug') //set the template engine as pug
app.set('views',path.join(__dirname,'views'))  //set the views directory

//endpoints
app.get('/',(req,res)=>{
  const params = { }
  res.status(200).render('index.pug',params)
})

app.get('/contact',(req,res)=>{
  const params = { }
  res.status(200).render('contact.pug',params)
})

app.get('/about',(req,res)=>{
  const params = { }
  res.status(200).render('about.pug',params)
})

//for database
app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
      res.send("this item has been saved to the database")
    }).catch(()=>{
      res.status(400).send("item was not saved to the database")
    })
    
})

//start the server
app.listen(port,()=>{
    console.log(`the application started successfully on port ${port}`);
  });