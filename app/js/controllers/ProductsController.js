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
  
   $scope.prd = {};
  $scope.insert=function(){	
      var data = $.param({
        product: JSON.stringify({
            product_name: $scope.prd.product_name,
            animal_destinated : $scope.prd.animal_destinated,
            descriptions : $scope.prd.descriptions,
            price:$scope.prd.price
        })
      });
    $http.post("https://webtech-prj-petshop-online-madalinaionescu.c9users.io/products",$scope.prd )
    
    .success(function(data,status,headers,config){
    console.log("Data Inserted Successfully"+data);
    $scope.prd.id=data.id;
   $scope.products.push($scope.prd);
    });
}
$scope.loadProducts();
    
}])
