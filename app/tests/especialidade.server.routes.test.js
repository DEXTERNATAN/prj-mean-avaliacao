'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Especialidade = mongoose.model('Especialidade'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, especialidade;

/**
 * Especialidade routes tests
 */
describe('Especialidade CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Especialidade
		user.save(function() {
			especialidade = {
				name: 'Especialidade Name'
			};

			done();
		});
	});

	it('should be able to save Especialidade instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Especialidade
				agent.post('/especialidades')
					.send(especialidade)
					.expect(200)
					.end(function(especialidadeSaveErr, especialidadeSaveRes) {
						// Handle Especialidade save error
						if (especialidadeSaveErr) done(especialidadeSaveErr);

						// Get a list of Especialidades
						agent.get('/especialidades')
							.end(function(especialidadesGetErr, especialidadesGetRes) {
								// Handle Especialidade save error
								if (especialidadesGetErr) done(especialidadesGetErr);

								// Get Especialidades list
								var especialidades = especialidadesGetRes.body;

								// Set assertions
								(especialidades[0].user._id).should.equal(userId);
								(especialidades[0].name).should.match('Especialidade Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Especialidade instance if not logged in', function(done) {
		agent.post('/especialidades')
			.send(especialidade)
			.expect(401)
			.end(function(especialidadeSaveErr, especialidadeSaveRes) {
				// Call the assertion callback
				done(especialidadeSaveErr);
			});
	});

	it('should not be able to save Especialidade instance if no name is provided', function(done) {
		// Invalidate name field
		especialidade.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Especialidade
				agent.post('/especialidades')
					.send(especialidade)
					.expect(400)
					.end(function(especialidadeSaveErr, especialidadeSaveRes) {
						// Set message assertion
						(especialidadeSaveRes.body.message).should.match('Please fill Especialidade name');
						
						// Handle Especialidade save error
						done(especialidadeSaveErr);
					});
			});
	});

	it('should be able to update Especialidade instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Especialidade
				agent.post('/especialidades')
					.send(especialidade)
					.expect(200)
					.end(function(especialidadeSaveErr, especialidadeSaveRes) {
						// Handle Especialidade save error
						if (especialidadeSaveErr) done(especialidadeSaveErr);

						// Update Especialidade name
						especialidade.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Especialidade
						agent.put('/especialidades/' + especialidadeSaveRes.body._id)
							.send(especialidade)
							.expect(200)
							.end(function(especialidadeUpdateErr, especialidadeUpdateRes) {
								// Handle Especialidade update error
								if (especialidadeUpdateErr) done(especialidadeUpdateErr);

								// Set assertions
								(especialidadeUpdateRes.body._id).should.equal(especialidadeSaveRes.body._id);
								(especialidadeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Especialidades if not signed in', function(done) {
		// Create new Especialidade model instance
		var especialidadeObj = new Especialidade(especialidade);

		// Save the Especialidade
		especialidadeObj.save(function() {
			// Request Especialidades
			request(app).get('/especialidades')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Especialidade if not signed in', function(done) {
		// Create new Especialidade model instance
		var especialidadeObj = new Especialidade(especialidade);

		// Save the Especialidade
		especialidadeObj.save(function() {
			request(app).get('/especialidades/' + especialidadeObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', especialidade.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Especialidade instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Especialidade
				agent.post('/especialidades')
					.send(especialidade)
					.expect(200)
					.end(function(especialidadeSaveErr, especialidadeSaveRes) {
						// Handle Especialidade save error
						if (especialidadeSaveErr) done(especialidadeSaveErr);

						// Delete existing Especialidade
						agent.delete('/especialidades/' + especialidadeSaveRes.body._id)
							.send(especialidade)
							.expect(200)
							.end(function(especialidadeDeleteErr, especialidadeDeleteRes) {
								// Handle Especialidade error error
								if (especialidadeDeleteErr) done(especialidadeDeleteErr);

								// Set assertions
								(especialidadeDeleteRes.body._id).should.equal(especialidadeSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Especialidade instance if not signed in', function(done) {
		// Set Especialidade user 
		especialidade.user = user;

		// Create new Especialidade model instance
		var especialidadeObj = new Especialidade(especialidade);

		// Save the Especialidade
		especialidadeObj.save(function() {
			// Try deleting Especialidade
			request(app).delete('/especialidades/' + especialidadeObj._id)
			.expect(401)
			.end(function(especialidadeDeleteErr, especialidadeDeleteRes) {
				// Set message assertion
				(especialidadeDeleteRes.body.message).should.match('User is not logged in');

				// Handle Especialidade error error
				done(especialidadeDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Especialidade.remove().exec();
		done();
	});
});