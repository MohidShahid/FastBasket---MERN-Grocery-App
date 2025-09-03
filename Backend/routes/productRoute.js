const express = require('express');
const {AddProduct , ListProducts , findProductById , updateStock} = require('../controllers/productControllers');
const upload = require('../middleware/multer');
const {authSeller} = require('../middleware/jwtCheck');
const router = express.Router();

router.post('/add' ,authSeller , upload.array(['images']) , AddProduct);
router.get('/list' , ListProducts);
router.get('/:id' , findProductById);
router.post('/stock' , authSeller, updateStock);

module.exports = router;


