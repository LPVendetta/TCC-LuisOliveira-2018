window.$ = window.jQuery = require('jquery');
var Baby = require("babyparse");
var path = require("path");
var randy = require("randy");
var encode = require("hashcode").hashCode;
var crypto = require('crypto');
var nulo = "NULL";
var pessoaid;
//var sql = require("./mysql.js");
var data;
var dadosCSV;

$('#botao-voltar').on('click', function(e){
    e.preventDefault();
    $('#spinner').fadeIn(function(){
        really_slow_function(function() {
            $('#spinner').fadeOut();
        });
    });
});

function really_slow_function(callback) {
  var a = new Date();
  var i;
    for (i=0;i<10000;i++){
      console.log(i);
    }
    //while( new Date () - a < 5000 );
  callback.call(this);
}

function leituraCSV() {
        //var file = evt.target.files;
        var file = document.getElementById('csv-file');
        var url = file.value;
        url = path.basename(url)

        var rows;
        console.log(Baby)
        var parsed = Baby.parseFiles(url, {
          header: true,
          delimiter:"^",
          dynamicTyping: true,
          complete: function(results) {
            alert("COMPLETE");
            data = results;
          },
        });

        rows = parsed.data;
        rows.splice(-1,1);
        console.log(rows);
        dadosCSV = rows;
        tabela();
        //rows.forEach(teste);
}

function tabela(){
  var dados = dadosCSV;
  var div = document.getElementById("tabela");
  var html = '<table border="1" cellspacing="0" cellpadding="1">';
  var cabecalho ="</tr>";
  var celulas="";
  var form = document.getElementById("escolher-arquivo");

  for(rotulo in dados[0]){
    cabecalho+="<th>"+rotulo+"</th>";  
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
  html+="</table>";
  
  div.innerHTML+=html;

  form.innerHTML+='<input type="button" id="importa-dados" class="center" name="importa-dados" value=" GRAVAR " onclick="importaDados()"></br></br>'
}


function importaDados(callback){
  var dados = dadosCSV;
  var query = "";
  var values=[];
  
  var con = mysql.createConnection({
  debug: true,
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
  
  
  
  for(var i=0;i<1;i++){
    try{
      console.log("PASSO "+i+":\n\n"); 
      importar("pessoa",dados,i,con, function(dados,i,con){

        importar("servidor",dados,i,con, function(dados,i,con){

          importar("tecnico_adm",dados,i,con, function(dados,i,con){

            importar("docente",dados,i,con, function(dados,i,con){
                                                  console.log(dados);
                                                  console.log(i);

               importar("docente_tecnico",dados,i,con, function(dados,i,con){

                   importar("instituicao",dados,i,con, function(dados,i,con){

                       importar("curso",dados,i,con, function(dados,i,con){

                           importar("instrutor_pessoa",dados,i,con, function(dados,i,con){

                               importar("instrutor",dados,i,con, function(dados,i,con){

                                 importar("capacitacao",dados,i,con, function(dados,i,con){
                          
                                   importar("pessoa_curso",dados,i,con, function(dados,i,con){
                                    
                                     importar("entrevista",dados,i,con, function(dados,i,con){
                                      
                                       importar("opniao",dados,i,con, function(dados,i,con){

                                           importar("atividade",dados,i,con, function(dados,i,con){

                                             importar("pessoa_atividade",dados,i,con, function(dados,i,con){

                                               importar("pessoa_atividade",dados,i,con, function(dados,i,con){

                                                 importar("indicacao",dados,i,con, function(dados,i,con){
                                                   console.log("FIM PASSO "+i+":\n\n");
                                                 });

               												    		});


               												    	});

               												    });

               												});

               											});

               										});

      			 	              		});

      			 	              	});

      			 	              });
	
      			 	        });

      			 	    });
	
      			 	});

      			});

      		});

        });

      });
      

    }
    catch(err){
      //reverte();
      throw(err);
      return; 
    }
  }
  console.log("GRAVAÇÃO OK");

  
  //gravaTabelaSQL("pessoa",dados,values,con);
  //callback.call(this);
  
}


function importar(tabela,dados,i,con,callback){
  var crypto=require("crypto");
  var valores=[];
  switch(tabela){
      case "pessoa":
            pessoaid = geraHash(dados[i].a1+dados[i].a2+dados[i].a3); //converte o nome da pessoa para um código hash q vai servir de id;
            console.log(pessoaid);
            valores=[[pessoaid,dados[i].a1,dados[i].a2,dados[i].a3,dados[i].a26,dados[i].a27,dados[i].a28,dados[i].b2,dados[i].b1,dados[i].a5,dados[i].n4,dados[i].n3,dados[i].n2]];
            //console.log(pessoaid);
            break;
      case "pessoa_curso":
            //console.log(pessoaid);
            var nid = dados[i].b3;
            if(parseInt(nid)>=0 && parseInt(nid)<=13){
              valores=[[pessoaid,dados[i].b3,dados[i].b4,null,null]];
            }
            else{
              // GRADUAÇÃO
              var v1 = gravaPessoaCurso(pessoaid,dados[i].b5,dados[i].b7,dados[i].b6,dados[i].b9);
              var v2 = gravaPessoaCurso(pessoaid,dados[i].b10,dados[i].b12,dados[i].b11,dados[i].b14);
              var v3 = gravaPessoaCurso(pessoaid,dados[i].b10a1,dados[i].b12b,dados[i].b11b,dados[i].b14b);
              //ESPECIALIZAÇÃO
              var v4 = gravaPessoaCurso(pessoaid,dados[i].b15,dados[i].b17,dados[i].b16,dados[i].b19);
              var v5 = gravaPessoaCurso(pessoaid,dados[i].b20,dados[i].b22,dados[i].b21,dados[i].b24);
              //MESTRADO
              var v6 = gravaPessoaCurso(pessoaid,dados[i].b25,dados[i].b27,dados[i].b26,dados[i].b29);
              var v7 = gravaPessoaCurso(pessoaid,dados[i].b30,dados[i].b32,dados[i].b31,dados[i].b34);
              //DOUTORADO
              var v8 = gravaPessoaCurso(pessoaid,dados[i].b35,dados[i].b37,dados[i].b36,dados[i].b39);
              //POS-DOUTORADO
              var v9 = gravaPessoaCurso(pessoaid,dados[i].b40,dados[i].b42,dados[i].b41,dados[i].b44);
              //CAPACITACAO
              //var c1 = gravaPessoaCurso(id_pessoa,nome_curso,data_conc,nome_inst,financiado_ufrrj);
              var c1 = gravaPessoaCurso(pessoaid,dados[i].c1,dados[i].c6,dados[i].c2,dados[i].c4);
              var c7 = gravaPessoaCurso(pessoaid,dados[i].c7,dados[i].c12,dados[i].c8,dados[i].c10);
              var c13 = gravaPessoaCurso(pessoaid,dados[i].c13,dados[i].c18,dados[i].c14,dados[i].c16);
              var c19 = gravaPessoaCurso(pessoaid,dados[i].c19,dados[i].c24,dados[i].c20,dados[i].c22);
              var c25 = gravaPessoaCurso(pessoaid,dados[i].c25,dados[i].c30,dados[i].c26,dados[i].c28);
              var c31 = gravaPessoaCurso(pessoaid,dados[i].c31,dados[i].c36,dados[i].c32,dados[i].c34);
              var c37 = gravaPessoaCurso(pessoaid,dados[i].c37,dados[i].c42,dados[i].c38,dados[i].c40);
              var c43 = gravaPessoaCurso(pessoaid,dados[i].c43,dados[i].c48,dados[i].c44,dados[i].c46);
              var c49 = gravaPessoaCurso(pessoaid,dados[i].c49,dados[i].c54,dados[i].c50,dados[i].c52);
              var c55 = gravaPessoaCurso(pessoaid,dados[i].c55,dados[i].c60,dados[i].c56,dados[i].c58);
              var c61 = gravaPessoaCurso(pessoaid,dados[i].c61,dados[i].c66,dados[i].c62,dados[i].c64);
              var c67 = gravaPessoaCurso(pessoaid,dados[i].c67,dados[i].c72,dados[i].c68,dados[i].c70);
              var c73 = gravaPessoaCurso(pessoaid,dados[i].c73,dados[i].c78,dados[i].c74,dados[i].c76);
              var c79 = gravaPessoaCurso(pessoaid,dados[i].c79,dados[i].c84,dados[i].c80,dados[i].c82);
              var c85 = gravaPessoaCurso(pessoaid,dados[i].c85,dados[i].c90,dados[i].c86,dados[i].c88);
              var c91 = gravaPessoaCurso(pessoaid,dados[i].c91,dados[i].c96,dados[i].c92,dados[i].c94);
              var c97 = gravaPessoaCurso(pessoaid,dados[i].c97,dados[i].c102,dados[i].c98,dados[i].c100);
              var c103 = gravaPessoaCurso(pessoaid,dados[i].c103,dados[i].c108,dados[i].c104,dados[i].c106);
              var c109 = gravaPessoaCurso(pessoaid,dados[i].c109,dados[i].c124,dados[i].c120,dados[i].c122);
              var c125 = gravaPessoaCurso(pessoaid,dados[i].c125,dados[i].c130,dados[i].c126,dados[i].c128);

              var m2 = gravaPessoaCurso(pessoaid,dados[i].m2,dados[i].m3,dados[i].m4,dados[i].m5);
              var m7 = gravaPessoaCurso(pessoaid,dados[i].m7,dados[i].m8,dados[i].m9,dados[i].m10);
              var m12 = gravaPessoaCurso(pessoaid,dados[i].m12,dados[i].m13,dados[i].m14,dados[i].m15);
              var m17 = gravaPessoaCurso(pessoaid,dados[i].m17,dados[i].m18,dados[i].m19,dados[i].m20); 

              //CHECA AS VARIAVEIS QUE ESTÃO PREENCHIDAS E SE TIVER VAZIA NÃO GRAVA NO ARRAY
              valores = incrementaValores(valores,v1);
              valores = incrementaValores(valores,v2);
              valores = incrementaValores(valores,v3);
              valores = incrementaValores(valores,v4);
              valores = incrementaValores(valores,v5);
              valores = incrementaValores(valores,v6);
              valores = incrementaValores(valores,v7);
              valores = incrementaValores(valores,v8);
              valores = incrementaValores(valores,v9);
              //CAPACITAÇÃO
              valores = incrementaValores(valores,c1);
              valores = incrementaValores(valores,c7);
              valores = incrementaValores(valores,c13);
              valores = incrementaValores(valores,c19);
              valores = incrementaValores(valores,c25);
              valores = incrementaValores(valores,c31);
              valores = incrementaValores(valores,c37);
              valores = incrementaValores(valores,c43);
              valores = incrementaValores(valores,c49);
              valores = incrementaValores(valores,c55);
              valores = incrementaValores(valores,c61);
              valores = incrementaValores(valores,c67);
              valores = incrementaValores(valores,c73);
              valores = incrementaValores(valores,c79);
              valores = incrementaValores(valores,c85);
              valores = incrementaValores(valores,c91);
              valores = incrementaValores(valores,c97);
              valores = incrementaValores(valores,c103);
              valores = incrementaValores(valores,c109);
              valores = incrementaValores(valores,c125);

              valores = incrementaValores(valores,m2);
              valores = incrementaValores(valores,m7);
              valores = incrementaValores(valores,m12);
              valores = incrementaValores(valores,m17);
            }
            break;
      case "servidor":
            /**
            Tem que testar esse if pois alguns registros tem o valor de lotação como NULL. Como lotação é uma FKey no BD, então
            existe um registro 000 no BD (tabela unidade) para quando a lotação é nula. No if ele checa o dados[i].a7, se a lotação
            for NULL, ele guarda o valor 000 no lugar de NULL. Senão mantém o valor inalterado.
            */ 
            if(dados[i].a7 === 'null'||dados[i].a7 === 'NULL'||dados[i].a7 === ''||dados[i].a7 === 'NA'||dados[i].a7 === 'NS'||dados[i].a7 === 0){
              var lotacao = 000;
            }
            else{
              var lotacao = dados[i].a7;
            }
            valores=[[pessoaid,
            dados[i].a6,
            dados[i].a4,
            lotacao, // dados[i].a7;
            dados[i].a8,
            dados[i].a9,
            dados[i].a10,
            dados[i].a11,
            dados[i].a12,
            dados[i].a13,
            dados[i].a14,
            dados[i].a15,
            dados[i].a16,
            dados[i].a22,
            dados[i].a23,
            dados[i].a23a,
            dados[i].a24,
            dados[i].a25]];
            break;
      case "tecnico_adm":
            if(dados[i].a17 === 'null'||dados[i].a17 === 'NULL'||dados[i].a17 === ''||dados[i].a17 === 'NA'||dados[i].a17 === 'NS'||dados[i].a17 === 0||dados[i].a17 === 77||dados[i].a17 === "77-NS"||dados[i].a17 === 88){
              break;
            }
            else
              valores=[[pessoaid,pessoaid,dados[i].a17,dados[i].a18,dados[i].a19]];
            break;
      case "docente":
            if(dados[i].a20 === 'null'||dados[i].a20 === 'NULL'||dados[i].a20 === ''||dados[i].a20 === 'NA'||dados[i].a20 === 'NS'||dados[i].a20 === 0||dados[i].a20 === 88){
              break;
            }
            else
              valores=[[pessoaid,pessoaid,dados[i].a20,dados[i].a21]];
            break;
      case "docente_tecnico":
            if(dados[i].a20a === 'null'||dados[i].a20a === 'NULL'||dados[i].a20a === ''||dados[i].a20a === 'NA'||dados[i].a20a === 'NS'||dados[i].a20a === 0||dados[i].a20a === 88){
              break;
            }
            else
              valores=[[pessoaid,pessoaid,dados[i].a20a,dados[i].a20b]];
            break;
      case "curso":
            // V1, V2, V3 = GRADUAÇÃO (CÓDIGO 14)
            var v1 = gravaCurso(pessoaid,dados[i].b5,14,dados[i].b5a,dados[i].b5b);
            var v2 = gravaCurso(pessoaid,dados[i].b10,14,dados[i].b10a,dados[i].b10b);
            var v3 = gravaCurso(pessoaid,dados[i].b10a1,14,dados[i].b10b2,dados[i].b10b3);
            //V4, V5 = ESPECIALIZAÇÃO (CÓDIGO 15)
            var v4 = gravaCurso(pessoaid,dados[i].b15,15,dados[i].b15a,dados[i].b15b);
            var v5 = gravaCurso(pessoaid,dados[i].b20,15,dados[i].b20a,dados[i].b20b);
            //V6,V7 = MESTRADO (CÓDIGO 16)
            var v6 = gravaCurso(pessoaid,dados[i].b25,16,dados[i].b25a,dados[i].b25b);
            var v7 = gravaCurso(pessoaid,dados[i].b30,16,dados[i].b30a,dados[i].b30b);
            //V8 = DOUTORADO (CÓDIGO 17)
            var v8 = gravaCurso(pessoaid,dados[i].b35,17,dados[i].b35a,dados[i].b35b);
            //V9 = POS-DOUTORADO (CÓDIGO 18)
            var v9 = gravaCurso(pessoaid,dados[i].b40,18,dados[i].b40a,dados[i].b40b);

            //CAPACITAÇÃO:
            var c1 = gravaCurso(pessoaid,dados[i].c1,19,dados[i].c1a,null);
            var c7 = gravaCurso(pessoaid,dados[i].c7,19,dados[i].c7a,null);            
            var c13 = gravaCurso(pessoaid,dados[i].c13,19,dados[i].c13a,null);
            var c19 = gravaCurso(pessoaid,dados[i].c19,19,dados[i].c19a,null);
            var c25 = gravaCurso(pessoaid,dados[i].c25,19,dados[i].c19a,null);
            var c31 = gravaCurso(pessoaid,dados[i].c31,19,dados[i].c31a,null);
            var c37 = gravaCurso(pessoaid,dados[i].c37,19,dados[i].c37a,null);
            var c43 = gravaCurso(pessoaid,dados[i].c43,19,dados[i].c43a,null);
            var c49 = gravaCurso(pessoaid,dados[i].c49,19,dados[i].c49a,null);
            var c55 = gravaCurso(pessoaid,dados[i].c55,19,dados[i].c55a,null);
            var c61 = gravaCurso(pessoaid,dados[i].c61,19,dados[i].c61a,null);
            var c67 = gravaCurso(pessoaid,dados[i].c67,19,dados[i].c67a,null);
            var c73 = gravaCurso(pessoaid,dados[i].c73,19,dados[i].c73a,null);
            var c79 = gravaCurso(pessoaid,dados[i].c79,19,dados[i].c79a,null);
            var c85 = gravaCurso(pessoaid,dados[i].c85,19,dados[i].c85a,null);
            var c91 = gravaCurso(pessoaid,dados[i].c91,19,dados[i].c91a,null);
            var c97 = gravaCurso(pessoaid,dados[i].c97,19,dados[i].c97a,null);
            var c103 = gravaCurso(pessoaid,dados[i].c103,19,dados[i].c103a,null);
            var c109 = gravaCurso(pessoaid,dados[i].c109,19,dados[i].c109a,null);
            var c125 = gravaCurso(pessoaid,dados[i].c125,19,dados[i].c125a,null);
            
            var l3 = gravaCurso(pessoaid,dados[i].l4,19,null,null);
            var l7 = gravaCurso(pessoaid,dados[i].l8,19,null,null);
            var l11 = gravaCurso(pessoaid,dados[i].l12,19,null,null);

            //GRAVANDO CURSO MÉDIO, TEM QUE CHECAR SE É NORMAL OU PROFISSIONALIZANTE
            var m2;
            if(dados[i].m1===2){
              var m2 = gravaCurso(pessoaid,dados[i].m2,10,null,null);  
            }
            else if(dados[i].m1 ===1){
              var m2 = gravaCurso(pessoaid,dados[i].m2,21,null,null);
            }
            var m7 = gravaCurso(pessoaid,dados[i].m7,20,null,null);
            var m12 = gravaCurso(pessoaid,dados[i].m12,20,null,null);
            var m17 = gravaCurso(pessoaid,dados[i].m17,20,null,null);

            //CHECA AS VARIAVEIS QUE ESTÃO PREENCHIDAS E SE TIVER VAZIA NÃO GRAVA NO ARRAY
            // GRADUAÇÃO, ESPECIALIZAÇÃO, MESTRADO, DOUTORADO E POSDOC
            valores = incrementaValores(valores,v1);
            valores = incrementaValores(valores,v2);
            valores = incrementaValores(valores,v3);
            valores = incrementaValores(valores,v4);
            valores = incrementaValores(valores,v5);
            valores = incrementaValores(valores,v6);
            valores = incrementaValores(valores,v7);
            valores = incrementaValores(valores,v8);
            valores = incrementaValores(valores,v9);
            //CAPACITÃÇÃO
            valores = incrementaValores(valores,c1);
            valores = incrementaValores(valores,c7);
            valores = incrementaValores(valores,c13);
            valores = incrementaValores(valores,c19);
            valores = incrementaValores(valores,c25);
            valores = incrementaValores(valores,c31);
            valores = incrementaValores(valores,c37);
            valores = incrementaValores(valores,c43);
            valores = incrementaValores(valores,c49);
            valores = incrementaValores(valores,c55);
            valores = incrementaValores(valores,c61);
            valores = incrementaValores(valores,c67);
            valores = incrementaValores(valores,c73);
            valores = incrementaValores(valores,c79);
            valores = incrementaValores(valores,c85);
            valores = incrementaValores(valores,c91);
            valores = incrementaValores(valores,c97);
            valores = incrementaValores(valores,c103);
            valores = incrementaValores(valores,c109);
            valores = incrementaValores(valores,c125);
            
            valores = incrementaValores(valores,l3);
            valores = incrementaValores(valores,l7);
            valores = incrementaValores(valores,l11);

            valores = incrementaValores(valores,m2);
            valores = incrementaValores(valores,m7);
            valores = incrementaValores(valores,m12);
            valores = incrementaValores(valores,m17);

            if(dados[i].l1 === 1){
              var l2 = gravaCurso(dados[i].l2,19,null,null);
              valores = incrementaValores(valores,l2);
            }

            break;
      case "instituicao":
            //V1,V2,V3 = GRADUAÇÃO 
            var v1 = gravaInstituicao(dados[i].b6,dados[i].b8);
            var v2 = gravaInstituicao(dados[i].b11,dados[i].b13);
            var v3 = gravaInstituicao(dados[i].b11b,dados[i].b13b);
            //V4,V5 = ESPECIALIZAÇÃO
            var v4 = gravaInstituicao(dados[i].b16,dados[i].b18);
            var v5 = gravaInstituicao(dados[i].b21,dados[i].b23);
            //V6,V7 = MESTRADO 
            var v6 = gravaInstituicao(dados[i].b26,dados[i].b28);
            var v7 = gravaInstituicao(dados[i].b31,dados[i].b33);
            //V8 = DOUTORADO
            var v8 = gravaInstituicao(dados[i].b36,dados[i].b38);
            //V9 = POS-DOUTORADO
            var v9 = gravaInstituicao(dados[i].b41,dados[i].b43);
            //CAPACITAÇÃO
            var c1 = gravaInstituicao(dados[i].c2,null);
            var c7 = gravaInstituicao(dados[i].c8,null);
            var c13 = gravaInstituicao(dados[i].c14,null);
            var c19 = gravaInstituicao(dados[i].c20,null);
            var c25 = gravaInstituicao(dados[i].c26,null);
            var c31 = gravaInstituicao(dados[i].c32,null);
            var c37 = gravaInstituicao(dados[i].c38,null);
            var c43 = gravaInstituicao(dados[i].c44,null);
            var c49 = gravaInstituicao(dados[i].c50,null);
            var c55 = gravaInstituicao(dados[i].c56,null);
            var c61 = gravaInstituicao(dados[i].c62,null);
            var c67 = gravaInstituicao(dados[i].c68,null);
            var c73 = gravaInstituicao(dados[i].c74,null);
            var c79 = gravaInstituicao(dados[i].c80,null);
            var c85 = gravaInstituicao(dados[i].c86,null);
            var c91 = gravaInstituicao(dados[i].c92,null);
            var c97 = gravaInstituicao(dados[i].c98,null);
            var c103 = gravaInstituicao(dados[i].c104,null);
            var c109 = gravaInstituicao(dados[i].c120,null);
            var c125 = gravaInstituicao(dados[i].c126,null);
            
            var l3 = gravaInstituicao(dados[i].l6,null);
            var l7 = gravaInstituicao(dados[i].l10,null);
            var l11 = gravaInstituicao(dados[i].l14,null);

            var m2 = gravaInstituicao(dados[i].m4,null);
            var m7 = gravaInstituicao(dados[i].m9,null);
            var m12 = gravaInstituicao(dados[i].m14,null);
            var m17 = gravaInstituicao(dados[i].m19,null);

            valores = incrementaValores(valores,v1);
            valores = incrementaValores(valores,v2);
            valores = incrementaValores(valores,v3);
            valores = incrementaValores(valores,v4);
            valores = incrementaValores(valores,v5);
            valores = incrementaValores(valores,v6);
            valores = incrementaValores(valores,v7);
            valores = incrementaValores(valores,v8);
            valores = incrementaValores(valores,v9);

            valores = incrementaValores(valores,c1);
            valores = incrementaValores(valores,c7);
            valores = incrementaValores(valores,c13);
            valores = incrementaValores(valores,c19);
            valores = incrementaValores(valores,c25);
            valores = incrementaValores(valores,c31);
            valores = incrementaValores(valores,c37);
            valores = incrementaValores(valores,c43);
            valores = incrementaValores(valores,c49);
            valores = incrementaValores(valores,c55);
            valores = incrementaValores(valores,c61);
            valores = incrementaValores(valores,c67);
            valores = incrementaValores(valores,c73);
            valores = incrementaValores(valores,c79);
            valores = incrementaValores(valores,c85);
            valores = incrementaValores(valores,c91);
            valores = incrementaValores(valores,c97);
            valores = incrementaValores(valores,c103);
            valores = incrementaValores(valores,c109);
            valores = incrementaValores(valores,c125);
            
            valores = incrementaValores(valores,l3);
            valores = incrementaValores(valores,l7);
            valores = incrementaValores(valores,l11);

            valores = incrementaValores(valores,m2);
            valores = incrementaValores(valores,m7);
            valores = incrementaValores(valores,m12);
            valores = incrementaValores(valores,m17);

            break;
      case "instrutor_pessoa":
            tabela = "pessoa";

            var c1 = gravaInstrutorPessoa(dados[i].c3,dados[i].c1);
            var c7 = gravaInstrutorPessoa(dados[i].c9,dados[i].c7);
            var c13 = gravaInstrutorPessoa(dados[i].c15,dados[i].c13);
            var c19 = gravaInstrutorPessoa(dados[i].c21,dados[i].c19);
            var c25 = gravaInstrutorPessoa(dados[i].c27,dados[i].c25);
            var c31 = gravaInstrutorPessoa(dados[i].c33,dados[i].c31);
            var c37 = gravaInstrutorPessoa(dados[i].c39,dados[i].c37);
            var c43 = gravaInstrutorPessoa(dados[i].c45,dados[i].c43);
            var c49 = gravaInstrutorPessoa(dados[i].c51,dados[i].c49);
            var c55 = gravaInstrutorPessoa(dados[i].c57,dados[i].c55);
            var c61 = gravaInstrutorPessoa(dados[i].c63,dados[i].c61);
            var c67 = gravaInstrutorPessoa(dados[i].c69,dados[i].c67);
            var c73 = gravaInstrutorPessoa(dados[i].c75,dados[i].c73);
            var c79 = gravaInstrutorPessoa(dados[i].c81,dados[i].c79);
            var c85 = gravaInstrutorPessoa(dados[i].c87,dados[i].c85);
            var c91 = gravaInstrutorPessoa(dados[i].c93,dados[i].c91);
            var c97 = gravaInstrutorPessoa(dados[i].c99,dados[i].c97);
            var c103 = gravaInstrutorPessoa(dados[i].c105,dados[i].c103);
            var c109 = gravaInstrutorPessoa(dados[i].c121,dados[i].c109);
            var c125 = gravaInstrutorPessoa(dados[i].c127,dados[i].c125);
            
            var l3 = gravaInstrutorPessoa(dados[i].l3,dados[i].l4);
            var l7 = gravaInstrutorPessoa(dados[i].l7,dados[i].l8);
            var l11 = gravaInstrutorPessoa(dados[i].l11,dados[i].l12);

            valores = incrementaValores(valores,c1);
            valores = incrementaValores(valores,c7);
            valores = incrementaValores(valores,c13);
            valores = incrementaValores(valores,c19);
            valores = incrementaValores(valores,c25);
            valores = incrementaValores(valores,c31);
            valores = incrementaValores(valores,c37);
            valores = incrementaValores(valores,c43);
            valores = incrementaValores(valores,c49);
            valores = incrementaValores(valores,c55);
            valores = incrementaValores(valores,c61);
            valores = incrementaValores(valores,c67);
            valores = incrementaValores(valores,c73);
            valores = incrementaValores(valores,c79);
            valores = incrementaValores(valores,c85);
            valores = incrementaValores(valores,c91);
            valores = incrementaValores(valores,c97);
            valores = incrementaValores(valores,c103);
            valores = incrementaValores(valores,c109);
            valores = incrementaValores(valores,c125);
            
            valores = incrementaValores(valores,l3);
            valores = incrementaValores(valores,l7);
            valores = incrementaValores(valores,l11);

            break;
      case "instrutor":
            var c1 = gravaInstrutor(dados[i].c3,dados[i].c2,null,dados[i].c1);
            var c7 = gravaInstrutor(dados[i].c9,dados[i].c8,null,dados[i].c7);
            var c13 = gravaInstrutor(dados[i].c15,dados[i].c14,null,dados[i].c13);
            var c19 = gravaInstrutor(dados[i].c21,dados[i].c20,null,dados[i].c19);
            var c25 = gravaInstrutor(dados[i].c27,dados[i].c26,null,dados[i].c25);
            var c31 = gravaInstrutor(dados[i].c33,dados[i].c32,null,dados[i].c31);
            var c37 = gravaInstrutor(dados[i].c39,dados[i].c38,null,dados[i].c37);
            var c43 = gravaInstrutor(dados[i].c45,dados[i].c44,null,dados[i].c43);
            var c49 = gravaInstrutor(dados[i].c51,dados[i].c50,null,dados[i].c49);
            var c55 = gravaInstrutor(dados[i].c57,dados[i].c56,null,dados[i].c55);
            var c61 = gravaInstrutor(dados[i].c63,dados[i].c62,null,dados[i].c61);
            var c67 = gravaInstrutor(dados[i].c69,dados[i].c68,null,dados[i].c67);
            var c73 = gravaInstrutor(dados[i].c75,dados[i].c74,null,dados[i].c73);
            var c79 = gravaInstrutor(dados[i].c81,dados[i].c80,null,dados[i].c79);
            var c85 = gravaInstrutor(dados[i].c87,dados[i].c86,null,dados[i].c85);
            var c91 = gravaInstrutor(dados[i].c93,dados[i].c92,null,dados[i].c91);
            var c97 = gravaInstrutor(dados[i].c99,dados[i].c98,null,dados[i].c97);
            var c103 = gravaInstrutor(dados[i].c105,dados[i].c104,null,dados[i].c103);
            var c109 = gravaInstrutor(dados[i].c121,dados[i].c120,null,dados[i].c109);
            var c125 = gravaInstrutor(dados[i].c127,dados[i].c126,null,dados[i].c125);
            
            var l1;
            var l3 = gravaInstrutor(dados[i].l3,dados[i].l6,dados[i].l5,dados[i].l4);
            var l7 = gravaInstrutor(dados[i].l7,dados[i].l10,dados[i].l9,dados[i].l8);
            var l11 = gravaInstrutor(dados[i].l11,dados[i].l14,dados[i].l13,dados[i].l12);

            valores = incrementaValores(valores,c1);
            valores = incrementaValores(valores,c7);
            valores = incrementaValores(valores,c13);
            valores = incrementaValores(valores,c19);
            valores = incrementaValores(valores,c25);
            valores = incrementaValores(valores,c31);
            valores = incrementaValores(valores,c37);
            valores = incrementaValores(valores,c43);
            valores = incrementaValores(valores,c49);
            valores = incrementaValores(valores,c55);
            valores = incrementaValores(valores,c61);
            valores = incrementaValores(valores,c67);
            valores = incrementaValores(valores,c73);
            valores = incrementaValores(valores,c79);
            valores = incrementaValores(valores,c85);
            valores = incrementaValores(valores,c91);
            valores = incrementaValores(valores,c97);
            valores = incrementaValores(valores,c103);
            valores = incrementaValores(valores,c109);
            valores = incrementaValores(valores,c125);
            
            valores = incrementaValores(valores,l3);
            valores = incrementaValores(valores,l7);
            valores = incrementaValores(valores,l11);

            if(dados[i].l1 === 1){
              l1 = gravaInstrutor(dados[i].a1,"UNIVERSIDADE FEDERAL RURAL DO RIO DE JANEIRO",1,dados[i].l2);
              valores = incrementaValores(valores,l1);
            }

            break;
      case "capacitacao":
            var c1 = gravaCapacitacao(dados[i].c1,dados[i].c5,dados[i].c3);
            var c7 = gravaCapacitacao(dados[i].c7,dados[i].c11,dados[i].c9);
            var c13 = gravaCapacitacao(dados[i].c13,dados[i].c17,dados[i].c15);
            var c19 = gravaCapacitacao(dados[i].c19,dados[i].c23,dados[i].c21);
            var c25 = gravaCapacitacao(dados[i].c25,dados[i].c29,dados[i].c27);
            var c31 = gravaCapacitacao(dados[i].c31,dados[i].c35,dados[i].c33);
            var c37 = gravaCapacitacao(dados[i].c37,dados[i].c41,dados[i].c39);
            var c43 = gravaCapacitacao(dados[i].c43,dados[i].c47,dados[i].c45);
            var c49 = gravaCapacitacao(dados[i].c49,dados[i].c53,dados[i].c51);
            var c55 = gravaCapacitacao(dados[i].c55,dados[i].c59,dados[i].c57);
            var c61 = gravaCapacitacao(dados[i].c61,dados[i].c65,dados[i].c63);
            var c67 = gravaCapacitacao(dados[i].c67,dados[i].c71,dados[i].c69);
            var c73 = gravaCapacitacao(dados[i].c73,dados[i].c77,dados[i].c75);
            var c79 = gravaCapacitacao(dados[i].c79,dados[i].c83,dados[i].c81);
            var c85 = gravaCapacitacao(dados[i].c85,dados[i].c89,dados[i].c87);
            var c91 = gravaCapacitacao(dados[i].c91,dados[i].c95,dados[i].c93);
            var c97 = gravaCapacitacao(dados[i].c97,dados[i].c101,dados[i].c99);
            var c103 = gravaCapacitacao(dados[i].c103,dados[i].c107,dados[i].c105);
            var c109 = gravaCapacitacao(dados[i].c109,dados[i].c123,dados[i].c121);
            var c125 = gravaCapacitacao(dados[i].c125,dados[i].c129,dados[i].c127);
            
            var l3 = gravaCapacitacao(dados[i].l4,null,dados[i].l3);
            var l7 = gravaCapacitacao(dados[i].l8,null,dados[i].l7);
            var l11 = gravaCapacitacao(dados[i].l12,null,dados[i].l11);

            valores = incrementaValores(valores,c1);
            valores = incrementaValores(valores,c7);
            valores = incrementaValores(valores,c13);
            valores = incrementaValores(valores,c19);
            valores = incrementaValores(valores,c25);
            valores = incrementaValores(valores,c31);
            valores = incrementaValores(valores,c37);
            valores = incrementaValores(valores,c43);
            valores = incrementaValores(valores,c49);
            valores = incrementaValores(valores,c55);
            valores = incrementaValores(valores,c61);
            valores = incrementaValores(valores,c67);
            valores = incrementaValores(valores,c73);
            valores = incrementaValores(valores,c79);
            valores = incrementaValores(valores,c85);
            valores = incrementaValores(valores,c91);
            valores = incrementaValores(valores,c97);
            valores = incrementaValores(valores,c103);
            valores = incrementaValores(valores,c109);
            valores = incrementaValores(valores,c125);
            valores = incrementaValores(valores,l3);
            valores = incrementaValores(valores,l7);
            valores = incrementaValores(valores,l11);

            if(dados[i].l1 === 1){
              l2 = gravaCapacitacao(dados[i].l2,null,dados[i].l1);
              valores = incrementaValores(valores,l2);
            }

            break;
      case "entrevista":
            var valores = [[dados[i].n1,null,pessoaid,dados[i].n5a,null,null,null,null,null,null,dados[i].p1,dados[i].p2,dados[i].n5,dados[i].n6,null,dados[i].p3,dados[i].p4,dados[i].p5,dados[i].p6]];
            break;
      case "opniao":
            valores.push(gravaOpniao(dados[i].n1,1,dados[i].d1));
            valores.push(gravaOpniao(dados[i].n1,2,dados[i].d2));
            valores.push(gravaOpniao(dados[i].n1,3,dados[i].d3));
            valores.push(gravaOpniao(dados[i].n1,4,dados[i].d4));
            valores.push(gravaOpniao(dados[i].n1,5,dados[i].d5));
            valores.push(gravaOpniao(dados[i].n1,6,dados[i].d6));
            valores.push(gravaOpniao(dados[i].n1,7,dados[i].d7));
            valores.push(gravaOpniao(dados[i].n1,8,dados[i].d8));
            valores.push(gravaOpniao(dados[i].n1,9,dados[i].d9));
            valores.push(gravaOpniao(dados[i].n1,10,dados[i].d10));
            valores.push(gravaOpniao(dados[i].n1,11,dados[i].d11));
            valores.push(gravaOpniao(dados[i].n1,12,dados[i].d12));

            valores.push(gravaOpniao(dados[i].n1,13,dados[i].e19));
            valores.push(gravaOpniao(dados[i].n1,14,dados[i].e20));
            valores.push(gravaOpniao(dados[i].n1,15,dados[i].e21));
            valores.push(gravaOpniao(dados[i].n1,16,dados[i].e22));
            valores.push(gravaOpniao(dados[i].n1,17,dados[i].e23));
            valores.push(gravaOpniao(dados[i].n1,18,dados[i].e24));
            
            valores.push(gravaOpniao(dados[i].n1,19,dados[i].f1));
            valores.push(gravaOpniao(dados[i].n1,20,dados[i].f2));
            valores.push(gravaOpniao(dados[i].n1,21,dados[i].f3));
            valores.push(gravaOpniao(dados[i].n1,22,dados[i].f4));
            valores.push(gravaOpniao(dados[i].n1,23,dados[i].f5));
            valores.push(gravaOpniao(dados[i].n1,24,dados[i].f6));
            valores.push(gravaOpniao(dados[i].n1,25,dados[i].f7));
            valores.push(gravaOpniao(dados[i].n1,26,dados[i].f8));
            valores.push(gravaOpniao(dados[i].n1,27,dados[i].f9));
            valores.push(gravaOpniao(dados[i].n1,28,dados[i].f10));
            valores.push(gravaOpniao(dados[i].n1,29,dados[i].f11));
            valores.push(gravaOpniao(dados[i].n1,30,dados[i].f12));
            valores.push(gravaOpniao(dados[i].n1,31,dados[i].f13));
            valores.push(gravaOpniao(dados[i].n1,32,dados[i].f14));
            valores.push(gravaOpniao(dados[i].n1,33,dados[i].f15));

            valores.push(gravaOpniao(dados[i].n1,34,dados[i].g1));
            valores.push(gravaOpniao(dados[i].n1,35,dados[i].g2));
            valores.push(gravaOpniao(dados[i].n1,36,dados[i].g3));
            valores.push(gravaOpniao(dados[i].n1,37,dados[i].g4));
            valores.push(gravaOpniao(dados[i].n1,38,dados[i].g5));
            valores.push(gravaOpniao(dados[i].n1,39,dados[i].g6));
            valores.push(gravaOpniao(dados[i].n1,40,dados[i].g7));
            valores.push(gravaOpniao(dados[i].n1,41,dados[i].g8));
            valores.push(gravaOpniao(dados[i].n1,42,dados[i].g9));
            valores.push(gravaOpniao(dados[i].n1,43,dados[i].g10));
            valores.push(gravaOpniao(dados[i].n1,44,dados[i].g11));
            valores.push(gravaOpniao(dados[i].n1,45,dados[i].g12));
            valores.push(gravaOpniao(dados[i].n1,46,dados[i].g13));
            valores.push(gravaOpniao(dados[i].n1,47,dados[i].g14));

            valores.push(gravaOpniao(dados[i].n1,48,dados[i].h1));
            valores.push(gravaOpniao(dados[i].n1,49,dados[i].h2));
            valores.push(gravaOpniao(dados[i].n1,50,dados[i].h3));

            valores.push(gravaOpniao(dados[i].n1,51,dados[i].j19));
            valores.push(gravaOpniao(dados[i].n1,52,dados[i].j20));

            valores.push(gravaOpniao(dados[i].n1,53,dados[i].o1));
            break;
      case "atividade":
            var i1 = gravaAtividade(dados[i].i1,dados[i].i2,null,null,null,null,null,null,null,null,null,null);
            var i1a = gravaAtividade(dados[i].i1a,dados[i].i2b,null,null,null,null,null,null,null,null,null,null);
            var i1i = gravaAtividade(dados[i].i1i,dados[i].i2j,dados[i].i3,dados[i].i4,dados[i].i5,dados[i].i6,dados[i].i9,dados[i].i10,dados[i].i11,dados[i].i13,dados[i].i12,null);
            
            valores = incrementaValores(valores,i1);
            valores = incrementaValores(valores,i1a);
            valores = incrementaValores(valores,i1i);

            break;
      case "pessoa_atividade":
            var i1 = gravaPessoaAtividade(pessoaid,dados[i].i1);
            var i1a = gravaPessoaAtividade(pessoaid,dados[i].i1a);
            var i1i = gravaPessoaAtividade(pessoaid,dados[i].i1i);

            valores = incrementaValores(valores,i1);
            valores = incrementaValores(valores,i1a);
            valores = incrementaValores(valores,i1i);
            break;
      case "indicacao":
            var l1;
            if(dados[i].l1 === 1){
              l1 = gravaIndicacao(pessoaid,dados[i].a1);
              valores = incrementaValores(valores,l1);
            }
            var l3 = gravaIndicacao(pessoaid,dados[i].l3);
            var l7 = gravaIndicacao(pessoaid,dados[i].l7);
            var l11 = gravaIndicacao(pessoaid,dados[i].l11);

            valores = incrementaValores(valores,l3);
            valores = incrementaValores(valores,l7);
            valores = incrementaValores(valores,l1);
            break;
            


  }
  //console.log(valores);
  
  if (valores === undefined || valores.length == 0){
                callback(dados,i,con);
    return;
  }
  else{
    //console.log("VALORES: "+valores);
    //console.log("VALORES length: "+valores.length);
    if(tabela==="instituicao"){
      var sql ="INSERT IGNORE INTO "+tabela+" VALUES ?";
    
      con.query(sql,[valores],function(err,result){
          if(err){
            throw err;
          }
          else
            callback(dados,i,con);
            //alert("GRAVAÇÃO BEM SUCEDIDA!")
          con.end;
        })
    }
    else if(tabela==="curso"){
      var sql ="INSERT INTO "+tabela+" VALUES ?";
    
      con.query(sql,[valores],function(err,result){
          if(err){
            throw err;
          }
          else
            callback(dados,i,con);
            //alert("GRAVAÇÃO BEM SUCEDIDA!")
          con.end;
        })
    }
    else if(tabela==="pessoa"){
      var sql ="INSERT IGNORE INTO "+tabela+" VALUES ?";
    
      con.query(sql,[valores],function(err,result){
          if(err){
            throw err;
          }
          else
            callback(dados,i,con);
            //alert("GRAVAÇÃO BEM SUCEDIDA!")
          con.end;
        })
    }
    else if(tabela==="indicacao"){
      var sql ="INSERT IGNORE INTO "+tabela+" VALUES ?";
    
      con.query(sql,[valores],function(err,result){
          if(err){
            throw err;
          }
          else
            callback(dados,i,con);
            //alert("GRAVAÇÃO BEM SUCEDIDA!")
          con.end;
        })
    }
    else{
      var sql ="INSERT INTO "+tabela+" VALUES ?";
      
      con.query(sql,[valores],function(err,result){
          if(err){
            throw err;
          }
          else
            callback(dados,i,con);
            //alert("GRAVAÇÃO BEM SUCEDIDA!")
          con.end;
        })
    }

  }
  
}

function geraHash(conteudo){
  var c = JSON.stringify(conteudo);
  var crypto = require("crypto");
  var r = crypto.createHash('sha512').update(c).digest('hex');
  return r;
}

function gravaPessoaAtividade(id_pessoa,nome_atividade){
  if(nome_atividade === 88 || nome_atividade === "NA" || nome_atividade === "NS" || nome_atividade === ""||nome_atividade==="null"||nome_atividade==="NULL")
    return;
  var id_atividade = geraHash(nome_atividade);
  var val = [id_pessoa,id_atividade];

  return val;
}

function gravaIndicacao(pessoaid,nome_instrutor){
  if(nome_instrutor >= 88 || nome_instrutor >= 77 || nome_instrutor === 0 || nome_instrutor === "NA" || nome_instrutor === "NS" || nome_instrutor === ""||nome_instrutor==="null"||nome_instrutor==="NULL")
    return;
  var id_instrutor = geraHash(nome_instrutor+"1");
  var id_indicacao = geraHash(nome_instrutor+"2");
  var val = [id_indicacao,pessoaid,id_instrutor];

  return val;
}

function gravaOpniao(id_entrevista,num_pergunta,resposta){
  var val = [id_entrevista,num_pergunta,resposta];
  return val;
}

function gravaAtividade(nome_atividade,descricao,publico_alvo,quem_publico,usa_info,usa_material,conh_ativ,habil_ativ,atitudes_ativ,melhor_ativ,dific_ativ,unidade){
  if(nome_atividade === 88 || nome_atividade === "NA" || nome_atividade === "NS" || nome_atividade === ""||nome_atividade==="null"||nome_atividade==="NULL")
    return;
  if(unidade === 88 || unidade === "NA" || unidade === "NS" || unidade === ""||unidade==="null"||unidade==="NULL")
    var id_unidade = 0;

  var id_atividade = geraHash(nome_atividade);
  var id_unidade = unidade;

  var val =[id_atividade,nome_atividade,descricao,publico_alvo,quem_publico,usa_info,usa_material,conh_ativ,habil_ativ,atitudes_ativ,melhor_ativ,dific_ativ,id_unidade];
  
  return val;  
}

function gravaCapacitacao(nome_curso,carga_horaria,nome_instrutor){
  if(nome_curso === 88 || nome_curso === "NA" || nome_curso === "NS" || nome_curso === ""||nome_curso==="NULL"||nome_curso==="null")
    return;

  var id_capacitacao = geraHash(nome_curso+"1");
  var id_curso = geraHash(nome_curso);
  var id_instrutor = geraHash(nome_instrutor);

  var val = [id_capacitacao,carga_horaria,id_curso,id_instrutor];

  return val;
}

function gravaInstrutorPessoa(nome_instrutor,curso){
  if(nome_instrutor >= 88 || nome_instrutor >= 77 || nome_instrutor === 0 || nome_instrutor === "NA" || nome_instrutor === "NS" || nome_instrutor === ""||nome_instrutor==="NULL"||nome_instrutor==="null"||nome_instrutor===888||nome_instrutor===8888||nome_instrutor===88888)
    return;
  
  var id = geraHash(nome_instrutor);
  var val =[id,nome_instrutor,null,null,null,null,null,null,null,null,null,null,null];

  return val;

}

function gravaInstrutor(nome_instrutor,nome_inst,local,curso){
  if(nome_instrutor >= 88 || nome_instrutor >= 77 || nome_instrutor === 0 || nome_instrutor === "NA" || nome_instrutor === "NS" || nome_instrutor === ""||nome_instrutor==="NULL"||nome_instrutor==="null"||nome_instrutor===888||nome_instrutor===8888||nome_instrutor===88888)
    return;
  if(nome_inst >= 88 || nome_instrutor >= 77 || nome_instrutor === 0 || nome_inst === "NA" || nome_inst === "NS" || nome_inst === ""||nome_inst==="NULL"||nome_inst==="null")
    id_instituicao=null;

  var id_instrutor =  geraHash(nome_instrutor+"1");
  var id_pessoa = geraHash(nome_instrutor);
  var id_instituicao = geraHash(nome_inst);

  var val = [id_instrutor,local,id_instituicao,id_pessoa];

  return val;
}

function incrementaValores(valores,valor){
  if(valor !== undefined && valor.length != 0)
    valores.push(valor);
  return valores;
}

function gravaInstituicao(nome_inst, status_inst){
  
  if(nome_inst === 88 || nome_inst === "NA" || nome_inst === "NS" || nome_inst === ""||nome_inst==="NULL"||nome_inst==="null")
    return;
  var conteudo = nome_inst
  var id_inst = geraHash(conteudo);
  var val=[id_inst,nome_inst,status_inst];
  
  return val;
  
}

function gravaCurso(pessoaid,nome_curso,tipo,area_temat,area_conh){
  if(nome_curso === 88 || nome_curso === "NA" || nome_curso === "NS" || nome_curso === ""||nome_curso==="NULL"||nome_curso==="null")
    return;
  var conteudo = pessoaid+nome_curso+tipo;
  var id_curso = geraHash(conteudo);
  var val = [id_curso,nome_curso,tipo,area_temat,area_conh];

  return val;
}

function gravaPessoaCurso(id_pessoa,nome_curso,data_conc,nome_inst,financiado_ufrrj){
  if(nome_curso === 88 || nome_curso === "NA" || nome_curso === "NS" || nome_curso === ""||nome_curso==="NULL"||nome_curso==="null")
    return;
  else if(nome_inst === 88 || nome_inst === "NA" || nome_inst === "NS" || nome_inst === ""||nome_inst==="NULL"||nome_inst==="null")
    id_inst = null;
  else{
    var id_curso = geraHash(nome_curso);
    var id_inst = geraHash(nome_inst);
    var val = [id_pessoa,id_curso,data_conc,id_inst,financiado_ufrrj];
     
    return val;
  }
}
/**
function reverte(con){
  var sql = "set foreign_key_checks = 0;"+
    +"TRUNCATE TABLE sismap.atividade;"+
    +"TRUNCATE TABLE sismap.bolsista;"+
    +"TRUNCATE TABLE sismap.capacitacao;"+
    +"TRUNCATE TABLE sismap.cedido;"+
    +"TRUNCATE TABLE sismap.docente;"+
    +"TRUNCATE TABLE sismap.docente_tecnico;"+
    +"TRUNCATE TABLE sismap.ed_superior;"+
    +"TRUNCATE TABLE sismap.entrevista;"+
    +"TRUNCATE TABLE sismap.estagiario;"+
    +"TRUNCATE TABLE sismap.indicacao;"+
    +"TRUNCATE TABLE sismap.instituicao;"+
    +"TRUNCATE TABLE sismap.instrutor;"+
    +"TRUNCATE TABLE sismap.opniao;"+
    +"TRUNCATE TABLE sismap.pessoa;"+
    +"TRUNCATE TABLE sismap.pessoa_atividade;"+
    +"TRUNCATE TABLE sismap.pessoa_curso;"+
    +"TRUNCATE TABLE sismap.pessoa_unidade;"+
    +"TRUNCATE TABLE sismap.servidor;"+
    +"TRUNCATE TABLE sismap.tecnico_adm;"+
    +"TRUNCATE TABLE sismap.terceirizado;"+
    +"TRUNCATE TABLE sismap.usuario;"+
    +"set foreign_key_checks = 1;"

  con.query(sql,function(err,result){
      if(err) 
        throw err;
      else
        console.log(result);
        //alert("GRAVAÇÃO BEM SUCEDIDA!")
      con.end;
    })

  console.log("LIMPOU");
}
*/     

/**
function gravaTabelaSQL(tabela,dados,values,con){
  var vl = values;
  var idspessoas=[];
  switch(tabela){
    case "pessoa":
      for(var i=0; i < dados.length; i++){
        var pessoaid = encode().value(dados[i].a1);
        console.log(pessoaid);
        idspessoas.push(pessoaid);
        var v=[pessoaid,dados[i].a1,dados[i].a2,dados[i].a3,dados[i].a26,dados[i].a27,dados[i].a28,dados[i].b2,dados[i].b1,dados[i].a5,dados[i].n4,dados[i].n3,dados[i].n2];
        vl.push(v);

      }
      break;
    case "pessoa_curso": // MÉTODO AINDA COM ERROS! PRECISA COLOCAR O IF DENTRO DO FOR, PARA Q POSSA RECONHECER  dados[i]
      var nid = dados[i].b3;
      console.log(nid);
      if(parseInt(nid)>=0 && parseInt(nid)<=13){
        for(var i=0; i < dados.length; i++){
          var v=[idspessoas[i],dados[i].b3,dados[i].b4,null,null];
          vl.push(v);
          console.log('teve');
        }
      }
      break;
  }
  //console.log(idspessoas);
  var sql ="INSERT INTO "+tabela+" VALUES ?";
  con.query(sql,[vl],function(err,result){
    if(err) 
      throw err;
    else
      console.log(result);
      alert("GRAVAÇÃO BEM SUCEDIDA!")
    con.end;
  })
}
*/
      
