'use strict';

angular.module('frontendApp')
  .controller('HeaderCtrl', function($scope, PageService,
                                     UserService, $location, $route) {
    $scope.currentPage = function(page) {
      return page == PageService.currentPage;
    }
    $scope.UserService = UserService;
    $scope.signOut = function() {
      UserService.signOut().success(function() { $route.reload(); });
    }
    UserService.setCurrentUser();
  })
  .controller('MainCtrl', function ($scope, Post, PageService) {
    PageService.currentPage = 'home';
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
  .controller('PostDetailCtrl', function($scope, $routeParams, Post, Comment) {
    $scope.comment = null;
    Post.get({id: $routeParams.id}, function(response) {
        $scope.post = response;
        $scope.comments = Comment.query({postId: $scope.post.id});
    }, function() {
        $scope.flashMessage =  'Post does not exist!';
    });

    $scope.saveComment = function() {
      if($scope.comment) {
        $scope.comments.push($scope.comment);
        Comment.save({comment: $scope.comment, postId: $scope.post.id}, function() {
          $scope.flashMessage = 'Comment was successfully added!';
          $scope.comment = {};
        }, function(response) {
          $scope.flashMessage = response.data;
        });
      }
    }
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
  })
  .controller('SignInCtrl', function($scope, PageService, UserService, $location) {
    PageService.currentPage = 'signin';
    $scope.userForm = {};
    $scope.signIn = function() {
      UserService.signIn($scope.userForm)
        .success(function() {
          $location.path('/');
        })
        .error(function() {
          $scope.flashMessage = 'Email or Password incorrect!.'
        });
    }
  })
  .controller('DemoFileUploadController', [
    '$scope', '$http', '$filter', '$window', function ($scope, $http) {
      var url = 'http://0.0.0.0:3000/file-upload';
      $scope.options = { url: url };
      $scope.loadingFiles = true;
      $http.get(url)
        .then(
        function (response) {
          $scope.loadingFiles = false;
          $scope.queue = response.data.files || [];
        },
        function () {
          $scope.loadingFiles = false;
        }
      );
    }
  ])
  .controller('FileDestroyController', [
    '$scope', '$http',
    function ($scope, $http) {
      var file = $scope.file,
        state;
      if (file.url) {
        file.$state = function () {
          return state;
        };
        file.$destroy = function () {
          state = 'pending';
          return $http({
            url: file.deleteUrl,
            method: file.deleteType
          }).then(
            function () {
              state = 'resolved';
              $scope.clear(file);
            },
            function () {
              state = 'rejected';
            }
          );
        };
      } else if (!file.$cancel && !file._index) {
        file.$cancel = function () {
          $scope.clear(file);
        };
      }
    }]);
