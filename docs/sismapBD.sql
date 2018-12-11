-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sismap
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `area_conhecimento`
--

DROP TABLE IF EXISTS `area_conhecimento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `area_conhecimento` (
  `AreaConhecimentoID` int(11) NOT NULL,
  `Nome` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`AreaConhecimentoID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `area_tematica`
--

DROP TABLE IF EXISTS `area_tematica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `area_tematica` (
  `AreaTematicaID` int(11) NOT NULL,
  `Nome` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`AreaTematicaID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `atividade`
--

DROP TABLE IF EXISTS `atividade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `atividade` (
  `AtividadeID` char(128) NOT NULL,
  `Nome` longtext,
  `Descricao` longtext,
  `PublicoAlvo` int(11) DEFAULT NULL,
  `QuemPublicoAlvo` longtext,
  `UtilizaInfoSetor` longtext,
  `UtilizaMaterialSetor` longtext,
  `ConhecimentoAtividade` longtext,
  `HabilidadesAtividade` longtext,
  `AtitudesAtividade` longtext,
  `MelhoriaAtividade` longtext,
  `DificultaAtividade` longtext,
  `FK_Unidade` int(11) DEFAULT NULL,
  PRIMARY KEY (`AtividadeID`),
  KEY `fk_ATIVIDADE_UNIDADE_TRABALHO1_idx` (`FK_Unidade`),
  CONSTRAINT `fk_ATIVIDADE_UNIDADE_TRABALHO1` FOREIGN KEY (`FK_Unidade`) REFERENCES `unidade` (`CodigoUnidade`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bolsista`
--

DROP TABLE IF EXISTS `bolsista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bolsista` (
  `PESSOA_PessoaID` char(128) NOT NULL,
  PRIMARY KEY (`PESSOA_PessoaID`),
  KEY `fk_BOLSISTA_PESSOA1_idx` (`PESSOA_PessoaID`),
  CONSTRAINT `fk_BOLSISTA_PESSOA1` FOREIGN KEY (`PESSOA_PessoaID`) REFERENCES `pessoa` (`PessoaID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `capacitacao`
--

DROP TABLE IF EXISTS `capacitacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `capacitacao` (
  `CapacitacaoID` char(128) NOT NULL,
  `CargaHoraria` longtext,
  `FK_CursoID` char(128) NOT NULL,
  `FK_Instrutor` char(128) NOT NULL,
  PRIMARY KEY (`CapacitacaoID`,`FK_CursoID`,`FK_Instrutor`),
  KEY `fk_CAPACITACAO_CURSO1_idx` (`FK_CursoID`),
  KEY `fk_CAPACITACAO_INSTRUTOR1_idx` (`FK_Instrutor`),
  CONSTRAINT `fk_CAPACITACAO_CURSO1` FOREIGN KEY (`FK_CursoID`) REFERENCES `curso` (`CursoID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_CAPACITACAO_INSTRUTOR1` FOREIGN KEY (`FK_Instrutor`) REFERENCES `instrutor` (`InstrutorID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cargo`
--

DROP TABLE IF EXISTS `cargo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cargo` (
  `CargoID` int(11) NOT NULL,
  `Nome` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`CargoID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cedido`
--

DROP TABLE IF EXISTS `cedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cedido` (
  `SERVIDOR_FK_PessoaID` char(128) NOT NULL,
  `SERVIDOR_ServidorID` char(128) NOT NULL,
  PRIMARY KEY (`SERVIDOR_FK_PessoaID`,`SERVIDOR_ServidorID`),
  KEY `fk_CEDIDO_SERVIDOR1_idx` (`SERVIDOR_FK_PessoaID`,`SERVIDOR_ServidorID`),
  CONSTRAINT `fk_CEDIDO_SERVIDOR1` FOREIGN KEY (`SERVIDOR_FK_PessoaID`) REFERENCES `servidor` (`FK_PessoaID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `curso`
--

DROP TABLE IF EXISTS `curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `curso` (
  `CursoID` char(128) NOT NULL,
  `Nome` longtext,
  `Tipo` int(11) DEFAULT NULL,
  `FK_AreaTematica` int(11) DEFAULT NULL,
  `FK_AreaConhecimento` int(11) DEFAULT NULL,
  PRIMARY KEY (`CursoID`),
  KEY `fk_CURSO_AREA_TEMATICA1_idx` (`FK_AreaTematica`),
  KEY `fk_CUROS_AREA_CONHECIMENTO_idx` (`FK_AreaConhecimento`),
  KEY `fk_CURSO_TIPO_CURSO_idx` (`Tipo`),
  CONSTRAINT `fk_CUROS_AREA_CONHECIMENTO` FOREIGN KEY (`FK_AreaConhecimento`) REFERENCES `area_conhecimento` (`AreaConhecimentoID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_CURSO_AREA_TEMATICA1` FOREIGN KEY (`FK_AreaTematica`) REFERENCES `area_tematica` (`AreaTematicaID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_CURSO_TIPO_CURSO` FOREIGN KEY (`Tipo`) REFERENCES `tipo_curso` (`Codigo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `docente`
--

DROP TABLE IF EXISTS `docente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `docente` (
  `SERVIDOR_FK_PessoaID` char(128) NOT NULL,
  `SERVIDOR_ServidorID` char(128) NOT NULL,
  `Classe` longtext,
  `NivelCarreira` longtext,
  PRIMARY KEY (`SERVIDOR_FK_PessoaID`,`SERVIDOR_ServidorID`),
  KEY `fk_DOCENTE_SERVIDOR1_idx` (`SERVIDOR_FK_PessoaID`,`SERVIDOR_ServidorID`),
  CONSTRAINT `fk_DOCENTE_SERVIDOR1` FOREIGN KEY (`SERVIDOR_FK_PessoaID`) REFERENCES `servidor` (`FK_PessoaID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `docente_tecnico`
--

DROP TABLE IF EXISTS `docente_tecnico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `docente_tecnico` (
  `SERVIDOR_FK_PessoaID` char(128) NOT NULL,
  `SERVIDOR_ServidorID` char(128) NOT NULL,
  `Classe` longtext,
  `NivelCarreira` longtext,
  PRIMARY KEY (`SERVIDOR_FK_PessoaID`,`SERVIDOR_ServidorID`),
  KEY `fk_DOCENTE_TECNICO_SERVIDOR1_idx` (`SERVIDOR_FK_PessoaID`,`SERVIDOR_ServidorID`),
  CONSTRAINT `fk_DOCENTE_TECNICO_SERVIDOR1` FOREIGN KEY (`SERVIDOR_FK_PessoaID`) REFERENCES `servidor` (`FK_PessoaID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ed_superior`
--

DROP TABLE IF EXISTS `ed_superior`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ed_superior` (
  `Ed_SuperiorID` char(128) NOT NULL,
  `Tipoi` int(11) DEFAULT NULL,
  `FK_CursoID` char(128) NOT NULL,
  PRIMARY KEY (`Ed_SuperiorID`,`FK_CursoID`),
  KEY `fk_ED_SUPERIOR_CURSO1_idx` (`FK_CursoID`),
  CONSTRAINT `fk_ED_SUPERIOR_CURSO1` FOREIGN KEY (`FK_CursoID`) REFERENCES `curso` (`CursoID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `entrevista`
--

DROP TABLE IF EXISTS `entrevista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `entrevista` (
  `NumeroIdentificacao` int(11) NOT NULL,
  `FK_EntrevistadorID` char(128) DEFAULT NULL,
  `FK_EntrevistadoID` char(128) NOT NULL,
  `Data` longtext NOT NULL,
  `ResponsavelRecebimento` longtext,
  `DataRecebimento` longtext,
  `ControleAvaliacao` longtext,
  `DataAvaliacao` longtext,
  `CriticoID` char(128) DEFAULT NULL,
  `DataCritica` longtext,
  `DigitadorID` char(128) DEFAULT NULL,
  `DataDigitacao` longtext,
  `CoordLocal` char(128) DEFAULT NULL,
  `DataCoordLocal` longtext,
  `CoordGeral` char(128) DEFAULT NULL,
  `DataCoordGeral` longtext,
  `HoraInicio` longtext,
  `HoraTermino` longtext,
  `Observacao` varchar(1000) DEFAULT NULL,
  `EditadoPor1` longtext,
  `DataEdicao1` longtext,
  `EditadoPor2` longtext,
  `DataEdicao2` longtext,
  PRIMARY KEY (`NumeroIdentificacao`),
  KEY `fk_ENTREVISTA_PESSOA1_idx` (`FK_EntrevistadorID`),
  KEY `fk_ENTREVISTA_PESSOA2_idx` (`FK_EntrevistadoID`),
  CONSTRAINT `fk_ENTREVISTA_PESSOA1` FOREIGN KEY (`FK_EntrevistadorID`) REFERENCES `pessoa` (`PessoaID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_ENTREVISTA_PESSOA2` FOREIGN KEY (`FK_EntrevistadoID`) REFERENCES `pessoa` (`PessoaID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `estagiario`
--

DROP TABLE IF EXISTS `estagiario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estagiario` (
  `PESSOA_PessoaID` char(128) NOT NULL,
  PRIMARY KEY (`PESSOA_PessoaID`),
  KEY `fk_ESTAGIARIO_PESSOA1_idx` (`PESSOA_PessoaID`),
  CONSTRAINT `fk_ESTAGIARIO_PESSOA1` FOREIGN KEY (`PESSOA_PessoaID`) REFERENCES `pessoa` (`PessoaID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `indicacao`
--

DROP TABLE IF EXISTS `indicacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `indicacao` (
  `IndicacaoID` char(128) NOT NULL,
  `FK_IndicadorID` char(128) NOT NULL,
  `FK_InstrutorIndicadoID` char(128) NOT NULL,
  PRIMARY KEY (`IndicacaoID`,`FK_IndicadorID`,`FK_InstrutorIndicadoID`),
  KEY `fk_INDICACAO_PESSOA1_idx` (`FK_IndicadorID`),
  KEY `fk_INDICACAO_INSTRUTOR1_idx` (`FK_InstrutorIndicadoID`),
  CONSTRAINT `fk_INDICACAO_INSTRUTOR1` FOREIGN KEY (`FK_InstrutorIndicadoID`) REFERENCES `instrutor` (`InstrutorID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_INDICACAO_PESSOA1` FOREIGN KEY (`FK_IndicadorID`) REFERENCES `pessoa` (`PessoaID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `instituicao`
--

DROP TABLE IF EXISTS `instituicao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `instituicao` (
  `InstituicaoID` char(128) NOT NULL,
  `Nome` longtext,
  `Status` int(11) DEFAULT NULL,
  PRIMARY KEY (`InstituicaoID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `instrutor`
--

DROP TABLE IF EXISTS `instrutor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `instrutor` (
  `InstrutorID` char(128) NOT NULL,
  `Local` int(11) DEFAULT NULL,
  `FK_Instituicao` char(128) DEFAULT NULL,
  `FK_PessoaID` char(128) NOT NULL,
  PRIMARY KEY (`InstrutorID`,`FK_PessoaID`),
  KEY `fk_INSTRUTOR_INSTITUICAO1_idx` (`FK_Instituicao`),
  KEY `fk_INSTRUTOR_PESSOA1_idx` (`FK_PessoaID`),
  CONSTRAINT `fk_INSTRUTOR_INSTITUICAO1` FOREIGN KEY (`FK_Instituicao`) REFERENCES `instituicao` (`InstituicaoID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_INSTRUTOR_PESSOA1` FOREIGN KEY (`FK_PessoaID`) REFERENCES `pessoa` (`PessoaID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `opniao`
--

DROP TABLE IF EXISTS `opniao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `opniao` (
  `FK_EntrevistaID` int(11) NOT NULL,
  `FK_NumeroPergunta` int(11) NOT NULL,
  `Resposta` longtext,
  PRIMARY KEY (`FK_EntrevistaID`,`FK_NumeroPergunta`),
  KEY `fk_OPNIAO_ENTREVISTA1_idx` (`FK_EntrevistaID`),
  KEY `fk_OPNIAO_PERGUNTA_idx` (`FK_NumeroPergunta`),
  CONSTRAINT `fk_OPNIAO_ENTREVISTA1` FOREIGN KEY (`FK_EntrevistaID`) REFERENCES `entrevista` (`NumeroIdentificacao`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_OPNIAO_PERGUNTA` FOREIGN KEY (`FK_NumeroPergunta`) REFERENCES `pergunta` (`PerguntaID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pergunta`
--

DROP TABLE IF EXISTS `pergunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pergunta` (
  `PerguntaID` int(11) NOT NULL AUTO_INCREMENT,
  `CodigoPergunta` varchar(45) NOT NULL,
  `Descricao` longtext,
  PRIMARY KEY (`PerguntaID`,`CodigoPergunta`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `permissao`
--

DROP TABLE IF EXISTS `permissao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissao` (
  `PermissaoID` int(11) NOT NULL,
  `NomeCampo` varchar(45) NOT NULL,
  `Descricao` longtext,
  PRIMARY KEY (`PermissaoID`,`NomeCampo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pessoa`
--

DROP TABLE IF EXISTS `pessoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pessoa` (
  `PessoaID` char(128) NOT NULL,
  `Nome` longtext,
  `DataNascimento` longtext,
  `Sexo` int(11) DEFAULT NULL,
  `Celular` longtext,
  `Email1` longtext,
  `Email2` longtext,
  `CursandoEdFormal` tinyint(1) DEFAULT NULL,
  `LerEscrever` tinyint(1) DEFAULT NULL,
  `TipoServico` int(11) DEFAULT NULL,
  `FK_Unidade_Trabalho` int(11) DEFAULT NULL,
  `FK_Unidade_Intermediaria` int(11) DEFAULT NULL,
  `FK_Unidade_Organizacional` int(11) DEFAULT NULL,
  PRIMARY KEY (`PessoaID`),
  KEY `fk_PESSOA_UNIDADE_TRABALHO1_idx` (`FK_Unidade_Trabalho`),
  KEY `fk_PESSOA_UNIDADE_INTERMEDIARIA1_idx` (`FK_Unidade_Intermediaria`),
  KEY `fk_PESSOA_UNIDADE_ORGANIZACIONAL1_idx` (`FK_Unidade_Organizacional`),
  KEY `fk_PESSOA_TIPOSERVICO_idx` (`TipoServico`),
  CONSTRAINT `fk_PESSOA_TIPOSERVICO` FOREIGN KEY (`TipoServico`) REFERENCES `tiposervico` (`TipoServicoID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_PESSOA_UNIDADE_INTERMEDIARIA1` FOREIGN KEY (`FK_Unidade_Intermediaria`) REFERENCES `unidade` (`CodigoUnidade`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_PESSOA_UNIDADE_ORGANIZACIONAL1` FOREIGN KEY (`FK_Unidade_Organizacional`) REFERENCES `unidade` (`CodigoUnidade`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_PESSOA_UNIDADE_TRABALHO1` FOREIGN KEY (`FK_Unidade_Trabalho`) REFERENCES `unidade` (`CodigoUnidade`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pessoa_atividade`
--

DROP TABLE IF EXISTS `pessoa_atividade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pessoa_atividade` (
  `FK_PessoaID` char(128) NOT NULL,
  `FK_AtividadeID` char(128) NOT NULL,
  KEY `fk_PESSOA_ATIVIDADE_PESSOA1_idx` (`FK_PessoaID`),
  KEY `fk_PESSOA_ATIVIDADE_ATIVIDADE1_idx` (`FK_AtividadeID`),
  CONSTRAINT `fk_PESSOA_ATIVIDADE_ATIVIDADE1` FOREIGN KEY (`FK_AtividadeID`) REFERENCES `atividade` (`AtividadeID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_PESSOA_ATIVIDADE_PESSOA1` FOREIGN KEY (`FK_PessoaID`) REFERENCES `pessoa` (`PessoaID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pessoa_curso`
--

DROP TABLE IF EXISTS `pessoa_curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pessoa_curso` (
  `FK_PessoaID` char(128) NOT NULL,
  `FK_CursoID` char(128) NOT NULL,
  `DataConclusao` int(11) NOT NULL,
  `FK_InstituicaoID` char(128) DEFAULT NULL,
  `FinanciadoUFRRJ` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`FK_PessoaID`,`FK_CursoID`,`DataConclusao`),
  KEY `fk_PESSOA_CURSO_PESSOA1_idx` (`FK_PessoaID`),
  KEY `fk_PESSOA_CURSO_CURSO1_idx` (`FK_CursoID`),
  KEY `fk_PESSOA_CURSO_INSTITUICAO1_idx` (`FK_InstituicaoID`),
  CONSTRAINT `fk_PESSOA_CURSO_CURSO1` FOREIGN KEY (`FK_CursoID`) REFERENCES `curso` (`CursoID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_PESSOA_CURSO_INSTITUICAO1` FOREIGN KEY (`FK_InstituicaoID`) REFERENCES `instituicao` (`InstituicaoID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_PESSOA_CURSO_PESSOA1` FOREIGN KEY (`FK_PessoaID`) REFERENCES `pessoa` (`PessoaID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pessoa_unidade`
--

DROP TABLE IF EXISTS `pessoa_unidade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pessoa_unidade` (
  `idpessoa_unidade` int(11) NOT NULL,
  `FK_PessoaID` char(128) DEFAULT NULL,
  `FK_UnidadeTrabalho` int(11) DEFAULT NULL,
  `FK_UnidadeIntermediaria` int(11) DEFAULT NULL,
  `FK_UnidadeOrganizacional` int(11) DEFAULT NULL,
  PRIMARY KEY (`idpessoa_unidade`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `servidor`
--

DROP TABLE IF EXISTS `servidor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `servidor` (
  `FK_PessoaID` char(128) NOT NULL,
  `MatriculaSIAPE` bigint(20) DEFAULT NULL,
  `DeficienciaFisica` tinyint(1) DEFAULT NULL,
  `Lotacao` int(11) DEFAULT NULL,
  `TempoForaPublico` int(11) DEFAULT NULL,
  `TempoForaCadastradoDP` int(11) DEFAULT NULL,
  `AnoIngressoPublico` int(11) DEFAULT NULL,
  `AnoIngressoUFRRJ` int(11) DEFAULT NULL,
  `Cargo` int(11) DEFAULT NULL,
  `CargoDesdeAno` int(11) DEFAULT NULL,
  `ExerceChefia` tinyint(1) DEFAULT NULL,
  `FuncaoChefia` longtext,
  `ChefiaDesdeAno` int(11) DEFAULT NULL,
  `HorarioTrabalho` int(11) DEFAULT NULL,
  `QtsDiasSemana` int(11) DEFAULT NULL,
  `CargaHorariaSemanal` int(11) DEFAULT NULL,
  `DescHorario` longtext,
  `TelefoneSetor` longtext,
  PRIMARY KEY (`FK_PessoaID`),
  KEY `fk_SERVIDOR_PESSOA1_idx` (`FK_PessoaID`),
  KEY `fk_SERVIDOR_CARGO_idx` (`Cargo`),
  KEY `fk_SERVIDOR_UNIDADE_idx` (`Lotacao`),
  CONSTRAINT `fk_SERVIDOR_CARGO` FOREIGN KEY (`Cargo`) REFERENCES `cargo` (`CargoID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_SERVIDOR_PESSOA1` FOREIGN KEY (`FK_PessoaID`) REFERENCES `pessoa` (`PessoaID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_SERVIDOR_UNIDADE` FOREIGN KEY (`Lotacao`) REFERENCES `unidade` (`CodigoUnidade`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tecnico_adm`
--

DROP TABLE IF EXISTS `tecnico_adm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tecnico_adm` (
  `SERVIDOR_FK_PessoaID` char(128) NOT NULL,
  `SERVIDOR_ServidorID` char(128) NOT NULL,
  `Classe` longtext,
  `NivelCarreira` int(11) DEFAULT NULL,
  `NivelCapacitacao` int(11) DEFAULT NULL,
  PRIMARY KEY (`SERVIDOR_FK_PessoaID`,`SERVIDOR_ServidorID`),
  KEY `fk_TECNICO_ADM_SERVIDOR1_idx` (`SERVIDOR_FK_PessoaID`,`SERVIDOR_ServidorID`),
  CONSTRAINT `fk_TECNICO_ADM_SERVIDOR1` FOREIGN KEY (`SERVIDOR_FK_PessoaID`) REFERENCES `servidor` (`FK_PessoaID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `terceirizado`
--

DROP TABLE IF EXISTS `terceirizado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `terceirizado` (
  `PESSOA_PessoaID` char(128) NOT NULL,
  PRIMARY KEY (`PESSOA_PessoaID`),
  KEY `fk_TERCEIRIZADO_PESSOA1_idx` (`PESSOA_PessoaID`),
  CONSTRAINT `fk_TERCEIRIZADO_PESSOA1` FOREIGN KEY (`PESSOA_PessoaID`) REFERENCES `pessoa` (`PessoaID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tipo_curso`
--

DROP TABLE IF EXISTS `tipo_curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_curso` (
  `Codigo` int(11) NOT NULL,
  `Descricao` longtext,
  PRIMARY KEY (`Codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tiposervico`
--

DROP TABLE IF EXISTS `tiposervico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tiposervico` (
  `TipoServicoID` int(11) NOT NULL,
  `Nome` longtext,
  PRIMARY KEY (`TipoServicoID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tipousuario`
--

DROP TABLE IF EXISTS `tipousuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipousuario` (
  `TipoUsuarioID` int(11) NOT NULL,
  `Nome` longtext,
  `CP1` tinyint(4) DEFAULT NULL,
  `CP2` tinyint(4) DEFAULT NULL,
  `CP3` tinyint(4) DEFAULT NULL,
  `CP4` tinyint(4) DEFAULT NULL,
  `CP5` tinyint(4) DEFAULT NULL,
  `CP6` tinyint(4) DEFAULT NULL,
  `CP7` tinyint(4) DEFAULT NULL,
  `CP8` tinyint(4) DEFAULT NULL,
  `CP9` tinyint(4) DEFAULT NULL,
  `CP10` tinyint(4) DEFAULT NULL,
  `CP11` tinyint(4) DEFAULT NULL,
  `CP12` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`TipoUsuarioID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tipousuario_permissao`
--

DROP TABLE IF EXISTS `tipousuario_permissao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipousuario_permissao` (
  `FK_TipoUsuarioID` int(11) NOT NULL,
  `FK_Permissao` varchar(45) NOT NULL,
  PRIMARY KEY (`FK_TipoUsuarioID`,`FK_Permissao`),
  CONSTRAINT `FK_PERMISSAO` FOREIGN KEY (`FK_TipoUsuarioID`, `FK_Permissao`) REFERENCES `permissao` (`PermissaoID`, `NomeCampo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_TIPOUSUARIOID` FOREIGN KEY (`FK_TipoUsuarioID`) REFERENCES `tipousuario` (`TipoUsuarioID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `unidade`
--

DROP TABLE IF EXISTS `unidade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `unidade` (
  `CodigoUnidade` int(11) NOT NULL,
  `Nome` longtext,
  PRIMARY KEY (`CodigoUnidade`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `UsuarioID` char(128) NOT NULL,
  `Login` longtext,
  `Senha` varchar(45) DEFAULT NULL,
  `Tipo` int(11) NOT NULL,
  `FK_PessoaID` char(128) NOT NULL,
  PRIMARY KEY (`UsuarioID`,`FK_PessoaID`),
  KEY `fk_USUARIO_PESSOA_idx` (`FK_PessoaID`),
  KEY `fk_USUARIO_TIPOUSUARIO_idx` (`Tipo`),
  CONSTRAINT `fk_USUARIO_PESSOA` FOREIGN KEY (`FK_PessoaID`) REFERENCES `pessoa` (`PessoaID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_USUARIO_TIPOUSUARIO` FOREIGN KEY (`Tipo`) REFERENCES `tipousuario` (`TipoUsuarioID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping events for database 'sismap'
--

--
-- Dumping routines for database 'sismap'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-29 14:19:37
