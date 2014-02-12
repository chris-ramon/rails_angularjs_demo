'use strict';


angular.module('frontendApp').value('UploadUrls', {
  resourceUrl: 'http://0.0.0.0:3000/posts/:postId/uploads/:id',
  basicUrl: 'http://0.0.0.0:3000/posts/:postId/uploads/'
});