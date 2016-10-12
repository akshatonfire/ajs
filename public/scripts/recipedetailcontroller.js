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



  // Save recipe and return to home route
  // BUT, I have to do a PUT if it's an update, and a POST if it's a new recipe
  $scope.saveRecipe = function(){
    console.log("Save Recipe button clicked.");
    // if id exists
    // Do I have to check whether it was edited?
    // EITHER THIS IS NOT MAKING THE PUT REQUEST (AND THERE'S NO CONSOLE LOG) OR I NEED TO REFRESH RECIPES WHEN I GO BACK TO THE MAIN SCREEN. BUT I THINK IT IS ALREADY REFRESHING?
    dataService.putUpdateRecipe($scope.id, $scope.recipeById, function(response){
      console.log(response.data);
    });


    // else if id doesn't exist
    // DON'T NEED ID AS PARAMETER?
    // dataService.postAddRecipe(function(response){
    //   $scope.addRecipe = response.data;
    // });
    $location.path('/');
  }

  // Cancel save and return to home route
  $scope.cancelSave = function(){
    $location.path('/');
  }

  //  if ($location.path('/add')){
  //    $scope.addrecipe == true;
  //  }

 }]);
