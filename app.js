const express = require('express');
const ejs=require('ejs');
const path = require('path');
const Photo= require('./models/Photo');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const app = express();

//connect DB
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db');

//template engine
app.set("view engine","ejs");

//middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//routes
app.get('/', async (req, res) => {
  const photos=await Photo.find({});
  res.render('index',{
    photos
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});
app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect('/');
});




const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
