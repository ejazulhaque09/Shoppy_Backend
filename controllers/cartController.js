const Cart = require('../models/Cart');
const { findOne } = require('../models/User');


// Add and Update cart
exports.addToCart = async (req, res) => {
    const {userId, productId, quantity} = req.body;
    try{
        if(!userId || !productId){
            return res.status(400).json({
                success: false,
                mag: "Enter userId and productId"
            })
        }
        const cart = await Cart.findOne({userId});
        if(cart) {
            const product = cart.products.find( p => p.productId == productId)
            if(product) {
                product.quantity += quantity;
            }
            else{
                cart.products.push({productId, quantity})
            }   
            await cart.save();
        }
        else{
            await Cart.create({userId, products: [{productId, quantity}]})
        }
        res.json({
            success: true,
            msg: "Product added to cart",
        })

    }
    catch(err){
        res.status(500).json({
            success: false,
            msg: err.message    
        })
    }
}

// Get cart items by userId
exports.getCart = async (req, res) => {
    try{
        const cart = await Cart.findOne({userId: req.params.userId}).populate('products.productId')
        res.status(200).json({
            success: true,
            data: cart
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}

// Remove form cart
exports.removeFromCart = async (req, res) => {
    const {userId, productId} = req.body;

    try{
        const cart = await Cart.findOne({userId});
        cart.products = cart.products.filter(p => p.productId.toString() != productId);
        await cart.save();
        res.status(202).json({
            success: true,
            msg: "Item removed Successfully"
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}
// Update cart
exports.updateCart = async (req, res)=>{
    const {userId, productId, quantity} = req.body;
    try{
        if(!userId || !productId || quantity == undefined){
            return res.status(400).json({
                success: false,
                msg: "Enter userId, productId and quantity"
            })
        }
        const cart = await Cart.findOne({userId});
        if(!cart) {
            return res.status(404).json({
                success: false,
                msg: "Cart not found"
            })
        }
        const product = cart.products.find(p => p.productId.toString() == productId)
        if(product){
            if(quantity > 0) {
                product.quantity = quantity
            }
            else{
                cart.products = cart.products.filter(p => p.productId.toString() !==productId);
            }
            await cart.save();
            res.status(200).json({
                success: true,
                msg:"Cart updated successfully"
            })
        }
        else{
            res.status(404).json({
                success: false,
                msg: "Product not found"
            })
        }
    }
    catch(err){
        res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}