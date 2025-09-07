const express = require('express');
const { authUser, authSeller } = require('../middleware/jwtCheck');
const { placeOrderCOD, getUserOrders, getAllOrders, placeOrderStripe } = require('../controllers/orderController');

const router = express.Router();

router.post('/cod' , authUser, placeOrderCOD);
router.post('/stripe' , authUser, placeOrderStripe);
router.post('/user-orders' , authUser, getUserOrders);
router.get('/orders' , authSeller , getAllOrders);

module.exports = router;