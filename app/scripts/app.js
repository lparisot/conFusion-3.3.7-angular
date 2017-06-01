'use strict';

angular.module('confusionApp', []).controller('menuController', function() {
  this.dishes = [
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
    this.filterText = '';

    // menus tab selector
    this.tab = 1;
    this.select = function(setTab) {
      this.tab = setTab;

      if (setTab === 2) {
        this.filterText = "appetizer";
      }
      else if (setTab === 3) {
        this.filterText = "mains";
      }
      else if (setTab === 4) {
        this.filterText = "dessert";
      }
      else {
        this.filterText = "";
      }
    };
    this.isSelected = function (checkTab) {
      return (this.tab === checkTab);
    };
});