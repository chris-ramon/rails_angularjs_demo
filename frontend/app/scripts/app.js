'use strict';

angular.module('frontendApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'blueimp.fileupload'
])
  .config(function ($routeProvider, $httpProvider, fileUploadProvider) {
    $httpProvider.defaults.withCredentials = true;

    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    fileUploadProvider.defaults.redirect = window.location.href.replace(
      /\/[^\/]*$/,
      '/cors/result.html?%s'
    );

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
      .when('/sign_in', {
        templateUrl: 'views/sign_in.html',
        controller: 'SignInCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
