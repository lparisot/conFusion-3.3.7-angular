'use strict';

angular.module('confusionApp', [])
  .controller('MenuController', ['$scope', function($scope) {
    $scope.dishes = [
    {
      name:'Uthapizza',
      image: 'images/uthapizza.png',
      category: 'mains',
      label:'Hot',
      price:'4.99',
      description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
      comment: ''
    },
    {
      name:'Zucchipakoda',
      image: 'images/zucchipakoda.png',
      category: 'appetizer',
      label:'',
      price:'1.99',
      description:'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce',
      comment: ''
    },
    {
      name:'Vadonut',
      image: 'images/vadonut.png',
      category: 'appetizer',
      label:'New',
      price:'1.99',
      description:'A quintessential ConFusion experience, is it a vada or is it a donut?',
      comment: ''
    },
    {
      name:'ElaiCheese Cake',
      image: 'images/elaicheesecake.png',
      category: 'dessert',
      label:'',
      price:'2.99',
      description:'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms',
      comment: ''
    }];

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
}]);
