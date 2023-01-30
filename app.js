const express = require('express');
const ejs = require('ejs');
const path = require('path');
const methodOverride = require('method-override')
const fs =require('fs');
const fileUpload = require('express-fileupload');
const Photo = require('./models/Photo');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const app = express();

//connect DB
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db');

//template engine
app.set('view engine', 'ejs');

//middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method',{
  methods:['POST','GET']
}))
//routes
app.get('/', async (req, res) => {
  const photos = await Photo.find({}).sort('-date');
  res.render('index', {
    photos,
  });
});
app.get('/photos/:id', async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
});
app.get('/add', (req, res) => {
  res.render('add');
});
app.post('/photos', async (req, res) => {
  //await Photo.create(req.body);
  //res.redirect('/');
  const uploadDir= 'public/uploads';
  if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
  }
  let uploadedImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadedImage.name;
  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name,
    });
    res.redirect('/');
  });
});
app.get('/photos/edit/:id', async(req, res) => {
  const photo= await Photo.findOne({_id:req.params.id})
  res.render('edit',{
    photo
  });
});
app.put('/photos/:id', async (req, res) => {
  const photo= await Photo.findOne({_id:req.params.id})
  photo.title=req.body.title;
  photo.description=req.body.description;
  photo.save();

  res.redirect(`/photos/${req.params.id}`)
});

app.delete('/photos/:id', async(req,res)=>{
 const photo= await Photo.findOne({_id:req.params.id});
 let deletedImage=__dirname + '/public' + photo.image;
 fs.unlinkSync(deletedImage);
 await Photo.findByIdAndRemove(req.params.id);
 res.redirect("/");
})

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
