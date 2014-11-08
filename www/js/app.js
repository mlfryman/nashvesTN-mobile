angular.module('gp-nashvesTN', ['ionic', 'gp-nashvesTN.controllers'])

.run(function($ionicPlatform){
  'use strict';

  $ionicPlatform.ready(function(){
    if(window.cordova && window.cordova.plugins.Keyboard){
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar){
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
  'use strict';

  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.home', {
      url: '/',
      templateUrl: 'templates/home.html',
      controller: 'HomeCtrl'
    })

    .state('app.browse', {
      url: '/browse',
      templateUrl: 'templates/browse.html',
      controller: 'BrowseCtrl'
    })

    .state('app.dashboard', {
      url: '/dashboard',
      templateUrl: 'templates/search.html',
      controller: 'AppCtrl'
    })

    .state('app.help', {
      url: '/help',
      templateUrl: 'templates/help.html',
      controller: 'HelpCtrl'
    })

    .state('app.profile', {
      url: '/profile',
      templateUrl: 'templates/profile.html',
      controller: 'ProfileCtrl'
    })

    .state('app.dShow', {
      url: '/donee/:doneeId',
      templateUrl: 'templates/search.html',
      controller: 'AppCtrl'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
