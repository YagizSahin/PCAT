const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const Schema = mongoose.Schema;

//create schema

const PhotoSchema = new Schema({
  title: String,
  description: String,
  image: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Photo = mongoose.model('Photo', PhotoSchema);

module.exports= Photo;
