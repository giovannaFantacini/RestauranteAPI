  
  const Prato = require('../models/PratoModels');

  exports.post = function (req, res, next) {

    var prato = new Prato();

    prato.name = req.body.name;

    if ( req.body.type == "peixe" ||  req.body.type == "carne" ||  req.body.type == "vegetariano"){
      prato.type = req.body.type;
    }else{
      res.send("Invalid Type");
    }
    prato.cod = req.body.cod;

    prato.save(function(err) {
      if (err)
          res.send(err);

      res.json(prato);
  }); 
};
  
  exports.get = function (req, res) {
    Prato.find(function(err, prato) {
      if (err)
          res.send(err);

      res.json(prato);
    });
 };

 exports.getById = function (req, res) {
  Prato.findById(req.params.prato_id, function(err, prato) {
    if (err)
        res.send(err);
    res.json(prato);
  });
};
  
exports.put = function (req, res, next) {
      Prato.findById(req.params.prato_id, function(err, prato) {
          if (err)
              res.send(err);

          prato.name = req.body.name;

          if ( req.body.type == "peixe" ||  req.body.type == "carne" ||  req.body.type == "vegetariano"){
              prato.type = req.body.type;
          }else{
              res.send("Invalid Type");
          }
          prato.save(function(err) {
              if (err)
                  res.send(err);

              res.json(prato);
          });

      });
  };
  
  exports.delete = function (req, res, next) {
    Prato.remove({
      _id: req.params.prato_id
    }, function(err, prato) {
      if (err)
          res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  };
