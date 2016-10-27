'use strict';


angular.module('app')

 .controller('RecipeDetailController', ['$scope', 'dataService', '$routeParams', '$location', function($scope, dataService, $routeParams, $location) {

   $scope.id = $routeParams.id;
   console.log("$scope.id is " + $scope.id)
   if ($scope.id){
     $scope.addrecipe === false;
   } else {
     $scope.addrecipe === true;
   }
   //WHY does console keep saying $scope.addrecipe is undefined?
   console.log("$scope.addrecipe is " + $scope.addrecipe)


   // Inject services needed for Edit view
   if ($scope.id) {
     dataService.getRecipeById($scope.id, function(response){
       $scope.recipeData = response.data;
     });
   } else {
     $scope.recipeData = {
       name: "Enter recipe name",
       description: "Enter recipe description",
       // BUT THIS ISN'T LINKED TO CATEGORY FIELD
       category: {
         name: "Entree"
       },
       prepTime: 0,
       cookTime: 0,
       ingredients: [
         {foodItem: "Select Item",
         condition: " ",
         amount: " "}
       ],
       steps: [
         {description: " "}
       ]
     }
   }

   // Inject services needed for both Edit and Add New Recipe views
   dataService.getAllCategories(function(response){
     $scope.allCategories = response.data;
   });

   dataService.getFoodItems(function(response){
     $scope.foodItems = response.data;
   });

   // Add functionality to buttons/links for both Edit and Add Recipe views
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

  // This function will save the recipe and return to home route
  // It will use put if it's an update, and post if it's a new recipe
  $scope.saveRecipe = function(){
    console.log("Save Recipe button clicked.");
    // If recipe id exists, then we are updating an existing recipe
    if ($scope.id.length > 0) {
      dataService.putUpdateRecipe($scope.id, $scope.recipeData, function(response){
        console.log(response.data);
      });
      // Then return to home route
      $location.path('/');
    } else {


    // What parameters do I need to send? just data?
      dataService.postAddRecipe($scope.recipeData, function(response){
        //$scope.addRecipe = response.data;

        console.log(response.data);
      });

    }
  }

  //  if ($location.path('/add')){
  //    $scope.addrecipe == true;
  //  }

 }]);
