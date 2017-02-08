'use strict';

angular
  .module('hbAuth')
  .service('hbAuth.auth', auth);

auth.$inject = [
  '$localStorage',
  'hbAuth.config'
];

function auth($localStorage, configAuth) {

  var output = {};

  /**
   * Check if token exists
   * 
   * @returns {boolean}
   */
  output.isLoggedIn = function() {

    return ($localStorage.authToken ? true : false);
  };

  /**
   * Set the params to:
   * loginRedirect: {url}
   * loggedInRedirect: {url}
   * headerToken: {token}
   * 
   * Defaults:
   * loginRedirect: '/signin'
   * loggedInRedirect: '/menu'
   * headerToken: 'Authorization'
   * 
   * @param {object} config
   */
  output.setConfig = function(config) {

    configAuth = angular.extend(configAuth, config);
  };

  return output;

}