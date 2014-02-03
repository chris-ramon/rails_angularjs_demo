'use strict';

angular.module('frontendApp')
  .service('PageService', function() {
    var self = this;
    self.currentPage = 'home';
  });