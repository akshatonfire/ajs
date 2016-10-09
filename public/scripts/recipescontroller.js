'use strict';


angular.module('app')

 .controller('RecipesController', ['$scope', 'dataService', '$location', function($scope, dataService, $location) {



   // Inject services
   dataService.getAllRecipes(function(response){
     $scope.allRecipes = response.data;
   });

   dataService.getAllCategories(function(response){
     $scope.allCategories = response.data;
   });


   // Check for recipe matches when user changes select menu
   $scope.checkforresults = function(selection) {
     // Reset noresults when user changes select menu
     $scope.noresults = false;
     console.log(selection);
     var counter = 0;
     for (var i=0; i<$scope.allRecipes.length; i++) {
       if ($scope.allRecipes[i].category == selection) {
         counter++;
       }
     }
     // If there are no matches and select menu isn't set to All Categories,
     if (counter==0 && (selection)) {
       $scope.noresults = true;
     }
   }

   $scope.loadView2 = function(clickedRecipe){
     console.log(clickedRecipe);
     $scope.id = clickedRecipe;
     $location.path('/edit/'+ clickedRecipe);

   }



}]);


   // Filter recipes DO I NEED THIS?
  // $scope.selectedcategory = $scope.allCategories.name;

  //  dataService.getAllRecipesInCategory(function(response){
  //    $scope.allRecipesInCategory = response.data;
  //  });
