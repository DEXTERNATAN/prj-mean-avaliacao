'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Colaborador Schema
 */
var ColaboradorSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Colaborador name',
		trim: true
	},
	matricula: {
		type: String,
		default: '',
		required: 'Please fill Colaborador matricula',
		trim: true
	},
	telefone: {
		type: String,
		default: '',
		required: 'Please fill Colaborador telefone',
		trim: true
	},	
	especialidade: {
		type: String,
		default: '',
		required: 'Please fill Colaborador especialidade',
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

mongoose.model('Colaborador', ColaboradorSchema);