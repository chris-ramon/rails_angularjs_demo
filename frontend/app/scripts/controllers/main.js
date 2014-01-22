'use strict';

angular.module('frontendApp')
  .controller('MainCtrl', function ($scope, Post) {
    $scope.posts = Post.query();
  })
  .controller('PostNewCtrl', function($scope, Post) {
    $scope.post = {};
    $scope.flashMessage = '';

    $scope.save = function() {
      Post.save({post: $scope.post}, function(response) {
        $scope.flashMessage = 'Post was successfully created!';
        $scope.post = {};
      }, function(response) {
        $scope.flashMessage = response.data;
      })
    }
  })
  .controller('PostDetailCtrl', function($scope, $routeParams, Post) {
    $scope.post = Post.get({id: $routeParams.id});
  })
  .controller('PostEditCtrl', function($scope, $routeParams, Post) {
    $scope.post = Post.get({id: $routeParams.id});
    $scope.save = function() {
      Post.update({id: $scope.post.id, post: $scope.post}, function() {
        $scope.flashMessage = 'Post was successfully updated!';
      }, function(response) {
        $scope.flashMessage = response.data;
      });
    }
  })
  .controller('PostDeleteCtrl', function($scope, $routeParams, Post, $location) {
    $scope.post = Post.get({id: $routeParams.id});
    $scope.delete = function() {
      Post.delete({id: $scope.post.id}, function() {
        $location.path('/');
      }, function(response) {
        $scope.flashMessage = 'We could not delete this post!';
      });

    }
  });
