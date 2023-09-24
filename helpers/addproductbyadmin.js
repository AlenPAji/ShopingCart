var db=require('../config/connection')
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fs = require('fs');
const { log } = require('console');



var x = ''
const extractFileName = (file) => {
  
  x=Date.now() + path.extname(file.originalname);
  return x;
};


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/product-images');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, extractFileName(file));
  }
});

const upload = multer({ storage: storage });

const ImageSchema = new Schema({
  name: String,
  category:String,
  desc: String,



  price: Number,
  img: {
    data: Buffer,
    contentType: String,
    imageName:String
  }
});

const Image = mongoose.model('Image', ImageSchema);

function addProdduct(datas,imgDatas){
  console.log(x);
  const newImage = new Image();
  newImage.name = datas.productname;
  newImage.desc = datas.productdescription;
  newImage.category = datas.productcategory;
  newImage.price = datas.productprice;

  newImage.img.data = imgDatas.imgData;
  newImage.img.contentType = imgDatas.imgContentType; 
  newImage.img.imageName = x;
  newImage.save();
  console.log("Insertion Successfull");

}

async function hi(){
const all = await Image.find({});
console.log(all);
}

function deleteproduct(id){

  return new Promise(async(resolve,reject)=>{

    const x=await Image.deleteOne({ _id: id });
     

      resolve(x);
  })

}



module.exports = {
    upload,
    addProdduct,
    hi,
    Image,
    deleteproduct
}
    


      



