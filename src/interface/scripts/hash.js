var exports = module.exports = {};

exports.geraHash = function(conteudo){
  var c = JSON.stringify(conteudo);
  var crypto = require("crypto");

  var r = crypto.createHash('sha512').update(c).digest('hex');
  
  return r;
}