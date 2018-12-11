var banco = require(__dirname + '\\scripts\\concBanco.js');
var hash = require(__dirname + '\\scripts\\hash.js');

function checar(nome){
	var campos = document.forms[nome].getElementsByTagName("input");
	var i;
	var cont =0;
	for (i=0;i<campos.length;i++){
		if(campos[i].value === "")
			cont ++;
	}
	if(cont>0)
		return false;
	else
		return true;
}

function salvar(){
	var forms = document.forms;
	for (var i=0;i<forms.length;i++){
		switch(forms[i].id){
			case "controle":
				if (checar("controle")){
				var n1 = document.getElementById("n1").value;
				var n2 = document.getElementById("n2").value;
				var n3 = document.getElementById("n3").value;
				var n4 = document.getElementById("n4").value;
				var NomeEntrevistador = document.getElementById("NomeEntrevistador").value;
				var DataEntrevista = document.getElementById("DataEntrevista").value;
				var NomeRespReceb = document.getElementById("NomeRespReceb").value;
				var DataRecebimento = document.getElementById("DataRecebimento").value;
				var NomeControle = document.getElementById("NomeControle").value;
				var DataControle = document.getElementById("DataControle").value;
				var NomeCritica = document.getElementById("NomeCritica").value;
				var DataCritica = document.getElementById("DataCritica").value;
				var NomeDigitacao = document.getElementById("NomeDigitacao").value;
				var DataDigitacao = document.getElementById("DataDigitacao").value;
				var NomeCordLocal = document.getElementById("NomeCordLocal").value;
				var DataCordLocal = document.getElementById("NomeCordLocal").value;
				var NomeCordGeral = document.getElementById("NomeCordGeral").value;
				var DataCordGeral = document.getElementById("DataCordGeral").value;
				var HoraEntrevita = document.getElementById("HoraEntrevita").value;
				var entrevistadorID = 654321;
				var entrevistadoID = 123456;
				
				var con = banco.conexaoBD();
				con.connect();

				var valores=[];
				valores.push(n1);
				valores.push(entrevistadorID);
				valores.push(entrevistadoID);
				valores.push(DataEntrevista);
				valores.push(NomeRespReceb);
				valores.push(DataRecebimento);
				valores.push(NomeControle);
				valores.push(DataControle);
				valores.push(NomeCritica);
				valores.push(DataCritica);
				valores.push(NomeDigitacao);
				valores.push(DataDigitacao);
				valores.push(HoraEntrevita);

				var sql = "INSERT INTO entrevista(NumeroIdentificacao,FK_EntrevistadorID,FK_EntrevistadoID,Data,ResponsavelRecebimento,DataRecebimento,ControleAvaliacao,DataAvaliacao,CriticoID,DataCritica,DigitadorID,DataDigitacao,HoraInicio) VALUES (?);";
      
		      	con.query(sql,[valores],function(err,result){
		          if(err){
		            throw err;
		          }
		          else{
		          	alert("GRAVAÇÃO FINALIZADA");
		            console.log(result);
		            //alert("GRAVAÇÃO BEM SUCEDIDA!")
		          }
		          con.end;
		        })


				}
				else
					alert("CAMPOS EM BRANCO NO FORMULÁRIO");
				break;
			case "blocoA":
				console.log("BLOCO A");
				break;
			case "blocob":
				console.log("BLOCO B");
				break;
		}
	}

}

function geraHash(conteudo){
  var c = JSON.stringify(conteudo);
  var crypto = require("crypto");
  var r = crypto.createHash('sha512').update(c).digest('hex');
  return r;
}