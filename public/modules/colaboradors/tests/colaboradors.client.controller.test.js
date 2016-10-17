'use strict';

(function() {
	// Colaboradors Controller Spec
	describe('Colaboradors Controller Tests', function() {
		// Initialize global variables
		var ColaboradorsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Colaboradors controller.
			ColaboradorsController = $controller('ColaboradorsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Colaborador object fetched from XHR', inject(function(Colaboradors) {
			// Create sample Colaborador using the Colaboradors service
			var sampleColaborador = new Colaboradors({
				name: 'New Colaborador'
			});

			// Create a sample Colaboradors array that includes the new Colaborador
			var sampleColaboradors = [sampleColaborador];

			// Set GET response
			$httpBackend.expectGET('colaboradors').respond(sampleColaboradors);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.colaboradors).toEqualData(sampleColaboradors);
		}));

		it('$scope.findOne() should create an array with one Colaborador object fetched from XHR using a colaboradorId URL parameter', inject(function(Colaboradors) {
			// Define a sample Colaborador object
			var sampleColaborador = new Colaboradors({
				name: 'New Colaborador'
			});

			// Set the URL parameter
			$stateParams.colaboradorId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/colaboradors\/([0-9a-fA-F]{24})$/).respond(sampleColaborador);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.colaborador).toEqualData(sampleColaborador);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Colaboradors) {
			// Create a sample Colaborador object
			var sampleColaboradorPostData = new Colaboradors({
				name: 'New Colaborador'
			});

			// Create a sample Colaborador response
			var sampleColaboradorResponse = new Colaboradors({
				_id: '525cf20451979dea2c000001',
				name: 'New Colaborador'
			});

			// Fixture mock form input values
			scope.name = 'New Colaborador';

			// Set POST response
			$httpBackend.expectPOST('colaboradors', sampleColaboradorPostData).respond(sampleColaboradorResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Colaborador was created
			expect($location.path()).toBe('/colaboradors/' + sampleColaboradorResponse._id);
		}));

		it('$scope.update() should update a valid Colaborador', inject(function(Colaboradors) {
			// Define a sample Colaborador put data
			var sampleColaboradorPutData = new Colaboradors({
				_id: '525cf20451979dea2c000001',
				name: 'New Colaborador'
			});

			// Mock Colaborador in scope
			scope.colaborador = sampleColaboradorPutData;

			// Set PUT response
			$httpBackend.expectPUT(/colaboradors\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/colaboradors/' + sampleColaboradorPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid colaboradorId and remove the Colaborador from the scope', inject(function(Colaboradors) {
			// Create new Colaborador object
			var sampleColaborador = new Colaboradors({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Colaboradors array and include the Colaborador
			scope.colaboradors = [sampleColaborador];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/colaboradors\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleColaborador);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.colaboradors.length).toBe(0);
		}));
	});
}());