console.log('loading interceptor');
beaconsAdminApp.service('AuthInterceptor', function() {
    this.request = function(config) {
        console.log('intercepting');
        config.headers["X-User"] = "maciek";
        return config;
    };
});