var banco = require(__dirname + '\\scripts\\concBanco.js');
var hash = require(__dirname + '\\scripts\\hash.js');
var con = banco.conexaoBD();

function checaUsrSenha(form){

	var usrname = form.elements["usrname"].value;
	var senha = form.elements["senha"].value;
	

	var sql = "select * from usuario where(Login = ? and Senha = ?)"

	con.query(sql,[usrname,senha], function(err,result){
			            if(err) {
			            	window.alert(err.message);
			            	//throw err;
			            	location.reload();
			            }
			            else{
			            	var u = result.length;
			            	console.log(u);
			            	
			            	if(u==0){
			            		window.alert("USUÁRIO NÃO CADASTRADO");
				            	location.reload();
			            	}
			            	else{
				            	if(result[0]["Tipo"] == 2){
				            		//console.log(result);
				            		window.location.href = __dirname + '\\telaUsuario.html';
				            	}
				            	else if(result[0]["Tipo"] == 0){
				            		//console.log(result);
				            		window.location.href = __dirname + '\\telaAdministrador.html';
				            	}
			            	}
			          	}


	});

	//console.log(usrname,senha);
}

function novoCadastro(form){
	var nome = form.elements["nome"].value;
	var usrname = form.elements["usrname"].value;
	var senha = form.elements["senha"].value;
	var tipousuario = form.elements["tipousuario"].value;

	if(nome.length==0||usrname.length==0||senha.length==0||tipousuario.length==0){
		window.alert("TODOS OS CAMPOS SÃO OBRIGATÓRIOS");
		location.reload();	
	}else{
		var pessoaID = hash.geraHash(nome,usrname,senha);
		var usuarioID = hash.geraHash(usrname,senha,tipousuario);

		var sqlPessoa = "INSERT INTO pessoa (PessoaID, Nome) VALUES (?);";
		var sqlUsuario = "INSERT INTO usuario (UsuarioID, Login, Senha, Tipo, FK_PessoaID) VALUES (?);"

		var valoresPessoa = [];
		valoresPessoa.push(pessoaID);
		valoresPessoa.push(nome);

		var valoresUsuario = [];
		valoresUsuario.push(usuarioID);
		valoresUsuario.push(usrname);
		valoresUsuario.push(senha);
		valoresUsuario.push(tipousuario);
		valoresUsuario.push(pessoaID);

		con.query(sqlPessoa,[valoresPessoa], function(err,result){
				            if(err){
				            	window.alert(err.message);
				            	//throw err;
				            	location.reload();
				            	
				            } 

				            else{
				            	con.query(sqlUsuario,[valoresUsuario], function(err,result){
				            				            if(err) {
				            				            	window.alert(err.message);
				            				            	//throw err;
				            				            	location.reload();
				            				            	
				            				            }
				            				            else{
				            					            window.alert("USUÁRIO CADASTRADO");
				            					            location.reload();
				            				            }
				            						});
				            }

		});
	}

}