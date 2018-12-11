var exports = module.exports ={};

exports.conexaoBD = function(){
  var mysql = require("mysql");
  var con = mysql.createConnection({
    debug:true,
    host: "localhost",
    user: "sismap",
    password: "sismap",
    database : "sismap"
  });

  con.connect(function(err){
    if(err){
      console.log('Erro de conexão com o banco');
      return;
    }
    console.log('Conexão estabelecida com sucesso');
      
    });

  return con;
}
//con.end(function(err) {
//});