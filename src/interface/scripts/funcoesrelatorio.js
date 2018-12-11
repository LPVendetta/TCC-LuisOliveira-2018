var banco = require(__dirname + '\\scripts\\concBanco.js');
var d3 = require("d3");
//var d3 = require(__dirname + '\\scripts\\d3\\d3.js');              

function geraGrafico(valores,total,id){
	
	//var dataArray = [30, 15, 50];
	console.log(valores);
	console.log(total);

	console.log("teste d3");
	console.log(d3.scale);

	var width = 500;
	var height = valores.length*100;
	var tela = "#"+id;

	var widthScale = d3.scaleLinear()
					.domain([0,total])
					.range([0,width]);

	var colorScale = d3.scaleLinear()
					.domain([0,total])
					.range(["indianred","lightblue"]);

	var canvas = d3.select(tela)
					.append("div")
					.attr("class", "grafico")
					.style("width", function(d) { return (widthScale(total)+50) + "px"; });
					

					/**.append("svg")
					.attr("width", width)
					.attr("height", height);*/

	var bars = canvas.selectAll("div")
						.data(valores)
						.enter().append("div")
						.style("width", function(d) { return widthScale(d.value) + "px"; })
						.style("background-color", function(d) { return colorScale(d.value); })
						.text(function(d) { return d.label; });
						
	//canvas.append("text")
}

function geraRelatorios (id){
	var unidade = document.getElementById("unidade").value;
	console.log("UNIDADE:");
	console.log(unidade);

	switch(id){
		case "rSexo":

			var con = banco.conexaoBD();
	        	var qtotal = 'select count(*) from pessoa where (FK_Unidade_Organizacional = ? or FK_Unidade_Trabalho= ? or FK_Unidade_Intermediaria= ?)';
	        	var qmasc='select count(*) from pessoa where sexo = 2 and(FK_Unidade_Organizacional = ? or FK_Unidade_Trabalho=? or FK_Unidade_Intermediaria=?)';
	        	var qfem='select count(*) from pessoa where sexo=1 and(FK_Unidade_Organizacional = ? or FK_Unidade_Trabalho=? or FK_Unidade_Intermediaria=?);';
	        	var total, masc, fem;
        	con.query(qtotal,[unidade,unidade,unidade], function(err,result){
	            if(err) throw err;
	            
	            total = result[0]["count(*)"];
	            console.log(total);
	        	
	        	con.query(qmasc,[unidade,unidade,unidade], function(err,result){
		            if(err) throw err;
		            
		            masc = result[0]["count(*)"];
		            console.log(masc);

		            con.query(qfem,[unidade,unidade,unidade], function(err,result){
			            if(err) throw err;
			            
			            fem = result[0]["count(*)"];
			            console.log(fem);

			            var percmasc = ((masc/total)*100);
            			var percfem = ((fem/total)*100);

			            var divRelatorio = "<div id='relatorio'>"+
							"<p>"+
								"Percentual de Funcionários do Sexo Masculino: "+Math.round(percmasc)+"% ("+masc+" de "+total+")"+
								"<br>"+
								"Percentual de Funcionários do Sexo Feminino: "+Math.round(percfem)+"% ("+fem+" de "+total+")"+
								"<br>"+
							"</p>"+
							"</div>";

						var div = document.getElementById(id);
						div.insertAdjacentHTML("beforeend",divRelatorio);
						var grafico = geraGrafico([{label:"Sexo Masculino", value:masc},{label:"Sexo Feminino", value:fem}],total,id);
						//div. insertAdjacentHTML("beforeend",grafico);

		            });


	            });    
	            

            });

		break;
		case "rDeficiencia":
			var con = banco.conexaoBD();
	        	var qtotal = 'select count(*) from pessoa where (FK_Unidade_Organizacional = ? or FK_Unidade_Trabalho= ? or FK_Unidade_Intermediaria= ?)';
	        	var qdef="SELECT count(*) "+
						"FROM servidor "+
						"INNER JOIN pessoa ON (servidor.FK_PessoaID=pessoa.PessoaID "+
						"and "+
						"servidor.DeficienciaFisica=1 "+
						"and "+
						"(pessoa.FK_Unidade_Organizacional = ? "+
						"or "+
						"pessoa.FK_Unidade_Trabalho= ? "+
						"or "+
						"pessoa.FK_Unidade_Intermediaria= ?)"+
						");";

	        	var qndef="SELECT count(*)"+
						"FROM servidor "+
						"INNER JOIN pessoa ON (servidor.FK_PessoaID=pessoa.PessoaID "+
						"and "+
						"servidor.DeficienciaFisica=0 "+
						"and "+
						"(pessoa.FK_Unidade_Organizacional = ? "+
						"or "+
						"pessoa.FK_Unidade_Trabalho= ? "+
						"or "+
						"pessoa.FK_Unidade_Intermediaria= ?)"+
						");";

	        	var total, def, ndef;
        	con.query(qtotal,[unidade,unidade,unidade], function(err,result){
	            if(err) throw err;
	            
	            total = result[0]["count(*)"];
	            console.log(total);
	        	
	        	con.query(qdef,[unidade,unidade,unidade], function(err,result){
		            if(err) throw err;
		            
		            def = result[0]["count(*)"];
		            console.log(def);

		            con.query(qndef,[unidade,unidade,unidade], function(err,result){
			            if(err) throw err;
			            
			            ndef = result[0]["count(*)"];
			            console.log(ndef);

			            var percdef = ((def/total)*100);
            			var percndef = ((ndef/total)*100);

			            var divRelatorio = "<div id='relatorio'>"+
							"<p>"+
								"Percentual de Funcionários com Necessidades Especiais: "+Math.round(percdef)+"% ("+def+" de "+total+")"+
								"<br>"+
								"Percentual de Funcionários sem Necessidades Especiais: "+Math.round(percndef)+"% ("+ndef+" de "+total+")"+
								"<br>"+
							"</p>"+
							"</div>";

						var div = document.getElementById(id);
						div.insertAdjacentHTML("beforeend",divRelatorio);
						var grafico = geraGrafico([{label:"Necessidades Especiais", value:def},{label:"Sem Necessidades Especiais", value:ndef}],total,id);
					});
				});    
	        });
		break;
		case "rVinculo":
			var con = banco.conexaoBD();
				var qtotal = 'select count(*) from pessoa where (FK_Unidade_Organizacional = ? or FK_Unidade_Trabalho= ? or FK_Unidade_Intermediaria= ?)';
	        	var qterc = "SELECT count(*)"+
						"FROM pessoa "+
						"INNER JOIN tiposervico ON (pessoa.TipoServico=tiposervico.TipoServicoID "+
						"and "+
						"tiposervico.TipoServicoID = 1 "+
						"and "+
						"(pessoa.FK_Unidade_Organizacional = ? "+
						"or "+
						"pessoa.FK_Unidade_Trabalho= ? "+
						"or "+
						"pessoa.FK_Unidade_Intermediaria= ?))";
	        	var qcedido="SELECT count(*) "+
						"FROM pessoa "+
						"INNER JOIN tiposervico ON (pessoa.TipoServico=tiposervico.TipoServicoID "+
						"and "+
						"tiposervico.TipoServicoID = 7 "+
						"and "+
						"(pessoa.FK_Unidade_Organizacional = ? "+
						"or "+
						"pessoa.FK_Unidade_Trabalho= ? "+
						"or "+
						"pessoa.FK_Unidade_Intermediaria= ?))";

	        	var qtecad="SELECT count(*) "+
						"FROM pessoa "+
						"INNER JOIN tiposervico ON (pessoa.TipoServico=tiposervico.TipoServicoID "+
						"and "+
						"tiposervico.TipoServicoID = 4 "+
						"and "+
						"(pessoa.FK_Unidade_Organizacional = ? "+
						"or "+
						"pessoa.FK_Unidade_Trabalho= ? "+
						"or "+
						"pessoa.FK_Unidade_Intermediaria= ?))";

	        	var total, terc, tecad, cedido;
        	con.query(qtotal,[unidade,unidade,unidade], function(err,result){
	            if(err) throw err;
	            
	            total = result[0]["count(*)"];
	            console.log(total);
	        	
	        	con.query(qterc,[unidade,unidade,unidade], function(err,result){
		            if(err) throw err;
		            
		            terc = result[0]["count(*)"];
		            console.log(terc);

		            con.query(qcedido,[unidade,unidade,unidade], function(err,result){
			            if(err) throw err;
			            
			            cedido = result[0]["count(*)"];
			            console.log(cedido);

			            con.query(qtecad,[unidade,unidade,unidade], function(err,result){
				            if(err) throw err;
				            
				            tecad = result[0]["count(*)"];
				            console.log(tecad);

					            var percterc = ((terc/total)*100);
		            			var perccedido = ((cedido/total)*100);
		            			var perctecad= ((tecad/total)*100);

					            var divRelatorio = "<div id='relatorio'>"+
									"<p>"+
										"Percentual de Funcionários Terceirizados: "+Math.round(percterc)+"% ("+terc+" de "+total+")"+
										"<br>"+
										"Percentual de Funcionários Cedidos/Reintegrados: "+Math.round(perccedido)+"% ("+cedido+" de "+total+")"+
										"<br>"+
										"Percentual de Funcionários Técnico Administrativos: "+Math.round(perctecad)+"% ("+tecad+" de "+total+")"+
										"<br>"+
									"</p>"+
									"</div>";

								var div = document.getElementById(id);
								var v = [
									{label: "Terceirizados", value: terc},
									{label: "Cedidos", value: cedido},
									{label: "Técnico Administrativos", value: tecad}
								]
								div.insertAdjacentHTML("beforeend",divRelatorio);
								var grafico = geraGrafico(v,total,id);
						});
					});
				});    
	        });
		break;
		case "rFaixaEtaria":
			var con = banco.conexaoBD();
				var qtotal = 'select count(*) from pessoa where (FK_Unidade_Organizacional = ? or FK_Unidade_Trabalho= ? or FK_Unidade_Intermediaria= ?)';
	        	var q2030 = "select count(*) "+
						"from pessoa "+
						"where "+
							"year(curdate()) - year(STR_TO_DATE(DataNascimento,'%Y-%m-%d')) between ? and ? "+
						"and "+
						"(pessoa.FK_Unidade_Organizacional = ? "+
						"or "+
						"pessoa.FK_Unidade_Trabalho= ? "+
						"or "+
						"pessoa.FK_Unidade_Intermediaria= ?)";
	        	var q3140="select count(*) "+
						"from pessoa "+
						"where "+
							"year(curdate()) - year(STR_TO_DATE(DataNascimento,'%Y-%m-%d')) between 31 and 40 "+
						"and "+
						"(pessoa.FK_Unidade_Organizacional = ? "+
						"or "+
						"pessoa.FK_Unidade_Trabalho= ? "+
						"or "+
						"pessoa.FK_Unidade_Intermediaria= ?)";

	        	var q4150="select count(*) "+
						"from pessoa "+
						"where "+
							"year(curdate()) - year(STR_TO_DATE(DataNascimento,'%Y-%m-%d')) between 41 and 50 "+
						"and "+
						"(pessoa.FK_Unidade_Organizacional = ? "+
						"or "+
						"pessoa.FK_Unidade_Trabalho= ? "+
						"or "+
						"pessoa.FK_Unidade_Intermediaria= ?)";

				var q5160 = "select count(*) "+
						"from pessoa "+
						"where "+
							"year(curdate()) - year(STR_TO_DATE(DataNascimento,'%Y-%m-%d')) between 51 and 60 "+
						"and "+
						"(pessoa.FK_Unidade_Organizacional = ? "+
						"or "+
						"pessoa.FK_Unidade_Trabalho= ? "+
						"or "+
						"pessoa.FK_Unidade_Intermediaria= ?)";

				var qmaior60 = "select count(*) "+
						"from pessoa "+
						"where "+
							"year(curdate()) - year(STR_TO_DATE(DataNascimento,'%Y-%m-%d')) > 60 "+
						"and "+
						"(pessoa.FK_Unidade_Organizacional = ? "+
						"or "+
						"pessoa.FK_Unidade_Trabalho= ? "+
						"or "+
						"pessoa.FK_Unidade_Intermediaria= ?)";

	        	var total, f2030, f3140, f4150, f5160, fmaior60;
        	con.query(qtotal,[unidade,unidade,unidade], function(err,result){
	            if(err) throw err;
	            
	            total = result[0]["count(*)"];

	        	
	        	con.query(q2030,[20,30,unidade,unidade,unidade], function(err,result){
		            if(err) throw err;
		            
		            f2030 = result[0]["count(*)"];

		            con.query(q3140,[unidade,unidade,unidade], function(err,result){
			            if(err) throw err;
			            
			            f3140 = result[0]["count(*)"];

			            con.query(q4150,[unidade,unidade,unidade], function(err,result){
				            if(err) throw err;
				            
				            f4150 = result[0]["count(*)"];

				            con.query(q5160,[unidade,unidade,unidade], function(err,result){
				            	if(err) throw err;
				            
					            f5160 = result[0]["count(*)"];

					            con.query(qmaior60,[unidade,unidade,unidade], function(err,result){
					            	if(err) throw err;
				            
					            	fmaior60 = result[0]["count(*)"];

						            var perc2030 = ((f2030/total)*100);
			            			var perc3140 = ((f3140/total)*100);
			            			var perct4150 = ((f4150/total)*100);
			            			var perct5160 = ((f5160/total)*100);
			            			var perctmaior60 = ((fmaior60/total)*100);

						            var divRelatorio = "<div id='relatorio'>"+
										"<p>"+
											"20 a 30 anos: "+Math.round(perc2030)+"% ("+f2030+" de "+total+")"+
											"<br>"+
											"31 a 40 anos: "+Math.round(perc3140)+"% ("+f3140+" de "+total+")"+
											"<br>"+
											"41 a 50 anos: "+Math.round(perct4150)+"% ("+f4150+" de "+total+")"+
											"<br>"+
											"51 a 60 anos: "+Math.round(perct5160)+"% ("+f5160+" de "+total+")"+
											"<br>"+
											"Mais de 60 anos: "+Math.round(perctmaior60)+"% ("+fmaior60+" de "+total+")"+
											"<br>"+
										"</p>"+
										"</div>";

									var div = document.getElementById(id);
									var v = [
										{label: "20-30", value: f2030},
										{label: "31-40", value: f3140},
										{label: "41-50", value: f4150},
										{label: "51-60", value: f5160},
										{label: "+60", value: fmaior60}
									]
									div.insertAdjacentHTML("beforeend",divRelatorio);
									var grafico = geraGrafico(v,total,id);
								});
							});
						});
					});
				});    
	        });
		break;
    }
}

	
