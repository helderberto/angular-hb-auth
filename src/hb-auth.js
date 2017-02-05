'use strict';

angular
  .module('hbAuth', [])
  .value('hbAuth.config', {
    loginRedirect: '/signin',
    loggedInRedirect: '/menu',
    headerToken: 'Authorization'
  });