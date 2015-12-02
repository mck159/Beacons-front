var beaconsAdminApp = angular.module('beaconsAdminApp', ['ui.router', 'ngResource', 'ngCookies', 'ui.bootstrap']);



beaconsAdminApp.factory('unauthInterceptor', function ($q) {
    return {
        responseError: function (response) {
            if(response.status == 401) {
                var url = window.location.href;
                window.location.href = url.substring(0, url.indexOf("#") + 2) + "login?redirect=true";
            }
            return $q.reject(response);
        }
    };
});

beaconsAdminApp.config(function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.interceptors.push('unauthInterceptor');
});

beaconsAdminApp.config(function($provide, $stateProvider, $urlRouterProvider, $httpProvider) {
    //$httpProvider.interceptors.push('AuthInterceptor')
    $urlRouterProvider.otherwise('/beacons');
    $stateProvider
        .state('beacons', {
            url: '/beacons',
            templateUrl: "views/beacons.html",
            controller: 'BeaconsCtrl',

        })
        .state('contents', {
            url: '/contents',
            templateUrl: "views/contents.html",
            controller: 'ContentsCtrl'
        })
        .state('register', {
            url: '/register',
            templateUrl: "views/register.html",
            controller: 'RegisterCtrl'
        })
        .state('login', {
            url: '/login?registerRedirect',
            templateUrl: "views/login.html",
            controller: 'LoginCtrl'
        })
        .state('logout', {
            url: '/logout',
            controller: 'LogoutCtrl'
        });
    });
beaconsAdminApp.constant('serverUri', 'http://localhost:3000/api/')

beaconsAdminApp.service('Page', function($rootScope){
    return {
        setTitle: function(title){
            $rootScope.title = title;
        }
    }
});