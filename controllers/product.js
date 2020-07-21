const Product = require('../models/product');
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
    const category = new Product(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({data});
    })
};