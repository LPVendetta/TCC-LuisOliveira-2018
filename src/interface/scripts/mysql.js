var mysql = require("mysql");

function conectaBD(){
var con = mysql.createConnection({
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
/*
con.end(function(err) {
});
*/

	return con;

}
// 
function cadastrar(){
var Usuario = document.getElementById('Usuario').value;
var Login = document.getElementById('Login').value;
var Senha = document.getElementById('Senha').value;
var FKpessoa = document.getElementById('FK_PessoaID').value;

alert(FKpessoa);

}
  
