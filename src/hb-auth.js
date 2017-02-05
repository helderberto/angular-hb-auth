angular
  .module('hbAuth', [])
  .constant('CONFIG', {
    loginRedirect: '/signin',
    loggedInRedirect: '/menu',
    headerToken: 'Authorization'
  });