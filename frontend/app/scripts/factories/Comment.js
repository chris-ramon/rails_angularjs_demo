'use strict';

angular.module('frontendApp')
    .factory('Comment', function ($resource) {
        return $resource('http://0.0.0.0:3000/posts/:postId/comments/:id',
            {id: '@id', postId: '@postId'}, {update: {method: 'PUT'}}
        );
    });