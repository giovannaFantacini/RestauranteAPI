  
const Ementa = require('../models/EmentaModels');
const Prato = require('../models/PratoModels');


exports.post = function (req, res) {

    var ementa = new Ementa();
    var pratoList = new Prato();

    ementa.cod = req.body.cod;
    var prato = [];
    prato = req.body.listPratos;
    var sizeList = prato.length

    for(var i=0; i<sizeList; i++){
      Prato.findById(prato[i]._id, function(err, prato) {
        if (err)
            res.send(err);
          pratoList.cod = prato.cod;
          pratoList.name = prato.name;
          pratoList.type = prato.type;
          pratoList._id = prato._id;
          ementa.listPratos.push(pratoList)
      });
    }

    ementa.save(function(err) {
      if (err)
        res.send(err);
      
      res.json(ementa);
  }); 
};
  
  exports.get = function (req, res) {
    Ementa.find(function(err, ementa) {
      if (err)
          res.send(err);

      res.json(ementa);
    });
 };

 exports.getById = function (req, res) {
  Ementa.findById(req.params.ementa_id, function(err, ementa) {
    if (err)
        res.send(err);
    res.json(ementa);
  });
};
  
exports.put = function (req, res, next) {
      Ementa.findById(req.params.ementa_id, function(err, ementa) {
          if (err)
              res.send(err);

          ementa.listPratos = req.body.listPratos;

          ementa.save(function(err) {
              if (err)
                  res.send(err);

              res.json(ementa);
          });

      });
  };
  
exports.delete = function (req, res, next) {
    Ementa.remove({
      _id: req.params.ementa_id
    }, function(err, ementa) {
      if (err)
          res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  };
