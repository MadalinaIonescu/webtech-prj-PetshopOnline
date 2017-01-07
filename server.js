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
        field:'data',
        defaultValue: Sequelize.NOW
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
app.use('/admin/orders.html', express.static('admin/orders.html'));
app.listen(process.env.PORT);
app.use(bodyParser.urlencoded({
   extended: false
}));



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
// app.post('/orders',function(request,response){
//     Order.create(request.body).then(function(order){
//         console.log(request.body);
//         Order.findById(order.id).then(function(order){
//              response.status(201).send(order);
//         });
//     });
// });

// app.post('/orders',function(request,response){
//     Order.create({
//     name: usr,
//     phone: phone,
//     email: email,
//     address:address,
//     details:details,
//     total_payment:total_payment
//   })
//   .complete(function(err, order) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(order);
//     }
//   })
// });

app.post('/orders', function(req, res) {
  Order
    .build({
    name:req.body.name,
    phone:req.body.phone,
    email: req.body.email,
    address:req.body.address,
    details:req.body.details,
    total_payment:req.body.total_payment})
        .save()
        .then(function(order) {
          console.log(req.body);
         Order.findById(order.id).then(function(order){
             res.status(201).send(order);
         });
        });
});

app.post('/tranzactions', function(req, res) {
  Tranzaction
    .build({
    no_order:req.body.no_order,
    id_product:req.body.id_product,
    price: req.body.price,
    quantity:req.body.quantity
    })
        .save()
        .then(function(tranzaction) {
          console.log(req.body);
         Tranzaction.findById(tranzaction.id).then(function(tranzaction){
             res.status(201).send(tranzaction);
         });
        });
});
// app.post('/tranzactions',function(request,response){
//     Tranzaction.create(request.body).then(function(tranzaction){
//         Tranzaction.findById(tranzaction.id).then(function(order){
//              response.status(201).send(tranzaction);
//         });
//     });
// });
