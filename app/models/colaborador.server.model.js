'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Especialidade = require('../../app/models/especialidade.server.model'),
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
	//especialidade    : [ Especialidade ],
	especialidade: {
		type: Schema.Types.ObjectId,
		ref: 'Especialidade'
	},
	divisao: {
		type: Schema.Types.ObjectId,
		ref: 'Divisao'
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