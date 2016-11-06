'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Divisao = mongoose.model('Divisao'),
	Colaborador = mongoose.model('Colaborador'),
	Especialidade = mongoose.model('Especialidade'),
	Avaliacao = mongoose.model('Avaliacao'),
    _ = require('lodash');

/**
 * Create a Avaliacao
 */
exports.create = function (req, res) {

	var avaliacao = new Avaliacao(req.body);
	
	avaliacao.divisao = req.body.divisao;
	avaliacao.colaborador = req.body.colaborador;
	avaliacao.especialidade = req.body.especialidade;

	avaliacao.save(function (err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.status(201).json(avaliacao);
		}
	});

};

/**
 * Show the current Avaliacao
 */
exports.read = function (req, res) {

    Avaliacao.findById(req.params.avaliacaoId).exec(function (err, avaliacao) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			if (!avaliacao) {
				return res.status(404).send({
					message: 'Category not found'
				});
			}
			res.json(avaliacao);
		}
	});

};

/**
 * Update a Avaliacao
 */
exports.update = function (req, res) {

	var avaliacao = new Avaliacao(req.body);
	var dtUpdateIsoString = new Date().toISOString();
	Avaliacao.findById(req.params.avaliacaoId).exec(function (err, avaliacao) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			if (!avaliacao) {
				return res.status(404).send({
					message: 'Avaliacao não encontrada'
				});
			}

			var objAvaliacao = {
				identificador: avaliacao._id,
				name: req.body.name,
				description: req.body.description,
				dtupdate: dtUpdateIsoString,
				created: avaliacao.created
			};
			Avaliacao.update(objAvaliacao, function (err) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					res.status(201).json(objAvaliacao);
				}
			});

		}
	});
};

/**
 * Delete an Avaliacao
 */
exports.delete = function (req, res) {
	Avaliacao.findById(req.params.avaliacaoId).exec(function (err, avaliacao) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			if (!avaliacao) {
				return res.status(404).send({
					message: 'Avaliacao não encontrada'
				});
			}

			avaliacao.remove(function (err, avaliacao) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					return res.status(201).send({
						message: 'Avaliação deletada com sucesso'
					});
				}
			});
		}
	});

};

/**
 * List of Avaliacaos
 */
exports.list = function (req, res) {
	Avaliacao.find().exec(function (err, avaliacao) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(avaliacao);
        }
    });
	//res.json([{ name: 'Beverages' }, { name: 'Condiments' }]);
};
