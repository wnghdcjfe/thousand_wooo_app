const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const PostSchema = new Schema({
    title: String,
    username: String,
    content: String,
    tags: [String],  
    create_date: Date,
    udpate_date: Date
});

module.exports = mongoose.model('Post', PostSchema); 
