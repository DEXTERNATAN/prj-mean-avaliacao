'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Classificacao = require('../../app/models/classificacao.server.model'),
	Schema = mongoose.Schema;

/**
 * Atributo Schema
 */
var AtributoSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Atributo name',
		trim: true
	},
	tipo: ['Abrangencia', 'Impacto', 'Relevancia'],
	moderado: {
		type: String,
		default: '',
		trim: true
	},
	significativo: {
		type: String,
		default: '',
		trim: true
	},
	muito: {
		type: String,
		default: '',
		trim: true
	},
	moderada: {
		type: String,
		default: '',
		trim: true
	},
	alta: {
		type: String,
		default: '',
		trim: true
	},
	altissima: {
		type: String,
		default: '',
		trim: true
	},
	Relevante: {
		type: String,
		default: '',
		trim: true
	},
	muitos: {
		type: String,
		default: '',
		trim: true
	},
	altamente: {
		type: String,
		default: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	classificacao: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Atributo', AtributoSchema);