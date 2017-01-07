/* global $*/

var total_payment=0;
var i=0;
var flag=0;

$(document).ready(function () {
    document.getElementById("total_payment").value = total_payment;

   
});



function populateSelPorducts(){
document.getElementById("selProduct").options.length = 0;
$('#myModalLabel').html('Add new Product');
 $("#quantity").val('');
flag=0;
$.get("/products/",{},function(data, status){
    data.forEach(function(value){
      var name = value.product_name+", "+value.price+" RON";
        $("select[name='selProduct']").append('<option value="'+value.id+'">'+name+'</option>');
        console.log(value.id);
    });
});
}

function saveProduct(){
    if(flag==0){
        
        createMyProduct();
        
    }
        else{
        
        updateMyProduct();
          
        }
}


function createMyProduct(){
    console.log("create");
  //  $('#myModalLabel').html('Add new Product ');
     $("#quantity").text('');
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
    +'<button onclick="viewMyProduct('+productId+','+i+')" class="btn btn-edit">Update</button>'
    +'</td>'
     +'<td align="center">'
    +'<button onclick="deleteMyProduct('+i+')" class="btn btn-danger">Exclude</button>'
    +'</td>'
      console.log("id-ul prod sel este"+productId);
    var row='<tr id="row_id_'+i+'">'+dataCells+'</tr>';
    $('#myProducts').append(row);
    i=i+1;
     
    total_payment+=productPrice*productQuantity; 
    document.getElementById("total_payment").value = total_payment;
      
    $('#add_new_product_modal').modal('hide');
    });
    
}

function insertOrderTranzactions(){
    // var name = document.getElementById("name").value;
    // var phone= document.getElementById("phone").value;
    // var email = document.getElementById("email").value;
    // var address = document.getElementById("address").value;
    // var contact = document.getElementById("contact").value;
    var formData=$('#order_form').serializeObject();
     $.ajax({
        url:'/orders/',
        type:'POST',
        accepts:{
            json:'application/json'
        },
        data:formData,
        success:function(data){
         console.log("ok");
        }
    });
}


function viewMyProduct(idProduct, id){
    console.log("update!");
   console.log("id-ul prod upd este"+idProduct);
   console.log("id-ul randului este"+id);

   // populateSelPorducts();
    $('#myModalLabel').html('Edit Product ');
    flag=1;
    $("#selProduct").val(idProduct);
 //  $("#selProduct").prop("selectedIndex", idProduct);
    var qu=parseInt( $('#row_id_'+id+'>td.quantity').text(),10);
    console.log("cantitate="+qu);
    $("#quantity").val(qu);
    $("#id").val(id);  
   var a= $("#id").val();
    console.log("in view-id rand:"+a);
    $('#add_new_product_modal').modal('show');
    
    
    $.get("/products/"+idProduct,{},function(data, status){
    var productPrice= data.price;
    total_payment-=productPrice*qu; 
   
    document.getElementById("total_payment").value = total_payment;
    
    });
}        
       


function updateMyProduct(){
    
    var productId=$('#selProduct option:selected').val();
    $.get("/products/"+productId,{},function(data, status){
    var productName= data.product_name;
    var productPrice= data.price;
    var productQuantity=document.getElementById("quantity").value;
    var id= $("#id").val(); 
    console.log(" in upd id-ul randului "+id);
     $('#row_id_'+id).remove();
     i=i-1;
    var  dataCells = '<td class="product_name">'+productName+'</td>'
    +'<td class="price">'+productPrice+'</td>'
    +'<td class="quantity">'+productQuantity+'</td>'
    +'<td align="center">'
    +'<button onclick="viewMyProduct('+productId+','+i+')" class="btn btn-edit">Update</button>'
    +'</td>'
     +'<td align="center">'
    +'<button onclick="deleteMyProduct('+i+')" class="btn btn-danger">Exclude</button>'
    +'</td>'
      console.log("id-ul prod sel este"+productId);
    var row='<tr id="row_id_'+i+'">'+dataCells+'</tr>';
    $('#myProducts').append(row);
    i=i+1;
    // $('#row_id_'+id+'>td.product_name').html(productName);
    // $('#row_id_'+id+'>td.price').html(productPrice);
    // $('#row_id_'+id+'>td.quantity').html(productQuantity);
    
    total_payment+=productPrice*productQuantity; 
    document.getElementById("total_payment").value = total_payment;
      
    $('#add_new_product_modal').modal('hide');
    flag=0;

});
}


function deleteMyProduct(id){
    
    var productQuantity= parseInt( $('#row_id_'+id+'>td.quantity').text(),10);
    var productPrice= parseFloat($('#row_id_'+id+'>td.price').text(),10);
    console.log("pret:"+productPrice);
    console.log("cant:"+productQuantity);
    
     total_payment-=productPrice*productQuantity; 
    document.getElementById("total_payment").value = total_payment;
    $('#row_id_'+id).remove();
    i=i-1;
}

$.fn.serializeObject=function()
{
    var o={};
    var a=this.serializeArray();
    $.each(a,function(){
        if(o[this.name]!==undefined){
            if(!o[this.name].push){
                o[this.name]=[o[this.name]];
            }
            o[this.name].push(this.value|| '');
        }
        else{
             o[this.name]=this.value || '';
        }
    });
    return o;
};