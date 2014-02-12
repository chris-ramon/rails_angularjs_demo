'use strict';

angular.module('frontendApp')
  .service('PostService', function () {
    var self = this;
    self.post = {
      uploads: []
    };
    self.clean = function() {
      self.post = {
        uploads: []
      }
    }
  });