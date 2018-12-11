var banco = require(__dirname + '\\scripts\\concBanco.js');
var Baby = require("babyparse");
var fs = require("fs");
const {dialog} = require('electron').remote;
var csv=[];
var data="";
var nomes_tabelas=[];

function visualizarDados(){
	var sql = "SELECT table_name FROM information_schema.tables where table_schema='sismap' AND table_rows >= 1"
	var con = banco.conexaoBD();
	var dados;
	var size;
	
	con.query(sql,function(err,results,fields){
		if(err){
			throw err;
		}
		else{
			for(var i =0;i<results.length;i++){
				//nomes_tabelas.push(results[i]["table_name"]);
				nomes_tabelas.push(results[i]["table_name"]);
				var qr = "SELECT * FROM "+results[i]["table_name"];
				con.query(qr,function(err,result,fields){
					if(err){
						throw err;
					}
					else{
						var line = Baby.unparse(result, {
				        header: true,
				        delimiter:"^",
				        dynamicTyping: true,
				        complete: function(results) {
				            alert("COMPLETE");
				            
				          },
				        });
				        csv.push(line);
				        data+="^"+line;
				        display(result,fields[0].table);
					}
				})
				
			}

			//criaArquivo(nomes_tabelas);
		}
		con.end();
	})  
}

function display(dados,nome_tabela){
	var div = document.getElementById("tabela");
	var html ='<div id="tablewrap"><table class="tablewrap" border="1" cellspacing="0" cellpadding="1">';
			  var cabecalho ="<tr><th>"+nome_tabela+"</th></tr><tr>";
			  var celulas="";
			  var form = document.getElementById("exportarDados");

			  for(rotulo in dados[0]){
			    cabecalho+="<td>"+rotulo+"</td>";  
			  }
			  cabecalho+="</tr>"
			  
			  for (var i = 0;i<dados.length;i++){
			    var d = dados[i];
			    celulas += "<tr>";
			    for(rotulo in d){
			      
			      celulas += "<td>"+JSON.stringify(d[rotulo])+"</td>";
			      //console.log(celulas);
			      //console.log(rotulo,"=",JSON.stringify(d[rotulo]));
			    }
			    celulas+="</tr>";
			  }
			  
			  html+=cabecalho+celulas;
			  html+="</table></div><br><br>";
			  
			  div.innerHTML+=html;

            //import_cont++;
            //alert("GRAVAÇÃO BEM SUCEDIDA!")
            console.log(dados);
}

function criaArquivo(){
	var d = new Date();
	var nome;
	var folderPaths;
	var fileNames;
	var flags = [];
	var erros =[];
	var msg="";

	dialog.showOpenDialog({
	    title:"SELECIONE UMA PASTA PARA EXPORTAÇÃO",
	    properties: ["openDirectory"]
	}, function (folderPaths){
	    // folderPaths is an array that contains all the selected paths
	    if(folderPaths === undefined){
	        console.log("NÃO SELECIONOU PASTA");
	        return;
	    }
	    else{
	        console.log(folderPaths);
	        for(var i=0;i<csv.length;i++){
	        	if(csv[i]!==""){
					//console.log("tempo"+t);
					nome = folderPaths+"\\"+nomes_tabelas[i]+"_export_"+d.getTime()+i;
					nome+=".txt";
					console.log(nome);
					fs.writeFile(nome, csv[i], function(err) {
					    if(err) {
					    	flags.push(nome);
					    	erros.push(err.message);
					        return console.log(err);
					    }
					    else{
					    	console.log("The file "+nome+" was \n saved!");
					    }
			    
					});
				}
			}
			if(flags.length > 0){
				for (var i=0;i<flags.length;i++){
					msg+="ARQUIVO: "+flags[i]+" - ERRO: "+erros[i]+" \n";
				}
				dialog.showErrorBox("ERRO NA GRAVAÇÃO DO ARQUIVO",msg);
			}
			else{
				dialog.showMessageBox({ message:"GRAVAÇÃO EXECUTADA COM SUCESSO",
					buttons:["OK"] });
			}
	    }
	});	 
}

function criaArquivoUnico(){
	var d = new Date();
	var con = banco.conexaoBD();
	var nome;
	var folderPaths;
	var fileNames;
	var flags = [];
	var erros =[];
	var msg="";
	var sql = "SELECT * FROM ";
	for (var i=0;i<nomes_tabelas.length;i++){
		if (i<nomes_tabelas.length-1)
			sql+=nomes_tabelas[i]+",";
		else
			sql+=nomes_tabelas[i];
	}
	console.log("sql: "+sql);
	
	con.query(sql,[nomes_tabelas],function(err,result){
		if(err){
			throw err;
		}
		else{
			console.log("RESULTADO: "+result);
		}
		con.end();
	})

	dialog.showOpenDialog({
	    title:"SELECIONE UMA PASTA PARA EXPORTAÇÃO",
	    properties: ["openDirectory"]
	}, function (folderPaths){
	    // folderPaths is an array that contains all the selected paths
	    if(folderPaths === undefined){
	        console.log("NÃO SELECIONOU PASTA");
	        return;
	    }
	    else{
	        console.log(folderPaths);
	        nome = folderPaths+"\\SISMAP_export_"+d.getTime();
			nome+=".txt";
			fs.writeFile(nome,data, function(err) {
					    if(err) {
					    	flags.push(nome);
					    	erros.push(err.message);
					        return console.log(err);
					    }
					    else{
					    	console.log("The file "+nome+" was \n saved!");
					    }
			    
					});
	        
			if(flags.length > 0){
				for (var i=0;i<flags.length;i++){
					msg+="ARQUIVO: "+flags[i]+" - ERRO: "+erros[i]+" \n";
				}
				dialog.showErrorBox("ERRO NA GRAVAÇÃO DO ARQUIVO",msg);
			}
			else{
				dialog.showMessageBox({ message:"GRAVAÇÃO EXECUTADA COM SUCESSO",
					buttons:["OK"] });
			}
	    }
	});	
}