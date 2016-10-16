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
       $scope.recipeById = response.data;
     });
   } else {
     $scope.recipeById = {
       name: "Enter recipe name",
       description: "Enter recipe description",
       category: {
         name: ""
       },
       prepTime: "",
       cookTime: "",
       ingredients: {
         foodItem: "",
         condition: "",
         amount: ""
       },
       steps: {
         description: ""
       }

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
    } else {
    // SHOULD I DEFINE $scope.addRecipe here?
    // $scope.addRecipe.name = $scope.recipeById.name;
    // $scope.addRecipe.description = $scope.recipeById.description;
    // $scope.addRecipe.category.name = $scope.recipeById.category.name;
    // $scope.addRecipe.prepTime = $scope.recipeById.prepTime;
    // $scope.addRecipe.cookTime = $scope.recipeById.cookTime;
    //
    // for (var i=0; i<$scope.recipeById.ingredients.length; i++){
    //   $scope.addRecipe.ingredients[i].foodItem = $scope.recipeById.ingredients[i].foodItem;
    //   $scope.addRecipe.ingredients[i].condition = $scope.recipeById.ingredients[i].condition;
    //   $scope.addRecipe.ingredients[i].amount = $scope.recipeById.ingredients[i].amount;
    // }
    //
    // for (var j=0; j<$scope.recipeById.steps.length; j++){
    //   $scope.addRecipe.steps[j] = $scope.recipeById.steps[j];
    // }

    // what parameters do I need to send? just data?
      dataService.postAddRecipe($scope.recipeById, function(response){
        //$scope.addRecipe = response.data;

        console.log(response.data);
      });

    }
  }

  //  if ($location.path('/add')){
  //    $scope.addrecipe == true;
  //  }

 }]);
