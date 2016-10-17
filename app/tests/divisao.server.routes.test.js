'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Divisao = mongoose.model('Divisao'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, divisao;

/**
 * Divisao routes tests
 */
describe('Divisao CRUD tests', function() {
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

		// Save a user to the test db and create new Divisao
		user.save(function() {
			divisao = {
				name: 'Divisao Name'
			};

			done();
		});
	});

	it('should be able to save Divisao instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Divisao
				agent.post('/divisaos')
					.send(divisao)
					.expect(200)
					.end(function(divisaoSaveErr, divisaoSaveRes) {
						// Handle Divisao save error
						if (divisaoSaveErr) done(divisaoSaveErr);

						// Get a list of Divisaos
						agent.get('/divisaos')
							.end(function(divisaosGetErr, divisaosGetRes) {
								// Handle Divisao save error
								if (divisaosGetErr) done(divisaosGetErr);

								// Get Divisaos list
								var divisaos = divisaosGetRes.body;

								// Set assertions
								(divisaos[0].user._id).should.equal(userId);
								(divisaos[0].name).should.match('Divisao Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Divisao instance if not logged in', function(done) {
		agent.post('/divisaos')
			.send(divisao)
			.expect(401)
			.end(function(divisaoSaveErr, divisaoSaveRes) {
				// Call the assertion callback
				done(divisaoSaveErr);
			});
	});

	it('should not be able to save Divisao instance if no name is provided', function(done) {
		// Invalidate name field
		divisao.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Divisao
				agent.post('/divisaos')
					.send(divisao)
					.expect(400)
					.end(function(divisaoSaveErr, divisaoSaveRes) {
						// Set message assertion
						(divisaoSaveRes.body.message).should.match('Please fill Divisao name');
						
						// Handle Divisao save error
						done(divisaoSaveErr);
					});
			});
	});

	it('should be able to update Divisao instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Divisao
				agent.post('/divisaos')
					.send(divisao)
					.expect(200)
					.end(function(divisaoSaveErr, divisaoSaveRes) {
						// Handle Divisao save error
						if (divisaoSaveErr) done(divisaoSaveErr);

						// Update Divisao name
						divisao.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Divisao
						agent.put('/divisaos/' + divisaoSaveRes.body._id)
							.send(divisao)
							.expect(200)
							.end(function(divisaoUpdateErr, divisaoUpdateRes) {
								// Handle Divisao update error
								if (divisaoUpdateErr) done(divisaoUpdateErr);

								// Set assertions
								(divisaoUpdateRes.body._id).should.equal(divisaoSaveRes.body._id);
								(divisaoUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Divisaos if not signed in', function(done) {
		// Create new Divisao model instance
		var divisaoObj = new Divisao(divisao);

		// Save the Divisao
		divisaoObj.save(function() {
			// Request Divisaos
			request(app).get('/divisaos')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Divisao if not signed in', function(done) {
		// Create new Divisao model instance
		var divisaoObj = new Divisao(divisao);

		// Save the Divisao
		divisaoObj.save(function() {
			request(app).get('/divisaos/' + divisaoObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', divisao.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Divisao instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Divisao
				agent.post('/divisaos')
					.send(divisao)
					.expect(200)
					.end(function(divisaoSaveErr, divisaoSaveRes) {
						// Handle Divisao save error
						if (divisaoSaveErr) done(divisaoSaveErr);

						// Delete existing Divisao
						agent.delete('/divisaos/' + divisaoSaveRes.body._id)
							.send(divisao)
							.expect(200)
							.end(function(divisaoDeleteErr, divisaoDeleteRes) {
								// Handle Divisao error error
								if (divisaoDeleteErr) done(divisaoDeleteErr);

								// Set assertions
								(divisaoDeleteRes.body._id).should.equal(divisaoSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Divisao instance if not signed in', function(done) {
		// Set Divisao user 
		divisao.user = user;

		// Create new Divisao model instance
		var divisaoObj = new Divisao(divisao);

		// Save the Divisao
		divisaoObj.save(function() {
			// Try deleting Divisao
			request(app).delete('/divisaos/' + divisaoObj._id)
			.expect(401)
			.end(function(divisaoDeleteErr, divisaoDeleteRes) {
				// Set message assertion
				(divisaoDeleteRes.body.message).should.match('User is not logged in');

				// Handle Divisao error error
				done(divisaoDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Divisao.remove().exec();
		done();
	});
});