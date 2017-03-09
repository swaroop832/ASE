angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('page', {
    url: '/page2',
    templateUrl: 'templates/page.html',
    controller: 'pageCtrl'
  })

  .state('loginForm', {
    url: '/page3',
    templateUrl: 'templates/loginForm.html',
    controller: 'loginFormCtrl'
  })

  .state('signUp', {
    url: '/page4',
    templateUrl: 'templates/signUp.html',
    controller: 'signUpCtrl'
  })

$urlRouterProvider.otherwise('/page3')

  

});