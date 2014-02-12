'use strict';

angular.module('frontendApp')
  .factory('Upload', function ($resource, UploadUrls) {
    return $resource(UploadUrls.resourceUrl,
      {id: '@id', postId: '@postId'},
      {query: {method:'GET', isArray: false}}
    );
  });