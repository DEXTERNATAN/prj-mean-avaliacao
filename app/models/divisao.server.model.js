'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Divisao Schema
 */
var DivisaoSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Divisao name',
		trim: true
	},
	descricao: {
		type: String,
		default: '',
		required: 'Please fill Divisao descricao',
		trim: true
	},
	UF: {
		type: String,
		default: '',
		required: 'Please fill Divisao UF',
		trim: true
	},
	especialidade: {
		type: String,
		default: '',
		required: 'Please fill Divisao especialidade',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Divisao', DivisaoSchema);