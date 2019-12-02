const mongoose = require('mongoose');
const Schema = mongoose.Schema;  
const PostSchema = new Schema({
    title: String,
    body: String,
    tags: [String],  
    publishedDate: {
      type: Date,
      default: Date.now,  
    },
    user: {
      _id: mongoose.Types.ObjectId,
      username: String,
    },
  });
module.exports = mongoose.model('Post', PostSchema); 
