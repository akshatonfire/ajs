'use strict';


angular.module('app')

 .controller('RecipeDetailController', ['$scope', 'dataService', '$routeParams', function($scope, dataService, $routeParams) {

   $scope.id= $routeParams.id;

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

 }]);
