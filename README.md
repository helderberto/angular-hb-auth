# HB Auth Interceptor

This is a simple Angular Auth Token interceptor.

## How to Install

```
$ npm install --save-dev angular-hb-auth
$ bower install angular-hb-auth
```

## How to Use

This module is an simple way to make login token based.

### Below is an example of how to use it with angular:

Load module in your `app.js`, and set the configurations:
```
  angular
    .module('yourApp', ['hbAuth'])
    .run(['$state', '$rootScope', '$http', 'hbAuth.auth', function ( $state, $rootScope, $http, AuthService) {

      AuthService.setConfig({
        loginRedirect: '/login',
        loggedInRedirect: '/dashboard',
        headerToken: 'Authorization'
      });

      $rootScope.$on("$stateChangeStart", function(event, next, nextParams, fromState) {
        if (!AuthService.isLoggedIn()) {
          if (next.name !== "login") {
            event.preventDefault();
            $state.go('login');
          }
        }
      });
    }]);
```
**NOTE** 
If you don't want to set config, default values are:
```
  angular
    .module('hbAuth', [])
    .value('hbAuth.config', {
      loginRedirect: '/signin',
      loggedInRedirect: '/menu',
      headerToken: 'Authorization'
    });
```

Push the authInterceptor to interceptors in your `routes.js`:

```
  angular
  .module('yourApp')
    .config(['$httpProvider', function ($httpProvider) {

      $httpProvider.interceptors.push('hbAuth.authInterceptor');
    }]);
```