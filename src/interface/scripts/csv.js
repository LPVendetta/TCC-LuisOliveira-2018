var fs = require("fs");	
var d3 = require("d3");
var _ = require("lodash");
window.$ = window.jQuery = require('jquery');


$(document).ready(function(){    
	$("#csv-file").change(lerCSV);
});

function lerCSV(evt){
	//var file = evt.target.files[0];
	var file = document.getElementById("csv-file");
	var path = file.value;

	fs.readFile(path,"utf8",function(erro, dados){
		dados = d3.csv(dados);
		console.log(dados);
	})
}