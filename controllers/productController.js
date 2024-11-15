const Product = require('../models/Products')

//Get all products
exports.getProducts = async (req, res) => {
    try{
        const products = await Product.find();
        res.json(products);

    }
    catch(err){
        res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}


// Get product By Id
exports.getProductById = async (req, res) =>{
    try{
        const product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(404).json({
                msg: "Product Not Found"
            })
        }
        res.json(product)

    }
    catch(err){
        res.json(500).json({
            success: false,
            msg: err.message
        })
    }
}

// Create a new product

exports.addProduct = async(req, res) => {
    const {name, price, description, stock, thumbnail} = req.body;
    try{
        const newProduct = new Product({name, price, description, stock, thumbnail})
        await newProduct.save();
        res.status(201).json({
            success: true,
            msg: "Product added successfully",
            data: newProduct
        })
    }
    catch(err){
        res.status(400).json({
            success: false,
            msg: err.message
        })
    }
}

// Update product
exports.updateProduct = async (req, res) => {
    try{
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.status(202).json({
            success: true,
            msg: "Updated Successfully",
            data: updatedProduct
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            msg: err.messsage
        })
    }
}

// Delete Product
exports.deleteProduct = async (req, res) => {
    try{
        const deletedProduct = await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            msg: "Product deleted successfully",
            data: deletedProduct
        })
    }
    catch(err) {
        res.status(500).json({
            success: false,
            msg: err.message
        })
    }   
}