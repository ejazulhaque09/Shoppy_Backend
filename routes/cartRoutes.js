const express = require('express');
const { addToCart, getCart, removeFromCart, updateCart } = require('../controllers/cartController');
const router = express.Router();


// routes for cart
router.post('/', addToCart)
router.get('/:userId', getCart)
router.put('/',updateCart)
router.delete('/',removeFromCart)

module.exports = router;