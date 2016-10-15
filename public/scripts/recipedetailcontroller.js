'use strict';


angular.module('app')

 .controller('RecipeDetailController', ['$scope', 'dataService', '$routeParams', '$location', function($scope, dataService, $routeParams, $location) {

   $scope.id = $routeParams.id;
   console.log("$scope.id is " + $scope.id)
   if ($scope.id == undefined){
     $scope.addrecipe == true;
   } else {
     $scope.addrecipe == false;
   }
   //WHY does console keep saying $scope.addrecipe is undefined?
   console.log("$scope.addrecipe is " + $scope.addrecipe)


   // Inject services
   dataService.getRecipeById($scope.id, function(response){
     $scope.recipeById = response.data;
   });

   dataService.getAllCategories(function(response){
     $scope.allCategories = response.data;
   });

   dataService.getFoodItems(function(response){
     $scope.foodItems = response.data;
   });

   // Cancel save and return to home route
   $scope.cancelSave = function(){
     $location.path('/');
   }


   // Delete ingredient
   $scope.deleteIngredient = function(index) {
     $scope.recipeById.ingredients.splice(index);
   }

   // Add ingredient
   $scope.addIngredient = function(){
     $scope.recipeById.ingredients.push(
      {"foodItem": " ",
       "condition": " ",
       "amount": " "}
      );
   }

   // Delete clicked-on step
   $scope.deleteStep = function(index){
     $scope.recipeById.steps.splice(index);
   }

   // Add new step
   $scope.addStep = function(){
     $scope.recipeById.steps.push({"description":"Add step description here."});
   }

  // This function will save the recipe and return to home route
  // It will use put if it's an update, and post if it's a new recipe
  $scope.saveRecipe = function(){
    console.log("Save Recipe button clicked.");
    // If recipe id exists, then we are updating an existing reciped
    if ($scope.id.length > 0) {
      dataService.putUpdateRecipe($scope.id, $scope.recipeById, function(response){
        console.log(response.data);
      });
      // Then return to home route
      $location.path('/');
    } else if ($scope.id.length = 0) {
    // what parameters do I need to send? just data?
      dataService.postAddRecipe(function(response){
        $scope.addRecipe = response.data;
      });

    }
  }

  //  if ($location.path('/add')){
  //    $scope.addrecipe == true;
  //  }

 }]);
