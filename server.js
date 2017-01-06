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
     descriptions:{
        type:Sequelize.STRING,
        field:'descriptions'
    },
    price:{
        type:Sequelize.DOUBLE,
        field:'price'
    }
},{
     timestamps: false
});

var Order=sequelize.define('orders',{
    data:{
        type:Sequelize.DATE,
        field:'data'
    },
    name:{
        type:Sequelize.STRING,
        field:'name'
    },
     phone:{
        type:Sequelize.STRING,
        field:'phone'
    },
    email:{
        type:Sequelize.STRING,
        field:'email'
    },
    address:{
        type:Sequelize.STRING,
        field:'address'
    },
     details:{
        type:Sequelize.STRING,
        field:'details'
    },
    total_payment:{
        type:Sequelize.DOUBLE,
        field:'total_payment'
    }
},{
     timestamps: false
});

var Tranzaction=sequelize.define('tranzactions',{
    no_order:{
        type:Sequelize.INTEGER,
        field:'no_order'
    },
    id_product:{
        type:Sequelize.INTEGER,
        field:'id_product'
    },
     price:{
        type:Sequelize.DOUBLE,
        field:'price'
    },
    quantity:{
        type:Sequelize.INTEGER,
        field:'quantity'
    }
    },
    {
     timestamps: false
});
var app=new express();
app.use(bodyParser.json());
app.use(cors());
app.use(nodeadmin(app));
app.use('/admin', express.static('admin'));
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

//create a new order
app.post('/orders',function(request,response){
    Order.create(request.body).then(function(order){
        Order.findById(order.no_order).then(function(order){
             response.status(201).send(order);
        });
    });
});

app.post('/tranzactions',function(request,response){
    Tranzaction.create(request.body).then(function(tranzaction){
        Tranzaction.findById(tranzaction.id_tr).then(function(order){
             response.status(201).send(tranzaction);
        });
    });
});
