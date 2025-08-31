const {updateCart} = require('../controllers/cartController');

const express = require('express');
const { authUser } = require('../middleware/jwtCheck');
const router = express.Router();

router.post('/' , authUser , updateCart);

module.exports = router;