'use strict';

angular.module("template/modal/backdrop.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/modal/backdrop.html",
    "<div class=\"modal-backdrop fade\" ng-class=\"{in: animate}\" ng-style=\"{\'z-index\': 1040 + index*10}\"></div>");
}]);

angular.module("template/modal/window.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/modal/window.html",
    "<div tabindex=\"-1\" class=\"modal fade {{ windowClass }}\" ng-class=\"{in: animate}\" ng-style=\"{\'z-index\': 1050 + index*10, display: \'block\'}\" ng-click=\"close($event)\">\n    <div class=\"modal-dialog\"><div class=\"modal-content\" ng-transclude></div></div>\n</div>");
}]);

angular.module('frontendApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap.modal',
  'blueimp.fileupload',
  'template/modal/backdrop.html',
  'template/modal/window.html'
])
  .config(function ($routeProvider, $httpProvider, fileUploadProvider) {
    // so we can send the cookies for auth
    $httpProvider.defaults.withCredentials = true;

    // this is used by fileupload plugin
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    fileUploadProvider.defaults.redirect = window.location.href.replace(
      /\/[^\/]*$/,
      '/cors/result.html?%s'
    );
    // END this is used by fileupload plugin

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
      .when('/post/:id/uploads', {
        templateUrl: 'views/postUploads.html',
        controller: 'PostUploadCtrl'
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


