const express = require('express');
const { authUser } = require('../middleware/jwtCheck');
const {addAddress , getAddress} = require('../controllers/addressController');

const router = express.Router();

router.post('/add' , authUser , addAddress);
router.post('/get' , authUser , getAddress);

module.exports = router;