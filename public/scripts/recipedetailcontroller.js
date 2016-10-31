(function() {
'use strict';


angular.module('app')

  .controller('RecipeDetailController', ['$scope', 'dataService', '$routeParams', '$location', '$log', function($scope, dataService, $routeParams, $location, $log) {

    // ----------------------------------------------------------------
    // Inject services needed for Edit and Add New Recipe views
    // ----------------------------------------------------------------
    dataService.getAllCategories(function(response){
      $scope.allCategories = response.data;
    });

    dataService.getFoodItems(function(response){
      $scope.foodItems = response.data;
    });


    // -------------------------------------------------------------------------
    // Add functionality to buttons/links for both Edit and Add New Recipe views
    // -------------------------------------------------------------------------

    // Cancel save and return to home route
    $scope.cancelSave = function(){
      $location.path('/');
    }

    // Delete ingredient
    $scope.deleteIngredient = function(index) {
      $scope.recipeData.ingredients.splice(index);
    }

    // Add ingredient
    $scope.addIngredient = function(){
      $scope.recipeData.ingredients.push(
        {"foodItem": " ",
         "condition": " ",
         "amount": " "}
        );
    }

    // Delete clicked-on step
    $scope.deleteStep = function(index){
      $scope.recipeData.steps.splice(index);
    }

    // Add new step
    $scope.addStep = function(){
      $scope.recipeData.steps.push({"description":"Add step description here."});
    }


    // -------------------------------------------------------------------------
    // Set $scope.recipeData depending on view
    // -------------------------------------------------------------------------

    // In Edit view, set id so clicked-on recipe will populate fields
    $scope.id = $routeParams.id;

    // Inject service needed for Edit view
    // (if $scope.id exists, then we know it's the Edit view)
    if ($scope.id) {
      dataService.getRecipeById($scope.id, function(response){
        $scope.recipeData = response.data;
      });
    }
    // (if $scope.id doesn't exist, then we know it's the Add New Recipe view)
    else {
      // this will set placeholder fields for name and description
      // it will also set prepTime/cookTime to deal with delete bug
      $scope.recipeData = {
        name: "Enter recipe name",
        description: "Enter recipe description",
        category: "",
        prepTime: 10,
        cookTime: 10,
        ingredients: [],
        steps: []
      }
    }


    // -------------------------------------------------------------------------
    // Save recipe in Edit and Add New Recipe views
    // -------------------------------------------------------------------------

    // This function will save the recipe and return to home route
    // It will use put if it's an update, and post if it's a new recipe
    $scope.saveRecipe = function(){

    // If recipe id exists, then we are updating an existing recipe
    if ($scope.id) {
      dataService.putUpdateRecipe($scope.id, $scope.recipeData, function(response){
        if (response){
          $log.log(response.data);
          // Then return to home route
          $location.path('/');
        } else {
          $log.error("There was an error.");
        }
      }, function(error) {
        $log.error(error.data.errors);
        if (error) {$scope.showError = true}

        $scope.categoryError = error.data.errors.category;
        $scope.ingredientError = error.data.errors.ingredients;
        $scope.stepsError = error.data.errors.steps;
      }); // ends putUpdateRecipe
    // If recipe id doesn't exist, then we are adding a new recipe
    } else {
      dataService.postAddRecipe($scope.recipeData, function(response){
        if (response){
          $log.log(response.data);
          // Then return to home route
          $location.path('/');
        } else {
          $log.error("There was an error.");
        }
      }, function(error) {
        $log.error(error.data.errors);
        if (error) {$scope.showError = true}

        $scope.categoryError = error.data.errors.category;
        $scope.ingredientError = error.data.errors.ingredients;
        $scope.stepsError = error.data.errors.steps;
      }); // ends postAddRecipe
    } // ends else

  } // ends saveRecipe

}]); // ends controller


})();
