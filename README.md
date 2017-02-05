# HB AUTH TOKEN INTERCEPTOR

This is a simple Angular Auth Token interceptor.

## How to Use

1. Download via `npm install --save-dev angular-hb-auth`;
2. Load in your app.js or your main angular file;
3. In your routes add the new interceptor from plugin: `$httpProvider.interceptors.push('hbAuth.authInterceptor')`;
4. Now, if your API are sending the token the correct way, this will be set in your header "Authorization";