var beaconsAdminApp = angular.module('beaconsAdminApp', ['ui.router', 'ngResource']);

beaconsAdminApp.config(function($provide, $stateProvider, $urlRouterProvider, $httpProvider) {
    //$httpProvider.interceptors.push('AuthInterceptor')
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: "views/main.html",
            controller: 'MainCtrl'
        })
        .state('beacons', {
            url: '/beacons',
            templateUrl: "views/beacons.html",
            controller: 'BeaconsCtrl'
        })
        .state('contents', {
            url: '/contents',
            templateUrl: "views/contents.html",
            controller: 'ContentsCtrl'
        });
    });
beaconsAdminApp.constant('serverUri', 'http://localhost:3000/')