'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Papel = mongoose.model('Papel'),
    _ = require('lodash');

/**
 * Create a Papel
 */
exports.create = function (req, res) {
    var papel = new Papel(req.body);

    papel.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.status(201).json(papel);
        }
    });

};

/**
 * Show the current Papel
 */
exports.read = function (req, res) {

};

/**
 * Update a Papel
 */
exports.update = function (req, res) {

};

/**
 * Delete an Papel
 */
exports.delete = function (req, res) {

};

/**
 * List of Papels
 */
exports.list = function (req, res) {
    Papel.find().exec(function (err, papel) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(papel);
        }
    });
};