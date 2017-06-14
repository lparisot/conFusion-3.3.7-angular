'use strict';

angular.module('confusionApp')
  .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
    $scope.showMenu = false;
    $scope.message = "Loading ...";

    $scope.dishes = [];
    menuFactory.getDishes().query(
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
  }])

  .controller('ContactController', ['$scope', function($scope) {
    $scope.feedback = { mychannel:"", firstName:"", lastName:"", agree:false, email:"", tel:{areaCode:"", number:""}, comments:"" };
    $scope.channels = [ {value:"tel", label:"Tel."}, {value:"Email", label:"Email"} ];
    $scope.invalidChannelSelection = false;
  }])

  .controller('FeedbackController', ['$scope', function($scope) {
    $scope.sendFeedback = function() {
      console.log($scope.feedback);
      if ($scope.feedback.agree && (!$scope.feedback.mychannel || $scope.feedback.mychannel === "")) {
        $scope.invalidChannelSelection = true;
      }
      else {
        $scope.invalidChannelSelection = false;
        $scope.feedback.mychannel="";
        $scope.feedback.firstName="";
        $scope.feedback.lastName="";
        $scope.feedback.agree=false;
        $scope.feedback.email="";
        $scope.feedback.tel.areaCode="";
        $scope.feedback.tel.number="";
        $scope.feedback.comments="";

        $scope.$watch('feedbackForm', function(feedbackForm) {
          if(feedbackForm) {
            $scope.feedbackForm.$setPristine();
          }
        });
      }
    };

    $scope.updateChannel = function() {
      if ($scope.feedback.agree && (!$scope.feedback.mychannel || $scope.feedback.mychannel === "")) {
        $scope.invalidChannelSelection = true;
      }
      else {
        $scope.invalidChannelSelection = false;
      }
    };
  }])

  .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
    $scope.showDish = false;
    $scope.message="Loading ...";

    $scope.dish = {};
    menuFactory.getDishes().get({id:parseInt($stateParams.id, 10)})
      .$promise.then(
        function(response) {
          $scope.dish = response;
          $scope.showDish = true;
        },
        function(response) {
          $scope.message = "Error: " + response.status + " " + response.statusText;
        });
  }])

  .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {
    $scope.comment = {rating:5, comment:"", author:"", date:""};
    $scope.ratings = [1, 2, 3, 4, 5];

    $scope.submitComment = function () {
        $scope.comment.date = new Date().toISOString();

        $scope.dish.comments.push(angular.copy($scope.comment));
        menuFactory.getDishes().update({id:$scope.dish.id}, $scope.dish);

        $scope.commentForm.$setPristine();

        $scope.comment.rating = 5;
        $scope.comment.comment = "";
        $scope.comment.author = "";
        $scope.comment.date = "";
    };
  }])

  .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {
    $scope.showDish = false;
    $scope.showPromotion = false;
    $scope.message="Loading ...";

    $scope.dish = {};
    menuFactory.getDishes().get({id:0})
      .$promise.then(
        function(response) {
          $scope.dish = response;
          $scope.showDish = true;
        },
        function(response) {
          $scope.message = "Error: " + response.status + " " + response.statusText;
        });
    $scope.promotion = {};
    menuFactory.getPromotions().get({id:0})
      .$promise.then(
        function(response) {
          $scope.promotion = response;
          $scope.showPromotion = true;
        },
        function(response) {
          $scope.message = "Error: " + response.status + " " + response.statusText;
        });
    $scope.leader = corporateFactory.getLeader(3);
  }])

  .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
    $scope.leaders = corporateFactory.getLeaders();
  }])

;
