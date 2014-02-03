'use strict';
var success_json = {success: 'OK'};
var current_user_json = {email: 'yeoman@gmail.com'};
var userFom = {email: 'yeoman@gmail.com', password: '123'};

describe('UserService', function() {
  var $httpBackend;

  beforeEach(module('frontendApp'));
  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenPOST('http://0.0.0.0:3000/users/sign_in').respond(current_user_json);
    $httpBackend.whenDELETE('http://0.0.0.0:3000/users/sign_out').respond(success_json);
    $httpBackend.whenGET('http://0.0.0.0:3000/users/current_user').respond(current_user_json);
  }));

  describe('signIn', function() {
    it('should set current user', inject(function(UserService) {
      UserService.signIn(userFom);
      $httpBackend.flush();
      expect(UserService.currentUser).toBeDefined();
    }));
  });
  
  describe('signOut', function() {
    it('should set currentUser to null', inject(function(UserService) {
      UserService.signOut();
      $httpBackend.flush();
      expect(UserService.currentUser).toBe(null);
    }));
  });

  describe('setCurrentUser', function() {
    it('should set current user information', inject(function(UserService) {
      UserService.setCurrentUser();
      $httpBackend.flush();
      expect(UserService.currentUser).toBeDefined();
      expect(UserService.currentUser.email).toBe('yeoman@gmail.com');
    }));
  })
});