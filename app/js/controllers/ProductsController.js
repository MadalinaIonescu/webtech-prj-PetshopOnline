'use strict'
let ProductsController = angular.module('ProductsController', [])

ProductsController.controller('ProductsController', ['$scope','$http', function($scope,$http) {
    $scope.products = [];

    $scope.loadProducts = function() {
        var httpRequest = $http({
            method: 'GET',
            url: "https://webtech-prj-petshop-online-madalinaionescu.c9users.io/products"

        }).success(function(data, status) {
            $scope.products = data;
        });

    };
    
    
    $scope.delete=function(idx,id) {
    var httpRequestDelete = $http({
            method: 'DELETE',
            url: "https://webtech-prj-petshop-online-madalinaionescu.c9users.io/products/"+id

        }).success(function(data, status) {
            $scope.products.splice(idx, 1);
        });
  };

    $scope.loadProducts();
}])
