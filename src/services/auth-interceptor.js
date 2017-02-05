angular
  .module('hbAuth')
  .service('hbAuth.authInterceptor', authInterceptor);

authInterceptor.$inject = [
  '$location',
  '$localStorage',
  '$q',
  'CONFIG'
];

function authInterceptor($location, $localStorage, $q, CONFIG) {

  var interceptor = {};

  interceptor.response = function(response) {

    var token = response.data.token;

    if (token) {
      $localStorage.auth_token = token;
      $location.path(CONFIG.loggedInRedirect);
    }
    return response;
  };

  interceptor.request = function(config) {

    config.headers = config.headers || {};

    if ($localStorage.token) {
      config.headers[CONFIG.headerToken] = $localStorage.token;
    }
    return config;
  };

  interceptor.responseError = function(rejection) {

    if ((rejection !== null && rejection.status === 401)) {
      delete $localStorage.token;
      $location.path(CONFIG.loginRedirect);
    }
    return $q.reject(rejection);
  };

  return interceptor;
}