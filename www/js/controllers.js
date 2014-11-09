/* global StripeCheckout, Stripe */

angular.module('gp-nashvesTN.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, OauthLoginService){
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

  $scope.authGoogle = function(){
    console.log('google');
    OauthLoginService.login('google');
  };

  $scope.authFacebook = function(){
    console.log('facebook');
    OauthLoginService.login('facebook');
  };

  $scope.authTwitter = function(){
    console.log('twitter');
    OauthLoginService.login('twitter');
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
  /*$http.get(apiBaseUrl + 'patrons/:id').then(function(response){

  });*/
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

.controller('DoneeCtrl', function($scope, $stateParams, $ionicModal, $ionicSlideBoxDelegate, $http, apiBaseUrl, $state){
  'use strict';

  $scope.android = window.device && window.device.platform.toLowerCase() === 'android';

  var stripeConfig = {
        key: 'pk_test_UKMfyVX6ix2ImBTaTpDqASgl',
        image: '../img/ionic.png',
        token: stripeCb
      },
      stripeOptions = {
        name: 'Demo Site',
        description: '2 widgets ($20.00)',
        amount: 2000
      },
      handler = StripeCheckout.configure(stripeConfig);
      //ref = window.open('', '_system', 'location=yes');

  $scope.openDonate = function(){
    $state.go('app.donate');
  };

  $scope.donate = function(){
    if(window.device && window.device.platform.toLowerCase() === 'android'){
      // failed attempt to run stripe in system window //
      var ref = window.open('https://checkout.stripe.com/v3', '_system', 'location=yes');
      ref.executeScript({code: handler.open(stripeOptions)});
    }else{
      handler.open(stripeOptions);
    }
  };

  function stripeCb(token){

    // Use the token to create the charge with a server-side script.
    // You can access the token ID with `token.id`
  }

  $scope.nextSlide = function(){
    $ionicSlideBoxDelegate.next();
  };

  $http.get(apiBaseUrl + 'donees/' + $stateParams.doneeId).then(function(response){
    $scope.donee = response.data;
  });
})

.controller('DonateCtrl', function($scope, $state){
  'use strict';

  // used only for custom stripe forms //
  Stripe.setPublishableKey('pk_test_UKMfyVX6ix2ImBTaTpDqASgl');

  jQuery(function($){
    $scope.closeDonate = function(){
      $state.go('app.dShow');
    };

    $('#payment-form').submit(function(event){
      var $form = $(this);

      console.log($form);

      // Disable the submit button to prevent repeated clicks
      $form.find('button').prop('disabled', true);

      Stripe.card.createToken($form, function(status, res){
       console.log('response', res);
       console.log('status', status);

        var $form = $('#payment-form');

        if (res.error) {
          // Show the errors on the form
          $form.find('.payment-errors').text(res.error.message);
          $form.find('button').prop('disabled', false);
        } else {
          // response contains id and card, which contains additional card details
          var token = res.id;
          // Insert the token into the form so it gets submitted to the server
          console.log('token', token);
          $form.append($('<input type="hidden" name="stripeToken" />').val(token));
          // and submit
          $form.get(0).submit();
        }

        $scope.closeDonate();
      });

      // Prevent the form from submitting with the default action
      return false;
    });
  });
});
