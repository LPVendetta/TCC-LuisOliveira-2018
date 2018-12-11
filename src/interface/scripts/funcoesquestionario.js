var banco = require(__dirname + '\\scripts\\concBanco.js');
var camposGrad = 0;

function populaAreaTematica(element){
    var select = element;
    if (select.options.length){
        return;
    }
    else{
        var con = banco.conexaoBD();
        var queryAT = 'SELECT * FROM area_tematica ORDER BY Nome DESC';

        con.query(queryAT, function(err,rows){
            if(err) throw err;
            
            for (var i in rows){
                var option = document.createElement('option');
                option.value = rows[i].AreaTematicaID;
                option.text = rows[i].Nome;
                select.add(option,0);
            }
        
        });
    }

}

function populaAreaConhecimento(element){
    var select = element;
    if (select.options.length){
        return;
    }
    else{
        var con = banco.conexaoBD();
        var queryAC = 'SELECT * FROM area_conhecimento ORDER BY Nome DESC';

        con.query(queryAC, function(err,rows){
            if(err) throw err;
            
            for (var i in rows){
                var option = document.createElement('option');
                option.value = rows[i].AreaConhecimentoID;
                option.text = rows[i].Nome;
                select.add(option,0);
            }
        
        });
    }

}

function populaUnidade(element){
    var select = element;
    if (select.options.length){
        return;
    }
    else{
        var con = banco.conexaoBD();
        var queryUnidade = 'SELECT * FROM unidade ORDER BY Nome DESC';

        con.query(queryUnidade, function(err,rows){
            if(err) throw err;
            
            for (var i in rows){
                var option = document.createElement('option');
                option.value = rows[i].CodigoUnidade;
                option.text = rows[i].Nome;
                select.add(option,0);
            }
        
        });
    }

}

function populaCargo(element){
    var select = element;
    if (select.options.length){
        return;
    }
    else{
        var con = banco.conexaoBD();
        var queryUnidade = 'SELECT * FROM cargo ORDER BY Nome DESC';

        con.query(queryUnidade, function(err,rows){
            if(err) throw err;
            
            for (var i in rows){
                var option = document.createElement('option');
                option.value = rows[i].CargoID;
                option.text = rows[i].Nome;
                select.add(option,0);
            }
        
        });
    }

}

function questao14(){

    if (document.getElementById("a14").value == 2){
        //alert("Caso não, siga para pergunta 17");
        document.getElementById("chefia").style.display="none";
        document.getElementById("tiposervico").focus();
    } else {
        //alert("Caso sim, siga para pergunta 15");
        document.getElementById("chefia").style.display="block";
        document.getElementById("a15").focus();
    }
}

function questao15(){

    alert("-Se for Técnico-Administrativo siga normalmente. ");
    alert("-Se for docente, siga para a pergunta 20.");
    alert("-Se for docente do ensino técnico, siga para apergunta 20.a");
    alert("-Nenhuma das opções, siga para a pergunta 22.");
}
function servico(){
    if(document.getElementById("tiposervico").value!==0){
        valor = document.getElementById("tiposervico").value;
        switch(valor){
            case "1":
                //alert(valor);
                controlaDivOculto("tecadm",1);
                controlaDivOculto("docente",0);
                controlaDivOculto("docente-tec",0);
                //document.getElementById("tecadm").style.display="block";
                //document.getElementById("docente").style.display="none";
                //document.getElementById("docente-tec").style.display="none";
                document.getElementById("a17").disabled = false;
                document.getElementById("a18").disabled = false;
                document.getElementById("a19").disabled = false;
                document.getElementById("a20").disabled = true;
                document.getElementById("a21").disabled = true;
                document.getElementById("a22").disabled = true;
                document.getElementById("a23").disabled = true;
                break;
            case "2":
                //alert(valor);
                document.getElementById("docente").style.display="block";
                document.getElementById("tecadm").style.display="none";
                document.getElementById("docente-tec").style.display="none";
                document.getElementById("a17").disabled = true;
                document.getElementById("a18").disabled = true;
                document.getElementById("a19").disabled = true;
                document.getElementById("a20").disabled = false;
                document.getElementById("a21").disabled = false;
                document.getElementById("a22").disabled = true;
                document.getElementById("a23").disabled = true;
                break;
            case "3":
                //alert(valor);
                document.getElementById("docente-tec").style.display="block";
                document.getElementById("tecadm").style.display="none";
                document.getElementById("docente").style.display="none";
                document.getElementById("a17").disabled = true;
                document.getElementById("a18").disabled = true;
                document.getElementById("a19").disabled = true;
                document.getElementById("a20").disabled = true;
                document.getElementById("a21").disabled = true;
                document.getElementById("a22").disabled = false;
                document.getElementById("a23").disabled = false;
                break;
        }
    }
}

function questao17(){
    if(document.getElementById("a17").value!==77){
        alert("Siga normalmente");
        document.getElementById("a18").focus();
        document.getElementById("a20").disabled = true;
        document.getElementById("a21").disabled = true;
        document.getElementById("a22").disabled = true;
        document.getElementById("a23").disabled = true;
    }
    else{
       alert("Siga para questão");
        document.getElementById("a18").focus();
        document.getElementById("a20").disabled = true;
        document.getElementById("a21").disabled = true;
        document.getElementById("a22").disabled = true;
        document.getElementById("a23").disabled = true; 
    }
}

function questao19(){
    alert("Siga pra pergunta 22");
    document.getElementById("a22").focus();
}


function questao21(){
    alert("Siga pra pergunta 22");
    document.getElementById("a22").focus();
}

/**
*Função que controla quando revelar ou ocultar uma div com a class "oculto".
*Ao ser chamada, o parâmetro controle determina se a div determinada pelo id passado irá permanecer oculta (controle = 0) ou será revelada (controle=1).
*/
function controlaDivOculto(id,controle){
    if(controle == 0){
        document.getElementById(id).style.display="none";
    }
    else if(controle == 1){
        document.getElementById(id).style.display="block";
    }
}

function trajetoriaEdu(element){
    var v = element.value;

    switch(v){
        case "88":
            controlaDivOculto("cursoMedio",0);
            controlaDivOculto("cursoTec",0);
        break;
        case "10":
            controlaDivOculto("cursoMedio",1);
            controlaDivOculto("cursoTec",0);
        break;
        case "20":
            controlaDivOculto("cursoTec",1);
            controlaDivOculto("cursoMedio",0);
        break;
        case "21":
            controlaDivOculto("cursoMedio",1);
            controlaDivOculto("cursoTec",0);
        break;
    }

}

function escolaridade(){
    //console.log(document.getElementById("b3").value);
    valor = document.getElementById("b3").value;
    if((valor!=="null")&&(valor!=="77")&&(valor!=="0")){
        
        if((valor>=1)&&(valor<=13)){
            controlaDivOculto("anoconclusao",1);
            controlaDivOculto("graduacao",0);
            controlaDivOculto("especializacao",0);
            controlaDivOculto("mestrado",0);
            controlaDivOculto("doutorado",0);
            controlaDivOculto("posdoc",0);
        }
        else{
            switch(valor){
                case "14"://graduação
                    addNovaDiv("addGrad");
                    controlaDivOculto("anoconclusao",0);
                    controlaDivOculto("graduacao",1);
                    controlaDivOculto("especializacao",0);
                    controlaDivOculto("mestrado",0);
                    controlaDivOculto("doutorado",0);
                    controlaDivOculto("posdoc",0);
                break;
                case "15"://especializacao
                    controlaDivOculto("anoconclusao",0);
                    controlaDivOculto("graduacao",1);
                    controlaDivOculto("especializacao",1);
                    controlaDivOculto("mestrado",0);
                    controlaDivOculto("doutorado",0);
                    controlaDivOculto("posdoc",0);
                break;
                case "16"://mestrado
                    addNovaDiv("addGrad");
                    addNovaDiv("addMestr");
                    controlaDivOculto("anoconclusao",0);
                    controlaDivOculto("graduacao",1);
                    controlaDivOculto("especializacao",1);
                    controlaDivOculto("mestrado",1);
                    controlaDivOculto("doutorado",0);
                    controlaDivOculto("posdoc",0);
                break;
                case "17"://doutorado
                    addNovaDiv("addGrad");
                    addNovaDiv("addMestr");
                    addNovaDiv("addDoc");
                    controlaDivOculto("anoconclusao",0);
                    controlaDivOculto("graduacao",1);
                    controlaDivOculto("especializacao",1);
                    controlaDivOculto("mestrado",1);
                    controlaDivOculto("doutorado",1);
                    controlaDivOculto("posdoc",0);
                break;
                case "18"://posdoc
                    addNovaDiv("addGrad");
                    addNovaDiv("addMestr");
                    addNovaDiv("addDoc");
                    controlaDivOculto("anoconclusao",0);
                    controlaDivOculto("graduacao",1);
                    controlaDivOculto("especializacao",1);
                    controlaDivOculto("mestrado",1);
                    controlaDivOculto("doutorado",1);
                    controlaDivOculto("posdoc",1);
                break;
            }
        }
    }
    else{
        controlaDivOculto("anoconclusao",0);
        controlaDivOculto("graduacao",0);
        controlaDivOculto("especializacao",0);
        controlaDivOculto("mestrado",0);
        controlaDivOculto("doutorado",0);
        controlaDivOculto("posdoc",0);
    }
}

function addNovaDiv(id){
    /**
    * GRAD guarda a div onde será inserida a nova div. N é o número de novas divs que foram geradas. COD é o código do tipo de 
    * graduação superior correspondente à div gerada. LABEL é o nome do tipo de curso (Graduação, Especialização, Mestrado, etc.)
    * NOVADIV é a variável que contém o código html da nova div que será gerada.
    */
    var grad,n,cod,label,novadiv;
    switch(id){
            case "addGrad":
                grad = document.getElementById("conteudoGrad");
                cod=14;
                label="Graduação";
            break;
            case "addEspec":
                grad = document.getElementById("conteudoEspec");
                cod=15;
                label="Especialização";
            break;
            case "addMestr":
                grad = document.getElementById("conteudoMestr");
                cod=16;
                label="Mestrado";
            break;
            case "addDoc":
                grad = document.getElementById("conteudoDoc");
                cod=17;
                label="Doutorado";
            break;
            case "addPosdoc":
                grad = document.getElementById("conteudoPosdoc");
                cod=18;
                label="Pós-Doutorado";
            break;
    }
    n = grad.childNodes.length;
    novadiv="<div id='grad'>"+
    "<form id='dinamicGrad'>"+
        "<fieldset>"+
                label+" - Curso "+n+":<input type ='text' class='campo' name = 'nomeCurso' id = 'nomeCurso' required/> <br/>"+               
                "Área Temática:<br/>"+
                "<select class='campo' name = 'areaTematica' id = 'areaTematica' onclick='populaAreaTematica(this)' required>"+
                "</select><br/><br/>"+
                "Área de Conhecimento:"+
                "<select class='campo' name = 'areaConhecimento' id = 'areaConhecimento' onclick='populaAreaConhecimento(this)' required>"+
                "</select><br/><br/>"+
                "Nome da instituição (especificar país):<input type ='text' class='campo' name = 'nomeInstituicao' id = 'nomeInstituicao' class='instituicao' required/><br/>"+
                "Ano de Conclusão:<input type ='text' class='campo' name = 'anoConclusao' id = 'anoConclusao' required/><br/>"+
                "55 Ainda está cursando<br/>"+
                "66 Interrompeu<br/>"+
                "88 Não Fez/NA<br/><br/>"+
                "A Instituição é :<br/>"+
                "<select name = 'tipoInstituicao' id = 'tipoInstituicao' class='campo' class='instituicao' required>"+
                    "<option value ='1'>1 Pública </option>"+
                    "<option value ='2'>2 Privada</option>"+
                    "<option value ='88'>88 NA</option>"+
                "</select>"+
                "<br><br>"+                          
                "Foi financiada pela UFRRJ :<br/>"+
                "<select name ='financiadaUFRRJ' id='financiadaUFRRJ' class='campo' required>"+
                    "<option value ='0'>0 NÃO</option>"+
                    "<option value ='1'>1 SIM</option>"+
                    "<option value ='88'>88 NA</option>"+
                "</select>"+
                "<br><br>"+
                "<input type='hidden' name='tipocurso' id='tipocurso' value="+cod+">"+
                "<input type='button' id='formGrad' value='VALIDAR' onclick='validarForm(this.form)'>"+
            "</fieldset>"+
        "</form>"+
    "<br><br></div>";
    grad.insertAdjacentHTML("beforeend",novadiv);
}

function addNovaCapac(){
    var capac, n, novadiv;
    capac = document.getElementById("conteudoCapac");
    n = capac.childNodes.length;
    novadiv = "<div id='capac'>"+
        "<form id='dinamicCapac'>"+
            "<fieldset>"+
                "Capacitação "+n+" em:"+
                            "<input type ='text' class='campo' name = 'nomeCurso' id = 'nomeCurso' required/><br/>"+
                        "Área Temática:"+
                            "<select class='campo' name = 'areaTematica' id = 'areaTematica' onclick='populaAreaTematica(this)' required/></select><br><br>"+
                        "Ministrada por (Instituição):"+
                            "<input type ='text' class='campo' name = 'nomeInstituicao' id = 'nomeInstituicao' class='instituicao' required/><br/>"+
                        "077 NS<br/><br/>"+
                        "Ministrada por (Instrutor):"+
                            "<input type ='text' class='campo' name = 'nomeInstrutor' id = 'nomeInstrutor' required/><br/>"+
                        "077 NS<br/><br/>"+
                        "Financiada pela UFRRJ:<br/>"+
                        "<select name='financiadaUFRRJ' id='financiadaUFRRJ' class='campo' required>"+
                            "<option value ='0'>0 NÃO</option>"+
                            "<option value ='1'>1 SIM</option>"+
                        "</select>"+
                        "<br><br>"+
                        "Carga horária:"+
                            "<input type ='text' class='campo' name = 'cargaHoraria' id = 'cargaHoraria' required/><br/>"+
                        "77 NS<br/><br/>"+
                        "Ano de Conclusão:"+
                            "<input type ='text' class='campo' name = 'anoConclusao' id = 'anoConclusao' required/><br/>"+
                        "55 ainda cursando<br/>"+
                        "66 interrompeu<br/>"+
                        "77 NS<br/><br/>"+
                        "<input type='button' id='formCapac' value='VALIDAR' onclick='validarForm(this.form)'>"+
            "</fieldset>"+
        "</form>"+
    "<br><br></div>";
    capac.insertAdjacentHTML("beforeend",novadiv);
}

function addOutraAtiv(){
    var outraAtiv,n,novadiv;
    outraAtiv = document.getElementById("conteudoOutraAtiv");
    n = outraAtiv.childNodes.length;
    if(n<=3){
        if(n==1){
            var i=0;
            var j=0;
        }
        if(n==2){
            var i=3 
            var j=3;
        }
        if(n==3){
            var i=6;
            var j=6;
        }

        novadiv ="<div id='outraAtiv'>"+
        "<form id='dinamicOutraAtiv'>"+
            "<fieldset>"+
                    "Outra atividade "+n+": "+
                        "<input type ='text' class='campo' name = 'd"+(n+i++)+"' id = '"+(n+j++)+"' required /> 88 NA (Nenhuma)<br/><br/>"+
                    "Em que unidade?<br/>"+
                        "<select name='d"+(n+i++)+"' id='"+(n+j++)+"' class='campo' required >"+
                            "<option value='1'>1 Na sua própria unidade</option>"+
                            "<option value='2'>2 Em outra</option>"+
                            "<option value='3'>3 Nas duas</option>"+
                            "<option value='88'>88 NA</option>"+
                        "</select><br><br>"+
                    "Qual unidade:<br/>"+
                        "<input type ='text' class='campo' name = 'd"+(n+i++)+"' id = '"+(n+j++)+"' required /> 88 NA<br/><br/>"+
                    "Por que:<br/>"+
                        "<input type ='textarea' class='campo' name = 'd"+(n+i++)+"' id = '"+(n+j++)+"' required /> 88 NA<br/><br/>"+
                        "<input type='button' id='formOutraAtividade' value='VALIDAR' onclick='validarForm(this.form)'>"+
            "</fieldset>"+
        "</form><br><br>"+
        "</div>";
        outraAtiv.insertAdjacentHTML("beforeend",novadiv);
    }
    else{
        document.getElementById("addOutraAtiv").disabled = true;
    }
}