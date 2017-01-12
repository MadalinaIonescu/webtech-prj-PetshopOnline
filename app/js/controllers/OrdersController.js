'use strict'
let OrdersController = angular.module('OrdersController', [])

OrdersController.controller('OrdersController', ['$scope','$http', function($scope,$http) {
    $scope.orders = [];

    $scope.loadOrders = function() {
        var httpRequest = $http({
            method: 'GET',
            url: "https://webtech-prj-petshop-online-madalinaionescu.c9users.io/orders"

        }).success(function(data, status) {
            $scope.orders = data;
        });

    };
    
$scope.loadOrders();
    
}])