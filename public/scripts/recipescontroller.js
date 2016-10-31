(function() {
'use strict';


angular.module('app')

  .controller('RecipesController', ['$scope', 'dataService', '$location', function($scope, dataService, $location) {

    // -------------------------------------------------------------
    // Inject services needed when page loads
    // -------------------------------------------------------------
    dataService.getAllRecipes(function(response){
      $scope.listRecipes = response.data;
    });

    dataService.getAllCategories(function(response){
      $scope.allCategories = response.data;
    });


    // -------------------------------------------------------------
    // Check for recipe matches when user changes select menu
    // -------------------------------------------------------------
    $scope.selectedCategory = null;

    $scope.checkForResults = function() {
      // Make call to API to get all recipes in selected category
      dataService.getAllRecipesInCategory($scope.selectedCategory, function(response){
        $scope.listRecipes = response.data;
        // Use noresults to show/hide 'No recipes found' message based on whether results come back
        if ($scope.listRecipes.length) {
          $scope.noresults = false;
        } else {
          $scope.noresults = true;
        }

      });
    }


    // -------------------------------------------------------------
    // Load detail view when Add Recipe button is clicked
    // -------------------------------------------------------------
    $scope.loadAddRecipeView = function(){
      $location.path('/add');
    }

    // -------------------------------------------------------------
    // Delete recipe when Delete button is clicked
    // -------------------------------------------------------------
    $scope.deletedRecipe = function($index) {
      // Set deleteId of recipe that was clicked on
      $scope.deleteId = $scope.listRecipes[$index]._id;
      // Make call to API to delete the recipe
      dataService.deleteRecipe($scope.deleteId, function(response){
        // Then, must make call to recipes API again to get refreshed list
        dataService.getAllRecipes(function(response){
          $scope.listRecipes = response.data;
        });
      });
    }


}]); // ends controller

})();
