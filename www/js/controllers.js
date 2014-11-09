angular.module('gp-nashvesTN.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout){
  'use strict';

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal){
    $scope.modal = modal;
  });

  $scope.scan = function(){
    console.log('scan!');
    cordova.plugins.barcodeScanner.scan(
      function(result){
        alert('We got a barcode\n' +
          'Result: ' + result.text + '\n' +
          'Format: ' + result.format + '\n' +
          'Cancelled: ' + result.cancelled);
      },

      function(error){
        alert('Scanning failed: ' + error);
      }
    );
  };

  // Triggered in the login modal to close it
  $scope.closeLogin = function(){
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function(){
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function(){
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function(){
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('HomeCtrl', function($scope){
  'use strict';
})

.controller('BrowseCtrl', function($scope, $http, apiBaseUrl, $state){
  'use strict';
    $http.get(apiBaseUrl + 'donees/').then(function(response){
      $scope.donees= response.data;
      console.log(response.data);
    });
    $scope.details = function(id){
      $state.go('app.dShow', {doneeId:id});

    };
})

.controller('DashboardCtrl', function($scope, $http, apiBaseUrl){
  'use strict';
  $http.get(apiBaseUrl + 'patrons/:id').then(function(response){

  });
})

.controller('HelpCtrl', function($scope, $ionicSlideBoxDelegate){
  'use strict';
  $scope.nextSlide = function(){
    $ionicSlideBoxDelegate.next();
  };
})

.controller('ProfileCtrl', function($scope){
  'use strict';
})

.controller('DoneeCtrl', function($scope, $ionicSlideBoxDelegate, $http, apiBaseUrl, $stateParams){
  'use strict';

  $scope.nextSlide = function(){
    $ionicSlideBoxDelegate.next();
  };

  $http.get(apiBaseUrl + 'donees/' + $stateParams.doneeId).then(function(response){
    $scope.donee = response.data;
    console.log($scope.donee);
  });
});
