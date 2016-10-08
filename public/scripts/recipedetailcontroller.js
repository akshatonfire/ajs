'use strict';


angular.module('app')

 .controller('RecipeDetailController', ['$scope', 'dataService', '$routeParams', function($scope, dataService, $routeParams) {

   $scope.id= $routeParams.id;

   // Inject services
   dataService.getRecipeById($scope.id, function(response){
     $scope.recipeById = response.data;
   });



 }]);
