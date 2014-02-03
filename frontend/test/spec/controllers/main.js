'use strict';
var success_json = {success: 'OK'};
var error_json = {failed: 'FAILED'};
var current_user_json = {email: 'yeoman@gmail.com'};
var userFom = {email: 'yeoman@gmail.com', password: '123'};

describe('Controllers', function () {
  var SignInCtrl, scope, $rootScope, $controller, $location, $httpBackend;

  beforeEach(module('frontendApp'));
  beforeEach(inject(function ($injector) {
    $rootScope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');
    $location = $injector.get('$location');
    $httpBackend = $injector.get('$httpBackend');
    scope = $rootScope.$new();
  }));

  describe('SignInCtrl', function() {
    beforeEach(function() {
      $controller('SignInCtrl', {$scope: scope});
    });

    it('should have userForm object defined', function() {
      expect(scope.userForm).toBeDefined();
    });

    it('should redirect to home after sign in', function() {
      $httpBackend.whenPOST('http://0.0.0.0:3000/users/sign_in').respond(200, success_json);
      scope.signIn(userFom);
      $httpBackend.flush();
      expect($location.url()).toEqual('/');
    });

    it('should set flashMessage when error', function() {
      $httpBackend.whenPOST('http://0.0.0.0:3000/users/sign_in').respond(422, error_json);
      scope.signIn(userFom);
      $httpBackend.flush();
      expect(scope.flashMessage).toBeDefined();
    })
  });
});
