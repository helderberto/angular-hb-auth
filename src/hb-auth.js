/**
 *
 * @license The Unlicense, http://unlicense.org/
 * @author  Helder Burato Berto <helder.burato@gmail.com>, https://github.com/helderburato/angular-hb-auth.git
 *
 */

'use strict';

angular
  .module('hbAuth', [])
  .value('hbAuth.config', {
    loginRedirect: '/signin',
    loggedInRedirect: '/menu',
    headerToken: 'Authorization'
  });