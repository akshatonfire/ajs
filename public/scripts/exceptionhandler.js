(function () {
  'use strict';


  angular.module('exceptionOverwrite', []).
    factory('$exceptionHandler', ['$log', function($log) {
      return function myExceptionHandler(exception, cause) {
        exception.message;
        alert(exception.message);
        $log.error(exception, cause);
      };
  }]);


})();
