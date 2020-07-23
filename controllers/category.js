const Category = require('../models/category');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
    const category = new Category(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({data});
    })
};

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: 'Category not found'
            })
        }
        return res.json(category);
    })
}

exports.read = (req, res) => {
    return res.json(req.category);
}

exports.remove = (req, res) => {
    let category = req.category;
    category.remove((err, deleteCategory) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        return res.json({
            deleteCategory, message: 'Category deleted successfully'
        })
    })
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    //form.keepExtensions = true;
    form.parse(req, (err, fields) => {
        if (err) {
            return res.status(400).json({
                error: 'Error when try to update category'
            });
        }

        //check for all fields
        const {name} = fields;
        if (!name) {
            return res.status(400).json({
                error: 'All fields are required.'
            })
        }

        let category = req.category;
        category = _.extend(category, fields);

        category.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result);
        })
    });
}

exports.listCategories = (req, res) => {
    
}