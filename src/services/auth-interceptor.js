'use strict';

angular
  .module('hbAuth')
  .service('hbAuth.authInterceptor', authInterceptor);

authInterceptor.$inject = [
  '$location',
  '$localStorage',
  '$q',
  'hbAuth.config'
];

function authInterceptor($location, $localStorage, $q, configAuth) {

  var interceptor = {};

  interceptor.response = function(response) {
    var token = response.data.token;

    if (token) {
      $localStorage.authToken = token;
      $localStorage.user = JSON.stringify(response.data.data);
      
      $location.path(configAuth.loggedInRedirect);
    }
    return response;
  };

  interceptor.request = function(config) {

    config.headers = config.headers || {};

    if ($localStorage.authToken) {
      config.headers[configAuth.headerToken] = 'Bearer ' + $localStorage.authToken;
    }
    return config;
  };

  interceptor.responseError = function(rejection) {

    if ((rejection !== null && rejection.status === 401)) {
      delete $localStorage.authToken;
      $location.path(configAuth.loginRedirect);
    }
    return $q.reject(rejection);
  };

  return interceptor;
}