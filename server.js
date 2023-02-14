
const express = require('express');
const app = express();
let port = 5000;
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://giovanna:1234@cluster0.qwjfzyf.mongodb.net/?retryWrites=true&w=majority');

mongoose.connection.on('connected', function () {
  console.log('Connected to Database ');
});

mongoose.connection.on('error', (err) => {
  console.log('Database error'+err);
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const routes = require("./routes/RestauranteApi");
app.use("/RestauranteApi", routes);

app.listen(process.env.port || port, () =>{
  console.log('Servidor em execução no porto: '+ port);
});

app.get("/", function(req, res){
    res.send("END POINT INVÁLIDO!");
  });

app.use(function(err, req, res, next){
    console.log(err);
   res.status(422).send({error: err.message});
 });



