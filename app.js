const express = require('express');
const ejs = require('ejs');
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageControllers');
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
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);
//routes
app.get('/', photoController.getAllPhotos);

app.get('/photos/:id', photoController.getPhoto);

app.post('/photos', photoController.createPhoto);

app.put('/photos/:id', photoController.updatePhoto);

app.delete('/photos/:id', photoController.deletePhoto);

app.get('/add', pageController.getAddPage);

app.get('/about', pageController.getAboutPage);

app.get('/photos/edit/:id', pageController.getEditPage);

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
