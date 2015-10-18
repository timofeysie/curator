'use strict';

angular.module('artCurator.curatorDirective', [])
  .directive('artistDirective', function () {
  	return function(scope, elm, attrs) {
    	elm.text(version);
  	};
  });

