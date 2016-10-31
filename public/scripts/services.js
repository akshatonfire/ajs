
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

  // Gets all recipes for a specified category
  this.getAllRecipesInCategory = function(category, callback){
    $http.get(baseUrl + "/api/recipes?category=" + category)
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

  // Adds a recipe
  this.postAddRecipe = function(recipedata, callback, error){
    $http.post(baseUrl + "/api/recipes", recipedata)
    .then(callback, error)
  }

  // Deletes the recipe for the specified ID
  this.deleteRecipe = function(id, callback, error){
    $http.delete(baseUrl + "/api/recipes/" + id)
    .then(callback, error)
  }

  // Updates existing recipe
  this.putUpdateRecipe = function(id, recipedata, callback, error){
    $http.put(baseUrl + "/api/recipes/" + id, recipedata)
    .then(callback, error)
  }

}]);
