/**
 *
 * @license The Unlicense, http://unlicense.org/
 * @author  Helder Burato Berto <helder.burato@gmail.com>, https://github.com/helderburato/angular-hb-auth.git
 *
 */

'use strict';

angular
  .module('hbAuth')
  .service('hbAuth.authInterceptor', authInterceptor)

authInterceptor.$inject = [
  '$location',
  '$localStorage',
  '$q',
  'hbAuth.config'
]

/**
 * 
 * 
 * @param {any} $location
 * @param {any} $localStorage
 * @param {any} $q
 * @param {any} configAuth
 * @returns
 */
function authInterceptor ($location, $localStorage, $q, configAuth) {
  var interceptor = {}

  /**
   * Check if token are present in the $localStorage, to return token and user
   * 
   * @param {object} response Response objects of the requests
   * @returns {object} response With token and user in the $localStorage
   */
  interceptor.response = function (response) {
    var token = response.data.token;

    if (token) {
      $localStorage.authToken = token
      $localStorage.user = JSON.stringify(response.data.data);

      $location.path(configAuth.loggedInRedirect);
    }
    return response;
  }

  /**
   * Insert the token in the headers
   * 
   * @param {object} config
   * @returns {object} config Token in headers
   */
  interceptor.request = function (config) {
    config.headers = config.headers || {};

    if ($localStorage.authToken) {
      config.headers[configAuth.headerToken] = 'Bearer ' + $localStorage.authToken;
    }
    return config
  }
  
  /**
   * If user are not authorized to access reject and delete the token
   * 
   * @param {object} rejection Object response with errors
   * @returns {oject} Promisse with errors
   */
  interceptor.responseError = function (rejection) {
    if ((rejection !== null && rejection.status === 401)) {
      delete $localStorage.authToken;
      $location.path(configAuth.loginRedirect);
    }
    return $q.reject(rejection);
  }

  return interceptor
}
