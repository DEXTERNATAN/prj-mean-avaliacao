'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Especialidade Schema
 */
var EspecialidadeSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Especialidade name',
		trim: true
	},
	descricao: {
		type: String,
		default: '',
		required: 'Please fill Especialidade name',
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

mongoose.model('Especialidade', EspecialidadeSchema);