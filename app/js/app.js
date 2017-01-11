'use strict'
let app = angular.module('myApp', ['ui.router', 'ProductsController'])

app.config(['$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider){
        
    $urlRouterProvider.otherwise('/productsV')
    
    $stateProvider
        .state('products', {
            url: '/productsV',
            templateUrl : 'views/products.html',
            controller:'ProductsController'
        })
        .state('orders', {
            url: '/ordersV',
            templateUrl: 'views/orders.html',
            controller: 'OrdersController'
        })
}])