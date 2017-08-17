'use strict';

angular.module('confusionApp')
  .controller('HeaderController', ['$scope', '$state', '$rootScope', 'ngDialog', 'AuthFactory',
    function($scope, $state, $rootScope, ngDialog, AuthFactory) {
      $scope.loggedIn = false;
      $scope.username = '';

      if(AuthFactory.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = AuthFactory.getUsername();
      }

      $scope.openLogin = function () {
        ngDialog.open({ template: 'views/login.html', scope: $scope, className: 'ngdialog-theme-default', controller:"LoginController" });
      };

      $scope.logOut = function() {
        AuthFactory.logout();
        $scope.loggedIn = false;
        $scope.username = '';
      };

      $rootScope.$on('login:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
      });

      $rootScope.$on('registration:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
      });

      $scope.stateis = function(curstate) {
        return $state.is(curstate);
      };
    }
  ])

  .controller('HomeController', ['$scope', 'menuFactory', 'corporateFactory', 'promotionFactory',
    function($scope, menuFactory, corporateFactory, promotionFactory) {
      $scope.showDish = false;
      $scope.showPromotion = false;
      $scope.showLeader = false;
      $scope.message="Loading ...";

      $scope.dish = {};
      menuFactory.query({featured: "true"})
        .$promise.then(
          function(response) {
            $scope.dish = response[0];
            $scope.showDish = true;
          },
          function(response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
          }
        );
      $scope.promotion = {};
      promotionFactory.query({featured: "true"})
        .$promise.then(
          function(response) {
            $scope.promotion = response[0];
            $scope.showPromotion = true;
          },
          function(response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
          }
        );
      $scope.leader = {};
      corporateFactory.query({featured: "true"})
        .$promise.then(
          function(response) {
            $scope.leader = response[0];
            $scope.showLeader = true;
          },
          function(response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
          }
        );
    }
  ])

  .controller('MenuController', ['$scope', 'menuFactory', 'favoriteFactory',
    function($scope, menuFactory, favoriteFactory) {
      $scope.showMenu = false;
      $scope.message = "Loading ...";

      $scope.dishes = [];
      menuFactory.query(
        function(response) {
          $scope.dishes = response;
          $scope.showMenu = true;
        },
        function(response) {
          $scope.message = "Error: " + response.status + " " + response.statusText;
        });

      // menus filter
      $scope.filterText = '';

      // menus tab selector
      $scope.tab = 1;
      $scope.select = function(setTab) {
        $scope.tab = setTab;

        if (setTab === 2) {
          $scope.filterText = "appetizer";
        }
        else if (setTab === 3) {
          $scope.filterText = "mains";
        }
        else if (setTab === 4) {
          $scope.filterText = "dessert";
        }
        else {
          $scope.filterText = "";
        }
      };
      $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
      };

      // show details
      $scope.showDetails = false;
      $scope.toggleDetails = function() {
        $scope.showDetails = !$scope.showDetails;
      };

      // show favorites
      $scope.showFavorites = false;
      $scope.toggleFavorites = function () {
        $scope.showFavorites = !$scope.showFavorites;
      };
      $scope.addToFavorites = function(dishid) {
        console.log('Add to favorites', dishid);
        favoriteFactory.save({_id: dishid});
        $scope.showFavorites = !$scope.showFavorites;
      };
    }
  ])

  .controller('DishDetailController', ['$scope', '$state', '$stateParams', 'menuFactory', 'commentFactory',
    function($scope, $state, $stateParams, menuFactory, commentFactory) {
      $scope.showDish = false;
      $scope.message="Loading ...";

      $scope.dish = {};
      menuFactory.get({id: $stateParams.id})
        .$promise.then(
          function (response) {
            $scope.dish = response;
            $scope.showDish = true;
          },
          function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
          }
        );

      $scope.mycomment = {rating: 5, comment: ""};
      $scope.ratings = [1, 2, 3, 4, 5];

      $scope.submitComment = function () {
        commentFactory.save({id: $stateParams.id}, $scope.mycomment);
        $state.go($state.current, {}, {reload: true});
        $scope.commentForm.$setPristine();
        $scope.mycomment = {rating: 5, comment: ""};
      };
    }
  ])

  .controller('FavoriteController', ['$scope', '$state', 'favoriteFactory',
    function ($scope, $state, favoriteFactory) {
      $scope.filtText = '';
      $scope.showDetails = false;
      $scope.showDelete = false;
      $scope.showMenu = false;
      $scope.message = "Loading ...";

      favoriteFactory.query(
        function (response) {
          $scope.dishes = response.dishes;
          $scope.showMenu = true;
        },
        function (response) {
          $scope.message = "Error: " + response.status + " " + response.statusText;
        });

      // menus tab selector
      $scope.tab = 1;
      $scope.select = function (setTab) {
        $scope.tab = setTab;

        if (setTab === 2) {
          $scope.filterText = "appetizer";
        } else if (setTab === 3) {
          $scope.filterText = "mains";
        } else if (setTab === 4) {
          $scope.filterText = "dessert";
        } else {
          $scope.filterText = "";
        }
      };
      $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
      };

      $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
      };

      $scope.toggleDelete = function () {
        $scope.showDelete = !$scope.showDelete;
      };

      $scope.deleteFavorite = function(dishid) {
        console.log('Delete favorites', dishid);
        favoriteFactory.delete({id: dishid});
        $scope.showDelete = !$scope.showDelete;
        $state.go($state.current, {}, {reload: true});
      };
    }
  ])

  .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
    $scope.leaders = corporateFactory.query();
  }])

  .controller('ContactController', ['$scope', 'feedbackFactory',
    function($scope, feedbackFactory) {
      $scope.feedback = { mychannel:"", firstName:"", lastName:"", agree:false, email:"", tel:{areaCode:"", number:""}, comments:"" };
      $scope.channels = [ {value:"tel", label:"Tel."}, {value:"Email", label:"Email"} ];
      $scope.invalidChannelSelection = false;

      $scope.sendFeedback = function () {
        if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
          $scope.invalidChannelSelection = true;
        } else {
          $scope.invalidChannelSelection = false;
          feedbackFactory.save($scope.feedback);
          $scope.feedback = {
            mychannel: "",
            firstName: "",
            lastName: "",
            agree: false,
            email: ""
          };
          $scope.feedback.mychannel = "";
          $scope.feedbackForm.$setPristine();
        }
      };
    }
  ])

  .controller('LoginController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory',
    function ($scope, ngDialog, $localStorage, AuthFactory) {
      $scope.loginData = $localStorage.getObject('userinfo', '{}');

      $scope.doLogin = function() {
        if($scope.rememberMe) {
          $localStorage.storeObject('userinfo', $scope.loginData);
        }

        AuthFactory.login($scope.loginData);

        ngDialog.close();
      };

      $scope.openRegister = function () {
        ngDialog.open({ template: 'views/register.html', scope: $scope, className: 'ngdialog-theme-default', controller:"RegisterController" });
      };
    }
  ])

  .controller('RegisterController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory',
    function ($scope, ngDialog, $localStorage, AuthFactory) {
      $scope.register={};
      $scope.loginData={};

      $scope.doRegister = function() {
        console.log('Doing registration', $scope.registration);

        AuthFactory.register($scope.registration);

        ngDialog.close();
      };
    }
  ])

;
