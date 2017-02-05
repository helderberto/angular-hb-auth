'use strict';

angular
  .module('hbAuth', [])
  .value('configAuth', {
    loginRedirect: '/signin',
    loggedInRedirect: '/menu',
    headerToken: 'Authorization'
  });