/* global $*/

var total_payment=0;

$(document).ready(function () {
    document.getElementById("total_payment").value = total_payment;
});



function populateSelPorducts(){
document.getElementById("selProduct").options.length = 0;
$.get("/products/",{},function(data, status){
    data.forEach(function(value){
       var name = value.product_name+", "+value.price+" RON";
        $("select[name='selProduct']").append('<option value="'+value.id+'">'+name+'</option>');
        console.log(value.id);
    });
});
}

function saveProduct(){
    var dataCells;
    var productId=$('#selProduct option:selected').val();
    $.get("/products/"+productId,{},function(data, status){
    var productName= data.product_name;
    var productPrice= data.price;
    var productQuantity=document.getElementById("quantity").value;
      
    dataCells = '<td class="product_name">'+productName+'</td>'
    +'<td class="price">'+productPrice+'</td>'
    +'<td class="quantity">'+productQuantity+'</td>'
    +'<td align="center">'
    +'<button onclick="viewMyProduct('+productId+')" class="btn btn-edit">Update</button>'
    +'</td>'
     +'<td align="center">'
    +'<button onclick="deleteMyProduct('+productId+')" class="btn btn-danger">Exclude</button>'
    +'</td>'
      
    var row='<tr id="row_id_'+productId+'">'+dataCells+'</tr>';
    $('#myProducts').append(row);
     
    total_payment+=productPrice*productQuantity; 
    document.getElementById("total_payment").value = total_payment;
      
    $('#add_new_product_modal').modal('hide');
    
    });
   
   
    
}