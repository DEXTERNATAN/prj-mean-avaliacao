'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Avaliacao = mongoose.model('Avaliacao'),
    _ = require('lodash');

/**
 * Create a Avaliacao
 */
exports.create = function(req, res) {

};

/**
 * Show the current Avaliacao
 */
exports.read = function(req, res) {

};

/**
 * Update a Avaliacao
 */
exports.update = function(req, res) {

};

/**
 * Delete an Avaliacao
 */
exports.delete = function(req, res) {

};

/**
 * List of Avaliacaos
 */
exports.list = function(req, res) {
	// Avaliacao.find().exec(function(err, avaliacao) {
 //        if (err) {
 //            return res.status(400).send({
 //                message: errorHandler.getErrorMessage(err)
 //            });
 //        } else {
 //            res.json(avaliacao);
 //        }
 //    });
 	//res.json([{ name: 'Beverages' }, { name: 'Condiments' }]);
};
