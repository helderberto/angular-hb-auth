/**
 *
 * @license The Unlicense, http://unlicense.org/
 * @author  Helder Burato Berto <helder.burato@gmail.com>, https://github.com/helderburato/angular-hb-auth.git
 *
 */

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
   * Remove token from $localStorage
   * 
   * @returns {boolean} Removed token
   */
  output.logout = function() {
    delete $localStorage.authToken;
    delete $localStorage.user;

    return true;
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
  
  /**
   * Return the Auth configs
   * 
   * @returns {object} Auth config object
   */
  output.getConfig = function() {

    return configAuth;
  };

  /**
   * Check if not empty {$localStorage.user} and return object with logged in user
   * 
   * @returns {object} Auth config object
   */
  output.getUser = function() {

    var user = {};

    if ($localStorage.user) {
      user = JSON.parse($localStorage.user);
    }
    return user;
  };

  return output;

}