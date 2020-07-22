const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }

        //check for all fields
        const {name, description, price, category, quantity, shipping} = fields;
        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: 'All fields are required.'
            })
        }

        let product = new Product(fields);

        // 1kb = 1000
        // 1mb = 1000000
        if (files.photo) {
            //console.log(files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size.'
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result);
        })
    })
};

exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) =>{
        if (err || !product) {
            return res.status(400).json({
                error: 'Product not found'
            })
        }

        req.product = product;
        next();
    })
};

exports.read = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}

exports.remove = (req, res) => {
    let product = req.product;
    product.remove((err, deleteProduct) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        deleteProduct.photo = undefined;
        res.json({
            deleteProduct, message: 'Product deleted successfully.'
        })
    })
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }

        //check for all fields
        const {name, description, price, category, quantity, shipping} = fields;
        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: 'All fields are required.'
            })
        }

        let product = req.product;
        product = _.extend(product, fields);

        // 1kb = 1000
        // 1mb = 1000000
        if (files.photo) {
            //console.log(files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size.'
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result);
        })
    })
};

/**
 * sell / arrival
 * by sell = /product?sortBy=sold&order=desc&limit4
 * by arrival = /product?sortBy=createdAt&order=desc&limit4
 * if no params are sent, then all products are returned
*/
exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? req.query.limit : 5;

    Product.find()
        .select("-photo")
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: 'Product not found'
                });
            }
            res.send(products);
        })
}