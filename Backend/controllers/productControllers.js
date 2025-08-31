const Product = require('../models/product');
const cloudinary = require('../config/cloudinary');

const AddProduct = async(req , res)=>{
   try {
    const productData = JSON.parse(req.body.productData);
   const images = req.files;
  let imageUrl = await Promise.all(
    images.map(async (item)=>{
        let result = await cloudinary.uploader.upload(item.path , {resource_type : 'image'});
        return result.secure_url;
    }))
    await Product.create({...productData , image : imageUrl});
    res.status(201).json({success : true , message : "Product Added"})
   } catch (error) {
    console.log("Add Product Error" , error.message);
     res.status(401).json({success : false , message : "Product Added Failed"})
   } 
}

const ListProducts = async(req , res)=>{
  try {
      const products = Product.find({});
      res.status(201).json({success : true , products})
  } catch (error) {
    console.log("Product List Error" , error.message);
    res.status(401).json({success : false , message : error.message});
  }
}

const findProductById = async(req , res)=>{
    try {
           const {id} = req.params;
   const product = Product.findById({id});
   res.status(201).json({success : true , product});
    } catch (error) {
    console.log("FindProductById Error" , error.message);
    res.status(401).json({success : false , message : error.message});
    }
}

const updateStock = async(req , res)=>{
    try {
        const {id , inStock} = req.body;
        Product.findByIdAndUpdate({id} , {inStock : inStock});
        res.status(201).json({success : true , message : "Stock Updated"});
    } catch (error) {
      console.log("Product Stock Error" , error.message);
      res.status(401).json({success : false , message : error.message});
    }
};

module.exports = {AddProduct , ListProducts , findProductById , updateStock};