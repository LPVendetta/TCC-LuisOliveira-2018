var banco = require(__dirname + '\\scripts\\concBanco.js');
const {dialog} = require('electron').remote;

function validarLogin(){
	var login = document.getElementById("login");
	var senha = document.getElementById("senha");

	con = banco.conexaoBD();

	con.query("SELECT * FROM usuarios WHERE Login = ? AND Senha = ?",[login,senha],function(err,result){
		if(err){
			dialog.showErrorBox("ERRO NA GRAVAÇÃO DO ARQUIVO",err);
		}
		else{
			if(result.length > 0){
				dialog.showMessageBox({ message:"GRAVAÇÃO EXECUTADA COM SUCESSO",
					buttons:["OK"] });
				window.location("pagina-inicial.html");
			}
			else{
				dialog.showErrorBox("ERRO DE AUTENTICAÇÃO","Nome de usuário ou senha incorretos");
			}
		}
		con.end();
	})
	
}