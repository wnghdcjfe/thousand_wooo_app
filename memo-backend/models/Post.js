const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
// const PostSchema = new Schema({
//     title: String,
//     username: String,
//     content: String,
//     tags: [String],  
//     create_date: Date,
//     udpate_date: Date
// });
const PostSchema = new Schema({
    title: String,
    body: String,
    tags: [String], // 문자열로 이루어진 배열
    publishedDate: {
      type: Date,
      default: Date.now, // 현재 날짜를 기본 값으로 지정
    },
    user: {
      _id: mongoose.Types.ObjectId,
      username: String,
    },
  });
module.exports = mongoose.model('Post', PostSchema); 
