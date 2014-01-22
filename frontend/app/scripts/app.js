'use strict';

angular.module('frontendApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/new', {
        templateUrl: 'views/postForm.html',
        controller: 'PostNewCtrl'
      })
      .when('/detail/:id', {
        templateUrl: 'views/postDetail.html',
        controller: 'PostDetailCtrl'
      })
      .when('/edit/:id', {
        templateUrl: 'views/postForm.html',
        controller: 'PostEditCtrl'
      })
      .when('/delete/:id', {
        templateUrl: 'views/postDelete.html',
        controller: 'PostDeleteCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
