'use strict';

(function() {
	// Atributos Controller Spec
	describe('Atributos Controller Tests', function() {
		// Initialize global variables
		var AtributosController,
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

			// Initialize the Atributos controller.
			AtributosController = $controller('AtributosController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Atributo object fetched from XHR', inject(function(Atributos) {
			// Create sample Atributo using the Atributos service
			var sampleAtributo = new Atributos({
				name: 'New Atributo'
			});

			// Create a sample Atributos array that includes the new Atributo
			var sampleAtributos = [sampleAtributo];

			// Set GET response
			$httpBackend.expectGET('atributos').respond(sampleAtributos);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.atributos).toEqualData(sampleAtributos);
		}));

		it('$scope.findOne() should create an array with one Atributo object fetched from XHR using a atributoId URL parameter', inject(function(Atributos) {
			// Define a sample Atributo object
			var sampleAtributo = new Atributos({
				name: 'New Atributo'
			});

			// Set the URL parameter
			$stateParams.atributoId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/atributos\/([0-9a-fA-F]{24})$/).respond(sampleAtributo);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.atributo).toEqualData(sampleAtributo);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Atributos) {
			// Create a sample Atributo object
			var sampleAtributoPostData = new Atributos({
				name: 'New Atributo'
			});

			// Create a sample Atributo response
			var sampleAtributoResponse = new Atributos({
				_id: '525cf20451979dea2c000001',
				name: 'New Atributo'
			});

			// Fixture mock form input values
			scope.name = 'New Atributo';

			// Set POST response
			$httpBackend.expectPOST('atributos', sampleAtributoPostData).respond(sampleAtributoResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Atributo was created
			expect($location.path()).toBe('/atributos/' + sampleAtributoResponse._id);
		}));

		it('$scope.update() should update a valid Atributo', inject(function(Atributos) {
			// Define a sample Atributo put data
			var sampleAtributoPutData = new Atributos({
				_id: '525cf20451979dea2c000001',
				name: 'New Atributo'
			});

			// Mock Atributo in scope
			scope.atributo = sampleAtributoPutData;

			// Set PUT response
			$httpBackend.expectPUT(/atributos\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/atributos/' + sampleAtributoPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid atributoId and remove the Atributo from the scope', inject(function(Atributos) {
			// Create new Atributo object
			var sampleAtributo = new Atributos({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Atributos array and include the Atributo
			scope.atributos = [sampleAtributo];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/atributos\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAtributo);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.atributos.length).toBe(0);
		}));
	});
}());