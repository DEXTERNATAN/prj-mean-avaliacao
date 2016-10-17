'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Validation
 */
function validateLength(v) {
    // a custom validation function for checking string length to be used by the model
    return v.length <= 15;
}

/**
 * Avaliacao Schema
 */
var AvaliacaoSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true,
        unique: true,
        // make this a required field
        required: 'name cannot be blank',
        // wires in a custom validator function (http://mongoosejs.com/docs/api.html#schematype_SchemaType-validate).
        validate: [validateLength, 'name must be 15 chars in length or less']
    },
    description: {
        // types are defined e.g. String, Date, Number (http://mongoosejs.com/docs/guide.html)
        type: String,
        default: '',
        // types have specific functions e.g. trim, lowercase, uppercase (http://mongoosejs.com/docs/api.html#schema-string-js)
        trim: true
    },
    divisao: {
        // types are defined e.g. String, Date, Number (http://mongoosejs.com/docs/guide.html)
        type: String,
        default: '',
        // types have specific functions e.g. trim, lowercase, uppercase (http://mongoosejs.com/docs/api.html#schema-string-js)
        trim: true
    },
    colaborador: {
        type: String,
        default: '',
        trim: true
    },
    especialidade: {
        type: String,
        default: '',
        trim: true
    },
    papel: {
        type: String,
        default: '',
        trim: true
    },
    atributos: {
        type: String,
        default: '',
        trim: true
    },    
    created: {
        type: Date,
        default: Date.now
    }


});

mongoose.model('Avaliacao', AvaliacaoSchema);