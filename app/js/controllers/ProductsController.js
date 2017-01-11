'use strict'
let ProductsController = angular.module('ProductsController', [])

ProductsController.controller('ProductsController', ['$scope', function($scope,$https) {
    //  $scope.products = [{
    //     product_name: 'aa',
    //     price: '12'
    // }, {
    //     product_name: 'bb',
    //     price: '13'
    // }]
//   var vm = this;
// vm.mydata = [];

// var init= function(){
//     $.get("/products/",{},
//     function(data, status){
//     vm.mydata = data;
  
//   //  console.log($scope.products);
//   console.log(vm.mydata); 
//     });
//   };
//   init();
//   $scope.products=[];
//     $.get("/products/",{},function(data, status){
//         $scope.products=data;
//     });
$scope.identifications=[];
$scope.products=[];
var init=function(){  
    $.get("/products/",{},function(data, status){
    
     data.forEach(function(value){
    // var dataCells = '<td class="id">'+value.id+'</td>'
    // +'<td class="product_name" >'+value.product_name+'</td>'
    // +'<td class="animal_destinated">'+value.animal_destinated+'</td>'
    // +'<td class="descriptions">'+value.descriptions+'</td>'
    // +'<td class="price">'+value.price+'</td>';
    // +'<td>'
    // +'<img class="imgDel" src="mediaApp/del.png" ng-click="delete('+value.id+')" >'
    // +'</td>';
   //  $("select[name='selId']").append('<option value="'+value.id+'">'+value.id+'</option>');
   $scope.identifications.push(value.id);
   $scope.products.push(value);
    // var row='<tr id="row_id_'+value.id+'">'+dataCells+'</tr>';
    // $('#products').append(row);
    });
  
      
    });
}
console.log($scope.identifications);
console.log($scope.products);

$scope.delete=function(id) {
    $.ajax({
        url:'/products/'+id,
        type:'DELETE',
        success:function(data){
            $('#row_id_'+id).remove();
            console.log("deleted");
        }
        
    });
     
  };
//  var vm = this;
//     vm.mydata = [];

//     $https.get("https://webtech-prj-petshop-online-madalinaionescu.c9users.io/products")
//         .then(function(result) {
//           console.log(result);
//           vm.mydata = result.data;
//          });
//     $scope.John="John";
//     console.log(vm.mydata);
  //  console.log($scope.products);
  init();
}])
