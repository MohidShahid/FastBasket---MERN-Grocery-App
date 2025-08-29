const express = require("express");
const {authSeller} = require('../middleware/jwtCheck');
const {isSellerAuth , logout , sellerLogin} = require('../controllers/sellerController')

const router = express.Router();

router.post('/login' , sellerLogin);
router.get('/isSellerAuth' , authSeller , isSellerAuth);
router.get('/logout' , logout);


module.exports = router;