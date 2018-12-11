var banco = require(__dirname + '\\scripts\\concBanco.js');
var hash = require(__dirname + '\\scripts\\hash.js');
var blocos_validados=0;

var respostas ={};
var cursos =[];
var opnioes=[];

/**
var controle = {};
var blocoA = {};
var blocoB = {};
var blocoC = {};
var blocoD = {};
var blocoE = {};
var blocoF = {};
var blocoG = {};
var blocoH = {};
var blocoI = {};
var blocoJ = {};
var blocoL = {};
var blocoM = {};
*/
function validarForm(f) {
	// função que valida se os campos requeridos no form foram preenchidos
	var form = f;
	var nome = f.id;
	console.log(form.getElementsByClassName("campo").length);
	var campos = form.getElementsByClassName("campo");
	for(var i=0;i<campos.length-1;i++){
		if(form.elements[i].checkValidity()==false){
			alert(form.elements[i].validationMessage);
			form.elements[i].focus();
			return;
		}
		else{
			if(form.elements[i].value === null || form.elements[i].value === undefined || form.elements[i].value ===""||typeof form.elements[i].value == 'undefined'){
				form.elements[i].value = 88;
				window.alert("VALIDAÇÃO EXECUTADA");
				//console.log(campos);
				//preencheObjs(form);
			}
			//form.getElementById("salvar").disabled="false";
			
		}
	}
	for(var c of campos){
		console.log(c.id+"=="+c.value);
	}
	
	preencheObjs(form);
	return true;
}

function preencheObjs(f){
	var form=f;
	var nome=form.getAttribute("id");
	console.log(nome);
	var campos = form.getElementsByClassName("campo");
	console.log(campos.length);
	switch(nome){
		case "controle":
			for (var i = 1; i<=campos.length+1;i++){
		    	respostas['n'+i] = document.getElementById('n'+i).value;
			}
			blocos_validados++;
			break;
		case "blocoA":
			for (var i=1 ; i <=campos.length; i++) {
			    respostas['a'+i] = document.getElementById('a'+i).value;
			}
			blocos_validados++;
			break;
		case "blocoB":
			console.log("chegou");
			for (var i = 1 ; i <= campos.length; i++) {
			    respostas['b'+i] = document.getElementById('b'+i).value;
			}
			blocos_validados++;
			break;
		/**case "blocoC":
			for (var i = 1 ; i <= campos.length; i++) {
			    respostas['c'+i] = document.getElementById('c'+i).value;
			}
			blocos_validados++;
			break;*/
		case "blocoD":
			for (var i = 1 ; i <= campos.length; i++) {
			    respostas['d'+i] = document.getElementById('d'+i).value;
			}
			blocos_validados++;
			break;
		case "blocoE":
			getOpniao(campos);
			blocos_validados++;
			break;
		case "blocoF":
			getOpniao(campos);
			blocos_validados++;
			break;
		case "blocoG":
			getOpniao(campos);
			blocos_validados++;
			break;
		case "blocoH":
			getOpniao(campos);
			blocos_validados++;
			break;
		case "blocoI":
			for (var i = 1 ; i <= campos.length; i++) {
			    respostas['i'+i] = document.getElementById('i'+i).value;
			}
			blocos_validados++;
			break;
		case "blocoJ":
			getOpniao(campos);
			blocos_validados++;
			break;
		/**
		*CHECAR SE N E MELHOR POR N6 E O1 NUM BLOCO A PARTE
		*/
		case "blocoL":
			for (var i = 1 ; i <= campos.length; i++) {
			    respostas['l'+i] = document.getElementById('l'+i).value;
			}
			
			blocos_validados++;
			break;
		case "blocoM":
			for (var i = 1 ; i <= campos.length-2; i++) {
			    respostas['m'+i] = document.getElementById('m'+i).value;
			}
			respostas['n6']=document.getElementById('n6').value;
			respostas['o1']=document.getElementById('53').value;		// 53=id do campo de observações
			getOpniao(document.getElementById('53'));
			//console.log(document.getElementById('53'))
			blocos_validados++;
			break;
		case "dinamicGrad":
			getGrad(f);
			break;
		case "dinamicCapac":
			getCapac(f);
			break;
		case "dinamicOutraAtiv":
			getOpniao(campos);
			break;
	}
	console.log(respostas);

	if (blocos_validados>=12){
		document.getElementById("gravar").disabled=false;
	}

}

function checaVazio(c){
	console.log("Campo A checar:");
	console.log(c);

	if((!c)||(c===88)||(c==="VAZIO")||(c==="88"))
		return false;
	
	return true;
}

function gravarDados(){
	var conteudo = respostas["a1"]+respostas["a2"]+respostas["a3"];
	var pessoaid = hash.geraHash(conteudo);
	var valuesPessoa, valuesServidor,valuesTecnicoAdm,valuesDocente;
	var valuesDocenteTecnico;




	if(checaVazio(respostas["a1"])){
		valuesPessoa=[[pessoaid, respostas["a1"], respostas["a2"], respostas["a3"], respostas["a29"], 
		respostas["a30"], respostas["a31"], respostas["b2"], respostas["b1"], respostas["a5"], respostas["n4"],
		respostas["n3"],respostas["n2"]]];
	}

	if(checaVazio(respostas["a6"])){
		valuesServidor =[[pessoaid, respostas["a6"], respostas["a4"], respostas["a7"], respostas["a8"], 
		respostas["a9"], respostas["a10"], respostas["a11"], respostas["a12"], respostas["a13"], respostas["a14"], 
		respostas["a15"], respostas["a16"], respostas["a24"], respostas["a25"], respostas["a26"], respostas["a27"], 
		respostas["a28"]]];
	}

	if(checaVazio(respostas["a17"])){
		valuesTecnicoAdm=[[pessoaid,pessoaid, respostas["a17"], respostas["a18"], respostas["19"]]];
	}

	if(checaVazio(respostas["a20"])){
		valuesDocente = [[pessoaid,pessoaid,respostas["a20"],respostas["a21"]]];
	}

	if(checaVazio(respostas["a22"])){
		valuesDocenteTecnico = [[pessoaid, pessoaid, respostas["a22"], respostas["a23"]]];
	}

	/**CAPTAR VALORES DE INSTITUIÇÕES ADICIONADAS*/
	var valuesInstituicoes = addInstituicao();
	valuesInstituicoes = valuesInstituicoes.map( Object.values );
	console.log("instituicao");
	console.log(valuesInstituicoes);

	/**CAPTA VALORES DE CURSOS ADICIONADOS*/
	var valuesCurso = addCurso();
	valuesCurso = valuesCurso.map( Object.values );
	console.log("cursos");
	console.log(valuesCurso);

	/**CAPTA VALORES DO INSTRUTOR DE CAPACITAÇÃO PRA COLOCAR NA TABELA PESSOA*/
	var valuesInstrutorPessoa = addInstrutorPessoa();
	valuesInstrutorPessoa = valuesInstrutorPessoa.map( Object.values );
	console.log("instrutor-pessoa");
	console.log(valuesInstrutorPessoa);

	/**CAPTA VALORES DE INSTRUTOR CADASTRADO NA CAPACITAÇÃO PARA A TABELA DE INSTRUTOR */
	var valuesInstrutor = addInstrutor(pessoaid);
	valuesInstrutor = valuesInstrutor.map( Object.values );
	console.log("instrutor");
	console.log(valuesInstrutor);

	/**CAPTA VALORES DE CAPACITAÇÃO */
	var valuesCapacitacao = addCapac();
	valuesCapacitacao = valuesCapacitacao.map( Object.values );
	console.log("CAPACITAÇÃO");
	console.log(valuesCapacitacao);

	/** CAPTA VALORES PARA A TABELA PESSOA_CURSO */
	var valuesPessoaCurso = addPessoaCurso(pessoaid);
	valuesPessoaCurso = valuesPessoaCurso.map( Object.values );
	console.log("PessoaCurso");
	console.log(valuesPessoaCurso);

	/**CAPTA VALORES PARA A TABELA ENTREVISTA*/
	var entrevistaID = respostas["n1"];
	var entrevistadorID = respostas["n7"];
	console.log(entrevistadorID);
	valuesEntrevista = [[entrevistaID,
		hash.geraHash(entrevistadorID), 
		pessoaid, 
		respostas["n8"], 
		hash.geraHash(respostas["n9"]), 
		respostas["n10"], 
		hash.geraHash(respostas["n11"]),
		respostas["n12"],
		hash.geraHash(respostas["n13"]),
		respostas["n14"],
		hash.geraHash(respostas["n15"]), 
		respostas["n16"], 
		hash.geraHash(respostas["n17"]),
		respostas["n18"],
		hash.geraHash(respostas["n19"]),
		respostas["n20"],
		respostas["n5"],
		respostas["n6"],
		respostas["o1"],					
		null,null,null,null]];
	console.log("ENTREVISTA");
	console.log(entrevistadorID)
	console.log(valuesEntrevista);

	/**CAPTA VALORES PARA A TABELA OPNIÃO, CONTENDO TODAS AS RESPOSTAS SUBJETIVAS*/
	var valuesOpniao = addOpniao(entrevistaID);
	valuesOpniao = valuesOpniao.map( Object.values );
	console.log("OPNIÕES");
	console.log(valuesOpniao);

	/**CAPTA VALORES PARA A TABELA ATIVIDADE */
	var publicoalvo=respostas["i3"];
	if(publicoalvo==0||publicoalvo==2){		//Alvo interno, dentro da unidade de trabalho ou interno/externo.
		var unidade = respostas["n4"]; //Código da Unidade de Trabalho
	}
	else{
		var unidade = respostas["n2"]	//se o publico alvo for somente externo, guarda a Unidade Organizacional.
	}
	var valuesAtividade=[[hash.geraHash(respostas["i1"],pessoaid), 
		respostas["i1"], 
		respostas["i2"], 
		respostas["i3"], 
		respostas["i4"], 
		respostas["i5"], 
		respostas["i6"], 
		respostas["i7"], 
		respostas["i8"], 
		respostas["i9"], 
		respostas["i11"],
		respostas["i10"], 
		unidade]];

	/**CAPTA VALORES PARA A TABELA PESSOA_ATIVIDADE */
	var valuesPessoaAtividade=[[pessoaid,hash.geraHash(respostas["i1"],pessoaid)]];

	/**CAPTA VALORES DO INSTRUTOR INDICADO PARA A TABELA INSTRUTOR E PESSOA*/
	var valuesCursoInstrutor=[];
	valuesCursoInstrutor.push({	//grava o curso do instrutor indicado no array de cursos
		cursoId:hash.geraHash(respostas["l5"],"19"),
		Nome:respostas["l5"],
		Tipo:"19",
		FK_AreaTematica:"88",
		FK_AreaConhecimento:"88"
	})
	valuesCursoInstrutor = valuesCursoInstrutor.map( Object.values );

	var valuesInstituicoesInstrutor=[];
	valuesInstituicoesInstrutor.push({
		instituicaoID:hash.geraHash(respostas["l7"],"88"),
		nome:respostas["l7"],
		status:"88"
	})
	valuesInstituicoesInstrutor = valuesInstituicoesInstrutor.map( Object.values );

	var valuesInstrutorPessoaInstrutor=[];
	valuesInstrutorPessoaInstrutor.push({
		instrutorId:hash.geraHash(respostas["l5"],respostas["l4"]),
		nomeInstrutor:respostas["l4"],
		a:null, 
		b:null, 
		c:null, 
		d:null, 
		e:null, 
		f:null, 
		g:null, 
		h:null, 
		i:null,
		j:null,
		k:null
	})
	valuesInstrutorPessoaInstrutor = valuesInstrutorPessoaInstrutor.map( Object.values );

	var valuesInstrutorIndicado = [[hash.geraHash(respostas["l5"],respostas["l4"]),
	respostas["l6"],
	hash.geraHash(respostas["l7"],"88"),
	hash.geraHash(respostas["l5"],respostas["l4"])]];

	console.log("instrutor indicado");
	console.log(valuesCurso);
	console.log(valuesInstituicoes);
	console.log(valuesInstrutorPessoa);
	console.log(valuesInstrutorIndicado);

	/**CAPTA VALORES PARA A TABELA INDICAÇÃO */
	var valuesindicacao = [[hash.geraHash(hash.geraHash(respostas["l5"],respostas["l4"],pessoaid)), 
	pessoaid, 
	hash.geraHash(respostas["l5"],respostas["l4"])]];

	//*CAPTA A TRAJETÓRIA EDUCACIONAL BLOCO M*/
	var valuesTrajetoria;
	var valuesCursoMedio=[];
	var valuesInstituicoesMedio=[];
	var valuesPessoaCursoMedio=[];

	if(respostas["m1"]==="10"||respostas["m1"]==="20"){
		valuesCursoMedio.push({	//grava o curso médio/profissionalizante
			cursoId:hash.geraHash(respostas["m2"],respostas["m1"]),
			Nome:respostas["m2"],
			Tipo:respostas["m1"],
			FK_AreaTematica:"88",
			FK_AreaConhecimento:"88"
		})

		valuesInstituicoesMedio.push({	//guarda a instituição do curso
		instituicaoID:hash.geraHash(respostas["m1"],respostas["m4"]),
		nome:respostas["88"],
		status:respostas["m4"]
		})

		valuesPessoaCursoMedio.push({
			pessoaID:pessoaid,
			cursoId:hash.geraHash(respostas["m2"],respostas["m1"]),
			dataConclusao:respostas["m3"],
			instituicaoID:hash.geraHash(respostas["m1"],respostas["m4"]),
			financiadoUFRRJ:respostas["m5"]
		})

	}
	else if(respostas["m1"]==="21"){
		valuesCursoMedio.push({	//grava o curso médio/profissionalizante
			cursoId:hash.geraHash(respostas["m6"],respostas["m1"]),
			Nome:respostas["m6"],
			Tipo:respostas["m1"],
			FK_AreaTematica:"88",
			FK_AreaConhecimento:"88"
		})

		valuesInstituicoesMedio.push({	//guarda a instituição do curso
		instituicaoID:hash.geraHash(respostas["m1"],respostas["m9"]),
		nome:respostas["88"],
		status:respostas["m9"]
		})

		valuesPessoaCursoMedio.push({
			pessoaID:pessoaid,
			cursoId:hash.geraHash(respostas["m6"],respostas["m1"]),
			dataConclusao:respostas["m8"],
			instituicaoID:hash.geraHash(respostas["m1"],respostas["m9"]),
			financiadoUFRRJ:respostas["m10"]
		})
	}
	valuesCursoMedio = valuesCursoMedio.map( Object.values );
	valuesInstituicoesMedio = valuesInstituicoesMedio.map( Object.values );
	valuesPessoaCursoMedio = valuesPessoaCursoMedio.map( Object.values );

	console.log(valuesCurso);
	console.log(valuesInstituicoes);
	console.log(valuesPessoaCurso);

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/* DAQUI EM DIANTE É A GRAVAÇÃO NO BD*/
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	

	gravaBanco("pessoa",valuesPessoa,function(){
		gravaBanco("servidor",valuesServidor, function(){
			gravaBanco("tecnico_adm",valuesTecnicoAdm, function(){
				gravaBanco("docente",valuesDocente,function(){
					gravaBanco("docente_tecnico",valuesDocenteTecnico,function(){
						gravaBanco("instituicao",valuesInstituicoes,function(){
							gravaBanco("curso",valuesCurso,function(){
								gravaBanco("pessoa",valuesInstrutorPessoa, function(){
									gravaBanco("instrutor",valuesInstrutor,function(){
										gravaBanco("capacitacao",valuesCapacitacao,function(){
											gravaBanco("pessoa_curso",valuesPessoaCurso,function(){
												gravaBanco("entrevista",valuesEntrevista,function(){
													gravaBanco("opniao",valuesOpniao,function(){
														gravaBanco("atividade",valuesAtividade,function(){
															gravaBanco("pessoa_atividade",valuesPessoaAtividade,function(){
																gravaBanco("instituicao",valuesInstituicoesInstrutor,function(){
																	gravaBanco("curso",valuesCursoInstrutor,function(){
																		gravaBanco("pessoa",valuesInstrutorPessoaInstrutor,function(){
																			gravaBanco("instrutor",valuesInstrutorIndicado,function(){
																				gravaBanco("indicacao",valuesindicacao,function(){
																					gravaBanco("instituicao",valuesInstituicoesMedio,function(){
																						gravaBanco("curso",valuesCursoMedio,function(){
																							gravaBanco("pessoa_curso",valuesPessoaCursoMedio,function(){
																								window.alert("GRAVAÇÃO EXECUTADA");
																							})
																						})
																					})
																				})

																			})
																		})
																	})

																})

															})

														})

													})
												})
											
											})
										})
									})
								})
							})
						})
					})
				})
			}) 
		})
	});
	

}

function gravaBanco(tabela,valores,callback){
	var con = banco.conexaoBD();
	var sql ="INSERT INTO "+tabela+" VALUES ?";
	
	if (valores === undefined || valores.length == 0){
    	callback();
  	}
    
    //var v =[];
    //v.push(valores);
      con.query(sql,[valores],function(err,result){
          if(err){
            //window.alert(err.message);
            throw err;
            return;
          }
          else{
            console.log(result);
            callback();
            //import_cont++;
            //alert("GRAVAÇÃO BEM SUCEDIDA!")
        }
          con.end;
        })
   

}


function gravarDados_old(){
	var conteudo = respostas["a1"]+respostas["a2"]+respostas["a3"];
	var pessoaid = hash.geraHash(conteudo);

	var valuesPessoa=[pessoaid, respostas["a1"], respostas["a2"], respostas["a3"], respostas["a29"], 
	respostas["a30"], respostas["a31"], respostas["b2"], respostas["b1"], respostas["a5"], respostas["n4"],
	respostas["n3"],respostas["n2"]];

	var valuesServidor =[pessoaid, respostas["a6"], respostas["a4"], respostas["a7"], respostas["a8"], 
	respostas["a9"], respostas["a10"], respostas["a11"], respostas["a12"], respostas["a13"], respostas["a14"], 
	respostas["a15"], respostas["a16"], respostas["a24"], respostas["a25"], respostas["a26"], respostas["a27"], 
	respostas["a28"]];

	var valuesTecnicoAdm=[pessoaid,pessoaid, respostas["a17"], respostas["a18"], respostas["19"]];

	var valuesDocente = [pessoaid,pessoaid,respostas["a20"],respostas["a21"]];

	var valuesDocenteTecnico = [pessoaid, pessoaid, respostas["a22"], respostas["a23"]];

	/**CAPTAR VALORES DE INSTITUIÇÕES ADICIONADAS*/
	var valuesInstituicoes = [];
	valuesInstituicoes = addInstituicao(valuesInstituicoes);
	console.log("instituicao");
	console.log(valuesInstituicoes);

	/**CAPTA VALORES DE CURSOS ADICIONADOS*/
	var valuesCurso =[];
	valuesCurso = addCurso(valuesCurso);
	console.log("curso");
	console.log(valuesCurso);

	/** REVER COMO ALOCAR OS VALORES DE CURSO DE FORMA DINÂMICA*/
	if(respostas["b3"]===14)
		valuesCurso=[hash.geraHash(respostas["b5"]), respostas["b5"], 14, respostas["b7"], respostas["b6"]];
	else if(respostas["b3"]===15)

	/** REVER COMO ALOCAR OS VALORES DE CURSO DE FORMA DINÂMICA*/
	valuesInstrutorPessoa=[hash.geraHash(respostas["c4"]), respostas["c4"], null, null, null, 
	null, null, null, null, null, null, null, null];

	valuesInstrutor = [hash.geraHash(respostas["c4"]), Local, hash.geraHash(respostas["b8"],respostas["b10"]), pessoaid];


	valuesCapacitacao=[hash.geraHash(respostas["c1"]), respostas["c6"], FK_CursoID, FK_Instrutor];

	valuesPessoa_Curso=[pessoaid, FK_CursoID, blocoB["b9"], FK_IntituicaoID, respostas["c11"]];

	/**NOME DE ENTREVISTADOR, DIGTADOR, ETC. DEVE SER UM SELECT COM OS NOMES DOS USUÁRIOS CADASTRADOS NO SISTEMA*/
	valuesEntrevista = [respostas["n1"],hash.geraHash(respostas["n7"]), pessoaid, respostas["n8"], 
	hash.geraHash(respostas["n9"]), respostas["n10"], hash.geraHash(respostas["n11"]),respostas["n12"],
	hash.geraHash(respostas["n13"]),respostas["n14"],dIGITADORid, respostas["n16"], respostas["n17"],
	respostas["n18"],respostas["n19"],respostas["n20"],respostas["n5"],respostas["n6"],respostas["o1"],
	null,null,null,null];

	/** TODOS OS VALUES ABAIXO DEVEM SER REPENSADOS PARA QUE POSSAM SER INCREMENTADOS DE FORMA DINÂMICA*/
	valuesOpniao = [FK_EntrevistaID, FKNumeroPergunta, Resposta];

	valuesAtividade=[AtividadeID, Nome, Descricao, PublicoAlvo, QuemPublicoAlvo, UtilizaInfo, 
	Setor, UtilizaMaterialSetor, ConhecimentoAtividade, HabilidadeAtividade, AtitudesAtividade, 
	MelhoriaAtividade, FK_Unidade];

	valuesPessoaAtividade =[FK_PessoaID, FK_AtividadeID];

	valuesindicacao = [IndicacaoID, FK_IndicadorID, FK_InstrutorIndicadoID];

	/**
	valuesAreaConhecimento=[AreaConhecimento,Nome];
	valuesAreaTematica=[AreaTematica, Nome, FK_AreaConhecimento];
	valuesBolsista =[Pessoa_PessoaID];
	valuesCedido=[Servidor_FK_PessoaID, Servidor_ServidorID];
	valuesEdSuperior = [Ed_SuperiorID, Tipoi, FK_CursoID];
	valuesEstagiario =[Pessoa_PessoaID];
	valuesPergunta = [PerguntaID,Descricao];
	valuesPessoa_Curso=[blocoB["b4"], pessoaid, blocoB["b3"], FK_IntituicaoID];
	valuesTercerizado=[Pessoa_PessoaID];
	valuesUnidadeIntermediaria = [UI_ID, Nome, Unidade_Organizacional_UO_ID];
	valuesUnidadeOrganizacional = [UO_ID, Nome];
	valuesUnidadeTrabalho = [UT_ID, Nome, FK_UI, FK_UO];
	valuesUsuario=[UsuarioID, Login, Senha, Tipo, FK_PessoaID];
	*/
}



/////////////////////////////////////
/*
*FUNÇÕES AUXILIARES
*/
////////////////////////////////////

function getGrad(form){
	console.log(form.id);

	cursos.push({
		tipoCurso:form.elements["tipocurso"].value,
		nomeCurso: form.elements["nomeCurso"].value,
		areaTematica:form.elements["areaTematica"].value,
		areaConhecimento:form.elements["areaConhecimento"].value,
		nomeInstituicao:form.elements["nomeInstituicao"].value,
		anoConclusao:form.elements["anoConclusao"].value,
		tipoInstituicao:form.elements["tipoInstituicao"].value,
		financiadaUFRRJ:form.elements["financiadaUFRRJ"].value
	})

	console.log("infos do array CURSOS");
	console.log(cursos);
	
}

function getCapac(form){
	console.log(form.id);
	cursos.push({
		tipoCurso:"19",
		nomeCurso: form.elements["nomeCurso"].value,
		areaTematica:form.elements["areaTematica"].value,
		nomeInstrutor:form.elements["nomeInstrutor"].value,
		nomeInstituicao:form.elements["nomeInstituicao"].value,
		anoConclusao:form.elements["anoConclusao"].value,
		cargaHoraria:form.elements["cargaHoraria"].value,
		financiadaUFRRJ:form.elements["financiadaUFRRJ"].value
	})

	console.log("infos do array CURSOS/capac");
	console.log(cursos);
}	

function getOpniao(c){
	var i;
	var campos = c;
	console.log(campos);
	
	for (i=0;i<campos.length;i++){
		console.log("CAMPOS");
		//console.log(campos[i]);
		opnioes.push({
			numeroPergunta:campos[i].id,
			codigoPergunta:campos[i].name,
			resposta:campos[i].value
		});
	}
	if(campos.id==="53"){
		opnioes.push({
			numeroPergunta:campos.id,
			codigoPergunta:campos.name,
			resposta:campos.value
		});
	}
	console.log("infos do array opnioes");
	console.log(opnioes);
}

function addInstituicao(){
	var valores=[];
	var i;

	for(i=0;i<cursos.length;i++){
		if(cursos[i].tipoInstituicao){
			var tipo = cursos[i].tipoInstituicao;
		}
		else{
			var tipo = "88"
		}
		valores.push({
			instituicaoID:hash.geraHash(cursos[i].nomeInstituicao,tipo),
			nome:cursos[i].nomeInstituicao,
			status:tipo
		});
	}

	return valores;
}

function addCurso(){
	//console.log('addCurso');
	var valores=[];

	var i;
	for(i=0;i<cursos.length;i++){
		valores.push({
			cursoId:hash.geraHash(cursos[i].nomeCurso,cursos[i].tipoCurso),
			nome:cursos[i].nomeCurso,
			tipo:cursos[i].tipoCurso,
			areatem:cursos[i].areaTematica,
			areacon:cursos[i].areaConhecimento
		});
	}

	return valores;
}

function addInstrutorPessoa(){
	var valores=[];
	var i;
	for(i=0;i<cursos.length;i++){
		if(cursos[i].tipoCurso==="19"){
			valores.push({
				instrutorId:hash.geraHash(cursos[i].nomeCurso,cursos[i].nomeInstrutor),
				nomeInstrutor:cursos[i].nomeInstrutor,
				a:null, 
				b:null, 
				c:null, 
				d:null, 
				e:null, 
				f:null, 
				g:null, 
				h:null, 
				i:null,
				j:null,
				k:null
			});
		}
	}

	return valores;
}

function addInstrutor(pessoaid){
	var valores=[];
	var i;
	for(i=0;i<cursos.length;i++){
		if(cursos[i].tipoCurso==="19"){
			valores.push({
				InstrutorID:hash.geraHash(cursos[i].nomeCurso,cursos[i].nomeInstrutor),
				Local:"88",
				FK_Instituicao:hash.geraHash(cursos[i].nomeInstituicao,cursos[i].tipoInstituicao),
				FK_PessoaID:hash.geraHash(cursos[i].nomeCurso,cursos[i].nomeInstrutor),
			});
		}
	}

	return valores;
}

function addInstrutorIndicado(){

}

function addCapac(){
	var valores =[];
	var i;
	for(i=0;i<cursos.length;i++){
		if(cursos[i].tipoCurso==="19"){
			valores.push({
				capacitacaoID:hash.geraHash(cursos[i].nomeCurso,cursos[i].nomeInstituicao,cursos[i].nomeInstrutor),
				cargaHoraria:cursos[i].cargaHoraria,
				cursoId:hash.geraHash(cursos[i].nomeCurso,cursos[i].tipoCurso),
				instrutorId:hash.geraHash(cursos[i].nomeCurso,cursos[i].nomeInstrutor)
			});
		}
	}

	return valores;
}

function addPessoaCurso(id){
	var valores =[];
	var i;
	for(i=0;i<cursos.length;i++){
			valores.push({
				pessoaID:id,
				cursoId:hash.geraHash(cursos[i].nomeCurso,cursos[i].tipoCurso),
				dataConclusao:cursos[i].anoConclusao,
				instituicaoID:hash.geraHash(cursos[i].nomeInstituicao,cursos[i].tipoInstituicao),
				financiadoUFRRJ:cursos[i].financiadaUFRRJ
			});

		if((respostas["b3"]<=13)&&(respostas["b3"]>0)){
			valores.push({
				pessoaID:id,
				cursoId:respostas["b3"],
				dataConclusao:respostas["b4"],
				instituicaoID:"88",
				financiadoUFRRJ:"88"
			});
		}
	}
	console.log(valores);
	return valores;
}

function addOpniao(entrevistaID){
	var valores=[];
	var i;
	for(i=0;i<opnioes.length;i++){
		valores.push({
			entrevistaID:entrevistaID,
			numeroPergunta:opnioes[i].numeroPergunta,
			resposta:opnioes[i].resposta,
		});
	}

	return valores;
}