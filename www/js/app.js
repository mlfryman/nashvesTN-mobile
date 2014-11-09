angular.module('gp-nashvesTN', ['ionic', 'gp-nashvesTN.controllers', 'LocalStorageModule'])

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
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })

    .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html',
          controller: 'BrowseCtrl'
        }
      }
    })

    .state('app.dashboard', {
      url: '/dashboard',
      views: {
        'menuContent': {
          templateUrl: 'templates/dashboard.html',
          controller: 'DashboardCtrl'
        }
      }
    })

    .state('app.help', {
      url: '/help',
      views: {
        'menuContent': {
          templateUrl: 'templates/help.html',
          controller: 'HelpCtrl'
        }
      }
    })

    .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html',
          controller: 'ProfileCtrl'
        }
      }
    })

    .state('app.donate', {
      url: '/donate/:doneeId',
      views: {
        'menuContent': {
          templateUrl: 'templates/donate.html',
          controller: 'DonateCtrl'
        }
      }
    })

    .state('app.thanks', {
      url: '/thanks',
      views: {
        'menuContent': {
          templateUrl: 'templates/thanks.html',
          controller: 'ThanksCtrl'
        }
      }
    })

    .state('app.dShow', {
      url: '/donee/:doneeId',
      views: {
        'menuContent': {
          templateUrl: 'templates/dShow.html',
          controller: 'DoneeCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
})
.value('apiBaseUrl', 'http://nashvestn.herokuapp.com/api/')
.value('baseUrl', 'http://nashvestn.herokuapp.com/')
.factory('OauthLoginService', function($window, localStorageService, baseUrl){
  'use strict';

  var loginWindow, token, hasToken, userId, hasUserId;

  return{
    login: function(provider){
      console.log(baseUrl + 'auth/' + provider);
      loginWindow = $window.open(baseUrl + 'auth/' + provider, '_blank', 'location=no');
      loginWindow.addEventListener('loadstart', function(event){
          hasToken = event.url.indexOf('?oauth_token=');
          hasUserId = event.url.indexOf('&userId=');
        if(hasToken > -1 && hasUserId > -1){
          console.log(token);
          token = event.url.match('oauth_token=(.*)&userId')[1];
          userId = event.url.match('&userId=(.*)')[1];
          //localStorageService.set('oauth-token', token);
          //localStorageService.set('token-date', JSON.stringify(new Date()));
          //localStorageService.set('userId', userId);
          loginWindow.close();
          location.href=location.pathname;
        }
      });
    }
  };
});
