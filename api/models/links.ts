import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const linksSchema = new Schema({
  shortUrl: {
    type: String,
    required: true
  },
  originalUrl: {
    type: String,
    required: true
  }
});

const idSchema = new Schema({
  usedId : String
});

export const Links = mongoose.model('link', linksSchema);

export const Id = mongoose.model('id', idSchema);