const express = require("express");
const {registerUser, LoginUser , isAuth , logout} = require('../controllers/userController');
const {authUser} = require('../middleware/jwtCheck')
const router = express.Router();

router.post('/register' , registerUser);
router.post('/login' , LoginUser);
router.get('/isAuth' , authUser , isAuth);
router.get('/logout' , logout);


module.exports = router;