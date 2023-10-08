const Product = require('../models/product.model');
const logger = require('../logger/logger');

exports.findAllProducts = async (req, res) => {
    console.log("Find all products");

    try {
        const result = await Product.find();
        res.status(200).json({ status: true, data: result });
        logger.info("Log Info: Successfully read all products");
        logger.log("Logger: Successfully read all products");
    } catch (error) {
        logger.error("Problem in reading all products");
        res.status(400).json({ status: false, data: error });
    }
};

exports.findProductById = async (req, res) => {
    const productId = req.params.productId;
    console.log("Find product with ID ", productId);
    try {
        const result = await Product.findById(productId);
        logger.info("Success")
        res.status(200).json({ status: true, data: result });
    } catch (err) {
        logger.error("Problem in finding product")
        res.status(400).json({ status: false, data: err });
    }
};

exports.createProduct = async (req, res) => {
    const newProduct = new Product({
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity || 0
    });

    try {
        const result = await newProduct.save();
        res.status(200).json({ status: true, data: result });
        console.log("Success in inserting product: ", req.body.product);
    } catch (error) {
        res.status(400).json({ status: false, data: error });
    }
};

exports.updateProduct = async (req, res) => {
    const productId = req.body.productId;

    const updateProduct = {
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity || 0
    };

    try {
        result = await Product.findByIdAndUpdate(productId, updateProduct, { new: true });
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        res.status(400).json({ status: false, data: error });
    }
};

exports.deleteProduct = async (req, res) => {
    const productId = req.params.productId;

    try {
        const result = await Product.findByIdAndRemove(productId);
        res.status(200).json({ status: true, data: result });
        console.log("Delete product with ID: ", productId);
    } catch (error) {
        res.status(400).json({ status: false });
        console.log("Error", error);
    }
};
