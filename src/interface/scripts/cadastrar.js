var banco = require(__dirname + '\\scripts\\concBanco.js');
var hash = require(__dirname + '\\scripts\\hash.js');

function cadastrarDados(){
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

for (var i = 1; i<=5;i++){
    controle['n'+i] = document.getElementById('n'+i).value;
}
for (var i=1 ; i <=31; i++) {
    blocoA['a'+i] = document.getElementById('a'+i).value;
}

for (var i = 1 ; i <= 52; i++) {
    blocoB['b'+i] = document.getElementById('b'+i).value;
}
for (var i = 1 ; i <= 28; i++) {
    blocoC['c'+i] = document.getElementById('c'+i).value;
}
for (var i = 1 ; i <= 12; i++) {
    blocoD['d'+i] = document.getElementById('d'+i).value;
}
for (var i = 1 ; i <= 6; i++) {
    blocoE['e'+i] = document.getElementById('e'+i).value;
}
for (var i = 1 ; i <= 15; i++) {
    blocoF['f'+i] = document.getElementById('f'+i).value;
}
for (var i = 1 ; i <= 14; i++) {
    blocoG['g'+i] = document.getElementById('g'+i).value;
}
for (var i = 1 ; i <= 3; i++) {
    blocoH['h'+i] = document.getElementById('h'+i).value;
}
for (var i = 1 ; i <= 11; i++) {
    blocoI['i'+i] = document.getElementById('i'+i).value;
}
for (var i = 1 ; i <= 2; i++) {
    blocoJ['j'+i] = document.getElementById('j'+i).value;
}
for (var i = 1 ; i <= 15; i++) {
    blocoL['l'+i] = document.getElementById('l'+i).value;
}
for (var i = 1 ; i <= 25; i++) {
    blocoM['m'+i] = document.getElementById('m'+i).value;
}

var HoraTermino = document.getElementById("HoraTermino").value;
var MinutoTermino = document.getElementById("MinutoTermino").value;
var Observacao = document.getElementById("Observacao").value;

var pessoaid = hash.geraHash(blocoA["a1"],blocoA["a2"],blocoA["a3"]);
var TipoServico = document.getElementById("tiposervico").value;
var unidadeTrabalho = document.getElementById("tiposervico").value;

//console.log(blocoH["h1"]);
valuesAreaConhecimento=[AreaConhecimento,Nome];
valuesAreaTematica=[AreaTematica, Nome, FK_AreaConhecimento];
valuesAtividade=[AtividadeID, Nome, Descricao, PublicoAlvo, QuemPublicoAlvo, UtilizaInfo, Setor, UtilizaMaterialSetor, ConhecimentoAtividade, HabilidadeAtividade, AtitudesAtividade, MelhoriaAtividade, FK_Unidade];
valuesBolsista =[Pessoa_PessoaID];
valuesCapacitacao=[CapacitacaoID, CargaHoraria, FK_CursoID, FK_Instrutor];
valuesCedido=[Servidor_FK_PessoaID, Servidor_ServidorID];

valuesCurso=[CursoID, Nome, Tipo, FinanciadorUFRRJ, FK_AreaTematica];

valuesDocente = [pessoaid,pessoaid,blocoA["a20"],blocoA["a21"]];

valuesDocenteTecnico = [pessoaid, pessoaid, blocoA["a22"], blocoA["a23"]];

valuesEdSuperior = [Ed_SuperiorID, Tipoi, FK_CursoID];
valuesEntrevista = [];
valuesEstagiario =[Pessoa_PessoaID];
valuesindicacao = [IndicacaoID, FK_IndicadorID, FK_InstrutorIndicadoID];
valuesInstituicao =[InstituicaoID, Nome, Status];
valuesInstrutor = [InstrutorID, Local, FK_Intituicao, FK_PessoaID];
valuesOpniao = [FK_EntrevistaID, FKNumeroPergunta, Resposta];
valuesPergunta = [PerguntaID,Descricao];

valuesPessoa=[ pessoaid, blocoA["a1"], blocoA["a2"], blocoA["a3"], blocoA["29"], blocoA["30"], blocoA["31"], blocob["b2"], blocoB["b1"], Tipo, Unidade_trabalho_ut_id];

valuesPessoaAtividade =[FK_PessoaID, FK_AtividadeID];

valuesPessoa_Curso=[blocoB["b4"], pessoaid, blocoB["b3"], FK_IntituicaoID];

valuesServidor =[pessoaid, pessoaid, blocoA["a6"], DeficienciuaFisica, TipoServico, blocoA["a7"], blocoA["a8"], blocoA["a9"], blocoA["a11"], blocoA["a12"], blocoA["a13"], blocoA["a14"], blocoA["a15"], blocoA["a16"], blocoA["a24"], blocoA["a25"], blocoA["a26"], blocoA["a27"], blocoA["a28"]]

valuesTecnicoAdm=[pessoaid,pessoaid, blocoA["a17"], blocoA["a18"], blocoA["19"]];

valuesTercerizado=[Pessoa_PessoaID];
valuesUnidadeIntermediaria = [UI_ID, Nome, Unidade_Organizacional_UO_ID];
valuesUnidadeOrganizacional = [UO_ID, Nome];
valuesUnidadeTrabalho = [UT_ID, Nome, FK_UI, FK_UO];
valuesUsuario=[UsuarioID, Login, Senha, Tipo, FK_PessoaID];


/**GRADUAÇÃO*/
var instituicoes = document.getElementsByClassName("instituicao");
var valuesInstituicao =[];

for(var i=0;i<instituicoes.length;i++){
    valuesInstituicao.push(valoresInstituicao(instituicoes[i]));
}

//valoresInstituicao = valoresInstituicao();

//console.log(valuesPessoa);
/**valuesServidor=[ /sFK_Pessoa/,/sServidorIDq/,sMatriculaSIAPE,blocoA[3],/sTipoServico/,sLotacao,sTempoForaPublico,sTempoForaCadastradoDP,sAnoIngressoPublico,sAnoIngressoUFRRJ,sCargo,sCargoDesdeAno,sExerceChefia,sFuncaoChefia,sChefiaDesdeAno,sHorarioTrabalho,sQtsDiasSemana,sCargaHorariaSemanal,sDescHorario,sTelefoneSetor]

valuesTecAdm=[/taServidor_FK_PessoaID/,/taServidor_ServidorID/, taClasse,taNivelCarreira,taNivelCapacitacao];

valuesDocente=[/taServidor_FK_PessoaID/,/taServidor_ServidorID/,dClasse,dtNivelCarreira];

valuesDocenteTec=[/taServidor_FK_PessoaID/,/taServidor_ServidorID/,dtClasse,dtNivelCarreira];

console.log(valuesPessoa);

var query = "INSERT INTO pessoa(PerguntaID, Descricao) VALUES (?)";
            con.query(query,[valuesPessoa], function(err, rows, fields) {
                if(err){
                    console.log("Erro na inserção na tabela pessoa");
                    console.log(err);
                    return;
                }
                console.log("Registro realizado com sucesso na tabela pessoa");
                alert("Registro realizado com sucesso")
            });

            con.end(function(err){
            	console.log('Coneção encerrada')
			});
            */
}

function valoresInstituicao(dados){
    var nomeInstituicao = dados.
}