'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Atributo = mongoose.model('Atributo'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, atributo;

/**
 * Atributo routes tests
 */
describe('Atributo CRUD tests', function() {
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

		// Save a user to the test db and create new Atributo
		user.save(function() {
			atributo = {
				name: 'Atributo Name'
			};

			done();
		});
	});

	it('should be able to save Atributo instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Atributo
				agent.post('/atributos')
					.send(atributo)
					.expect(200)
					.end(function(atributoSaveErr, atributoSaveRes) {
						// Handle Atributo save error
						if (atributoSaveErr) done(atributoSaveErr);

						// Get a list of Atributos
						agent.get('/atributos')
							.end(function(atributosGetErr, atributosGetRes) {
								// Handle Atributo save error
								if (atributosGetErr) done(atributosGetErr);

								// Get Atributos list
								var atributos = atributosGetRes.body;

								// Set assertions
								(atributos[0].user._id).should.equal(userId);
								(atributos[0].name).should.match('Atributo Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Atributo instance if not logged in', function(done) {
		agent.post('/atributos')
			.send(atributo)
			.expect(401)
			.end(function(atributoSaveErr, atributoSaveRes) {
				// Call the assertion callback
				done(atributoSaveErr);
			});
	});

	it('should not be able to save Atributo instance if no name is provided', function(done) {
		// Invalidate name field
		atributo.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Atributo
				agent.post('/atributos')
					.send(atributo)
					.expect(400)
					.end(function(atributoSaveErr, atributoSaveRes) {
						// Set message assertion
						(atributoSaveRes.body.message).should.match('Please fill Atributo name');
						
						// Handle Atributo save error
						done(atributoSaveErr);
					});
			});
	});

	it('should be able to update Atributo instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Atributo
				agent.post('/atributos')
					.send(atributo)
					.expect(200)
					.end(function(atributoSaveErr, atributoSaveRes) {
						// Handle Atributo save error
						if (atributoSaveErr) done(atributoSaveErr);

						// Update Atributo name
						atributo.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Atributo
						agent.put('/atributos/' + atributoSaveRes.body._id)
							.send(atributo)
							.expect(200)
							.end(function(atributoUpdateErr, atributoUpdateRes) {
								// Handle Atributo update error
								if (atributoUpdateErr) done(atributoUpdateErr);

								// Set assertions
								(atributoUpdateRes.body._id).should.equal(atributoSaveRes.body._id);
								(atributoUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Atributos if not signed in', function(done) {
		// Create new Atributo model instance
		var atributoObj = new Atributo(atributo);

		// Save the Atributo
		atributoObj.save(function() {
			// Request Atributos
			request(app).get('/atributos')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Atributo if not signed in', function(done) {
		// Create new Atributo model instance
		var atributoObj = new Atributo(atributo);

		// Save the Atributo
		atributoObj.save(function() {
			request(app).get('/atributos/' + atributoObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', atributo.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Atributo instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Atributo
				agent.post('/atributos')
					.send(atributo)
					.expect(200)
					.end(function(atributoSaveErr, atributoSaveRes) {
						// Handle Atributo save error
						if (atributoSaveErr) done(atributoSaveErr);

						// Delete existing Atributo
						agent.delete('/atributos/' + atributoSaveRes.body._id)
							.send(atributo)
							.expect(200)
							.end(function(atributoDeleteErr, atributoDeleteRes) {
								// Handle Atributo error error
								if (atributoDeleteErr) done(atributoDeleteErr);

								// Set assertions
								(atributoDeleteRes.body._id).should.equal(atributoSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Atributo instance if not signed in', function(done) {
		// Set Atributo user 
		atributo.user = user;

		// Create new Atributo model instance
		var atributoObj = new Atributo(atributo);

		// Save the Atributo
		atributoObj.save(function() {
			// Try deleting Atributo
			request(app).delete('/atributos/' + atributoObj._id)
			.expect(401)
			.end(function(atributoDeleteErr, atributoDeleteRes) {
				// Set message assertion
				(atributoDeleteRes.body.message).should.match('User is not logged in');

				// Handle Atributo error error
				done(atributoDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Atributo.remove().exec();
		done();
	});
});