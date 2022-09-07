const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  wirter: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    maxlength: 50
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    default: 0
  },
  imgaes: {
    type: Array,
    default: []
  },
  sold: {
    type: Number,
    maxlength: 100,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
}, 
// 자동으로 등록시간 등이 업데이트 됨
{ timestamps: true});

const User = mongoose.model('Product', productSchema);

module.exports = { Product };