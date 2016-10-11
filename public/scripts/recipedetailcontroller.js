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

   dataService.postAddRecipe(function(response){
     $scope.addRecipe = response.data;
   });


  //  if ($location.path('/add')){
  //    $scope.addrecipe == true;
  //  }

 }]);
