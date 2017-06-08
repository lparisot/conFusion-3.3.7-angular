'use strict';


angular.module('confusionApp', ['ngRoute'])
  // see https://stackoverflow.com/questions/41211875/angularjs-1-6-0-latest-now-routes-not-working
  // https://github.com/angular/angular.js/pull/14202
  .config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
  }])

  .config(function($routeProvider) {
    $routeProvider
      // route for the contactus page
      .when('/contactus', {
        templateUrl : 'contactus.html',
        controller  : 'ContactController'
      })
      // route for the menu page
      .when('/menu', {
        templateUrl : 'menu.html',
        controller  : 'MenuController'
      })
      // route for the dish details page
      .when('/menu/:id', {
        templateUrl : 'dishdetail.html',
        controller  : 'DishDetailController'
      })
      .otherwise('/contactus');
  });
