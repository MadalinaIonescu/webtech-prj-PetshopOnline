var express=require("express");
var bodyParser=require("body-parser");
var cors=require("cors");
var nodeadmin=require("nodeadmin");
var Sequelize=require("sequelize");

var sequelize = new Sequelize('petshop_online', 'madalinaionescu', '', {
    dialect: 'mysql',
    host:'127.0.0.1',
    port: 3306
});


var Product=sequelize.define('products',{
    product_name:{
        type:Sequelize.STRING,
        field:'product_name'
    },
    animal_destinated:{
        type:Sequelize.STRING,
        field:'animal_destinated'
    },
     description:{
        type:Sequelize.STRING,
        field:'description'
    },
    price:{
        type:Sequelize.DOUBLE,
        field:'price'
    }
},{
     timestamps: false
});

// var Order=sequelize.define('orders',{
//     data:{
//         type:Sequelize.DATE,
//         field:'data'
//     },
//     name:{
//         type:Sequelize.STRING,
//         field:'name'
//     },
//      phone:{
//         type:Sequelize.STRING,
//         field:'phone'
//     },
//     email:{
//         type:Sequelize.STRING,
//         field:'email'
//     },
//     address:{
//         type:Sequelize.STRING,
//         field:'address'
//     },
//      details:{
//         type:Sequelize.STRING,
//         field:'details'
//     },
//     total_payment:{
//         type:Sequelize.DOUBLE,
//         field:'total_payment'
//     }
// },{
//      timestamps: false
// });

var app=new express();
app.use(bodyParser.json());
app.use(cors());
app.use(nodeadmin(app));
app.listen(process.env.PORT);



// //create a new product
app.post('/products',function(request,response){
    Product.create(request.body).then(function(product){
        Product.findById(product.id).then(function(product){
             response.status(201).send(product);
        });
    });
});


//read all products
app.get('/products',function(request,response){
  Product.findAll().then(function(products){
  response.status(201).send(products); 
  });
});


//read one product using the id
app.get('/products/:id',function(request,response){
    Product.findById(request.params.id).then(function(product){
        if(product){
              response.status(200).send(product);
        }
        else{
            response.status(404).send();
        }
    });
});

//update a product using the id
app.put('/products/:id',function(request,response){
  Product.findById(request.params.id).then(function(product){
        if(product){
            product.updateAttributes(request.body)
            .then(function(){
                response.status(200).send('Updated!');
            })
            .catch (function(error){
                response.status(500).send('Server error!');
            });
        }
        else
        {
             response.status(404).send();
        }
  }); 
});

//delete one product using the id
app.delete('/products/:id',function(request,response){
    Product.findById(request.params.id).then(function(product){
        if(product){
            product.destroy()
            .then(function(){
                response.status(204).send();
            })
            .catch (function(error){
                response.status(500).send('Server error!');
            });
        }
        else
        {
             response.status(404).send();
        }
  }); 
});