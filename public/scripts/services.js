
'use strict';
// Should I use Ctrl syntax instead of Controller?
// Do I need to do better error handling?

angular.module('app')


.service('dataService', ['$http', function($http){

  var baseUrl = "http://localhost:5000";

  // Gets all of the recipes
  this.getAllRecipes = function(callback){
    $http.get(baseUrl + "/api/recipes")
    .then(callback)
  }

  // Gets all of the categories
  this.getAllCategories = function(callback){
    $http.get(baseUrl + "/api/categories")
    .then(callback)
  }

  // Gets the recipe for the specified ID
  this.getRecipeById = function(id, callback){
    $http.get(baseUrl + "/api/recipes/" + id)
    .then(callback)
  }

  // Gets all of the food items
  this.getFoodItems = function(callback){
    $http.get(baseUrl + "/api/fooditems")
    .then(callback)
  }

}]);


//   // Gets all recipes for a specified category BUT I DON'T NEED THIS?
//   this.getAllRecipesInCategory = function(callback){
//     $http.get(baseUrl + "/api/recipes?category={category}")
//     .then(callback)
//   }
//
//
// // // Updates the recipe for the specified ID
// // app.controller('updateRecipeController', function($scope, $http) {
// //     $http.put(baseUrl + "/api/recipes/{id}")
// //     .then(function(response) {
// //         $scope.updateRecipe = response.data;
// //     });
// // });
// //
// // // Adds a recipe
// // app.controller('addRecipeController', function($scope, $http) {
// //     $http.post(baseUrl + "/api/recipes")
// //     .then(function(response) {
// //         $scope.addRecipe = response.data;
// //     });
// // });
// //
// // // Deletes the recipe for the specified ID
// // app.controller('deleteRecipeController', function($scope, $http) {
// //     $http.delete(baseUrl + "/api/recipes/{id}")
// //     .then(function(response) {
// //         $scope.deleteRecipe = response.data;
// //     });
// // });
