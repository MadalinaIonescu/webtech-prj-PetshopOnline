/*global $*/

$(document).ready(function () {
    readRecords(); // calling function
});

//read records
function readRecords(){
$.get("/products/",{},function(data, status){
    data.forEach(function(value){
        var row='<tr id="row_id_'+value.id+'">'+displayColumns(value)+'</tr>';
        $('#products').append(row);
    });
});
}

function displayColumns(value){
    return '<td>'+value.id+'</td>'
    +'<td class="product_name">'+value.product_name+'</td>'
    +'<td class="animal_destinated">'+value.animal_destinated+'</td>'
    +'<td class="descriptions">'+value.descriptions+'</td>'
    +'<td class="price">'+value.price+'</td>'
    +'<td align="center">'
    +'<button onclick="viewRecord('+value.id+')" class="btn btn-edit">Update</button>'
    +'</td>'
     +'<td align="center">'
    +'<button onclick="deleteRecord('+value.id+')" class="btn btn-danger">Exclude</button>'
    +'</td>'
    
}

//add a Record
function addRecord(){
    $('#id').val('');
    $('#product_name').val('');
    $('#animal_destinated').val('');
    $('#descriptions').val('');
    $('#price').val('');
    
    $('#myModalLabel').html('Add new Product');
   // $('#add_new_record_modal').modal('show');
    
}

//get one Record
function viewRecord(id){
    var url="/products/"+id;
    $.get(url,{},function(data, status){
        //bind the values to the form fields
        $('#product_name').val(data.product_name);
        $('#animal_destinated').val(data.animal_destinated);
        $('#descriptions').val(data.descriptions);
        $('#price').val(data.price);
        
        $('#id').val(data.id);
        $('#myModalLabel').html('Edit Product ');
        
        $('#add_new_record_modal').modal('show');
    
    });
}


//save Record
function saveRecord(){
    var formData=$('#record_form').serializeObject();
    if(formData.id){
        updateRecord(formData);
    }
    else{
        createRecord(formData);
    }
}


//create Record
function createRecord(formData){
    $.ajax({
        url:'/products/',
        type:'POST',
        accepts:{
            json:'application/json'
        },
        data:formData,
        success:function(data){
            $('#add_new_record_modal').modal('hide');
            var row='<tr id="row_id_'+data.id+'">'+
            displayColumns(data)+
            '</tr>';
            $('#products').append(row);
        }
    });
}

//update Record
function updateRecord(formData){
    $.ajax({
        url:'/products/'+formData.id,
        type:'PUT',
        accepts:{
            json:'application/json'
        },
        data:formData,
        success:function(data){
            
            console.log("update");
            $('#add_new_record_modal').modal('hide');
            $('#row_id_'+formData.id+'>td.product_name').html(formData.product_name);
            $('#row_id_'+formData.id+'>td.animal_destinated').html(formData.animal_destinated);
            $('#row_id_'+formData.id+'>td.descriptions').html(formData.descriptions);
            $('#row_id_'+formData.id+'>td.price').html(formData.price);
            
            
           
        }
     });
    //          $('#add_new_record_modal').modal('hide');
    //         $('#row_id_'+formData.id+'>td.product_name').html(formData.product_name);
    //         $('#row_id_'+formData.id+'>td.animal_destinated').html(formData.animal_destinated);
    //         $('#row_id_'+formData.id+'>td.descriptions').html(formData.descriptions);
    //         $('#row_id_'+formData.id+'>td.price').html(formData.price);
}

//delete Record
function deleteRecord(id){
    $.ajax({
        url:'/products/'+id,
        type:'DELETE',
        success:function(data){
            $('#row_id_'+id).remove();
            console.log("deleted");
        }
    });
    // $('#row_id_'+id).remove();
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