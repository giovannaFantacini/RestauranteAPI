const Reserva = require('../models/ReservaModels');
var APICurso = require('node-rest-client').Client;

  exports.post = function (req, res, next) {

    var reserva = new Reserva();
    var cliente = new APICurso();
    //var aluno = new aluno();

    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

    reserva.cod = req.body.cod;
    reserva.pratoReservado = req.body.prato;

    var num_aluno = req.body.NumAluno

    cliente.get("https://localhost:7225/api/alunos/" + num_aluno, function (infoAluno, response){
      var NumAluno = num_aluno;
      var NomeAluno = infoAluno.nome;
      var EmailAluno = infoAluno.email;

      reserva.aluno = {NumAluno:NumAluno, NomeAluno:NomeAluno, EmailAluno:EmailAluno}

      if(infoAluno.saldo < 4.00){
        res.send("Saldo insuficiente");
      }

      var args = {
        "headers": { "Content-Type": "application/json"},
        "data": {"NumeroRec": num_aluno, "saldo": -4.00}
      };

      cliente.put("https://localhost:7225/api/alunos/saldo/" + num_aluno, args, function (response){
        console.log("Put Realizado");
        console.log(response);
      })

     
      reserva.save(function(err) {
        if (err)
          res.send(err);
        
        res.json(reserva);
      })

    
  }); 
};
  
  exports.get = function (req, res) {
    Reserva.find(function(err, reserva) {
      if (err)
          res.send(err);

      res.json(reserva);
    });
 };

 exports.getById = function (req, res) {
  Reserva.findById(req.params.reserva_id, function(err, reserva) {
    if (err)
        res.send(err);
    res.json(reserva);
  });
};

exports.getByNumAluno = function (req, res) {
  Reserva.find({aluno:{$elemMatch:{NumAluno: req.params.reserva_num}} }, function(err, reserva){
    if(err)
      res.send(err);

    res.json(reserva);
  });
};
  
exports.put = function (req, res, next) {
      Reserva.findById(req.params.reserva_id, function(err, reserva) {
          if (err)
              res.send(err);


          var cliente = new APICurso();
          reserva.cod = req.body.cod;
          reserva.pratoReservado = req.body.prato;

          process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
      
          var num_aluno = req.body.NumAluno
          if(reserva.aluno.NumAluno != num_aluno){
              cliente.get("https://localhost:7225/api/alunos/saldo" + num_aluno, function (infoAluno, response){
                reserva.aluno.NumAluno = num_aluno;
                reserva.aluno.NomeAluno = infoAluno.nome;
                reserva.aluno.EmailAluno = infoAluno.email;

                if(infoAluno.saldo < 4.00){
                  res.send("Saldo insuficiente");
                }
          
                var args = {
                  "headers": { "Content-Type": "application/json"},
                  "data": {"NumeroRec": num_aluno, "saldo": -4.00}
                };
          
                cliente.put("https://localhost:7225/api/alunos/" + num_aluno +  "/saldo", args, function (response){
                  console.log("Put Realizado");
                  console.log(response);
                })

                reserva.save(function(err) {
                  if (err)
                      res.send(err);
            
                  res.json(reserva);
              })
        
            
            }); 
          }

      });
  };
  
  exports.delete = function (req, res, next) {
    Reserva.findById(req.params.reserva_id, function(err, reserva) {
      
      var cliente = new APICurso();
      var num_aluno = reserva.aluno[0].NumAluno;
      process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

      var args = {
        "headers": { "Content-Type": "application/json"},
        "data": {"NumeroRec": num_aluno, "saldo": 4.00}
      };

      cliente.put("https://localhost:7225/api/alunos/saldo/" + num_aluno, args, function (response){
        console.log("Put Realizado");
        console.log(response);

        Reserva.remove({
          _id: req.params.reserva_id
        }, function(err, reserva) {
          if (err)
              res.send(err);
          
          res.json({ message: 'Successfully deleted' });
        });

      })
    });
    
  };
