'use strict';


angular.module('confusionApp', ['ui.router', 'ngResource'])
  .config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
  }])

  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      // route for the home page
      .state('app', {
        url:'/',
        views: {
          'header': {
            templateUrl: 'views/header.html'
          },
          'content': {
            templateUrl: 'views/home.html'
          },
          'footer': {
            templateUrl: 'views/footer.html'
          }
        }
      })

      // route for the aboutus page
      .state('app.aboutus', {
        url:'aboutus',
        views: {
          'content@': {
            templateUrl : 'views/aboutus.html'
          }
        }
      })

      // route for the contactus page
      .state('app.contactus', {
        url:'contactus',
        views: {
          'content@': {
            templateUrl : 'views/contactus.html'
          }
        }
      })

      // route for the menu page
      .state('app.menu', {
        url: 'menu',
        views: {
          'content@': {
            templateUrl : 'views/menu.html'
          }
        }
      })

      // route for the dishdetail page
      .state('app.dishdetails', {
        url: 'menu/:id',
        views: {
          'content@': {
            templateUrl : 'views/dishdetail.html'
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  }]);
