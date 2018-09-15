console.log("This tool is FREE and comes with ABSOLUTELY NO WARRANTY.");
var count=0, countDict={};
const languages = {"SAS": "Good choice!", "R": "Good choice!", "Python": "Python 3.x", "Stata": "I highly recommend R, Python or SAS instead!", "SPSS": "Good luck!"};
function addVar(){
	$("<div id=\"var"+count+"\" class=\"varChunk\"><select class=\"selected\"><option disabled selected> -- Select an option -- </option><option value=\"A\">Collapse</option><option value=\"B\">Categorize</option><option value=\"C\">Up/Bottom Code</option></select><div class=\"codes\"></div><input class=\"removeVar\" type=\"button\" value=\"Remove this variable\"></div>").hide().appendTo("#field").show(618);
	countDict["var"+count]=0;
	count++;
}
function hasDuplicate(arr){
	const arr2=arr.slice().sort();
	//var results=[arr2[0]];
	for(var i=1;i<arr2.length;i++){
		if(arr2[i-1]===arr2[i]){
			return true;
		}
	}
	return false;
}
function checkA(tmpVarCnt, tmpCnt){
	var inpArr="";
	for(var i=0; i<=tmpCnt; i++){
		const tmp=$("#collapse"+tmpVarCnt+"-"+i).val();
		if(tmp===""){
			return true;
		}
		inpArr+=";"+tmp;
	}
	return hasDuplicate(inpArr.split(/;+/g).map(function(item){return item.trim();}).filter(function(item){return item!=="";}));
}
function checkB(tmpVarCnt, tmpCnt){
	for(var i=0; i<=tmpCnt; i++){
		const minVal=$("#min"+tmpVarCnt+"-"+i).val(), maxVal=$("#max"+tmpVarCnt+"-"+i).val();
		if((i===0 && maxVal==="") || (i>=1 && (minVal==="" || maxVal==="")) || (minVal!=="" && maxVal!=="" && Number(minVal)>=Number(maxVal))){
			return true;
		}
	}
	return false;
}
function checkB2(varId){
	const tmpVarCnt=varId.replace("var", ""), tmpCnt=countDict[varId];
	for(var i=0;i<=tmpCnt;i++){
		const minVal=$("#min"+tmpVarCnt+"-"+i).val(), maxVal=$("#max"+tmpVarCnt+"-"+i).val();
		if((i===0 && maxVal==="") || (i!==0 && i===tmpCnt && minVal==="") || (i>0 && i<tmpCnt && (minVal==="" || maxVal==="")) || (minVal!=="" && maxVal!=="" && Number(minVal)>=Number(maxVal))){
		//if((i===0 && minVal!=="" && Number(minVal)>Number(maxVal)) || (i>=1 && i<tmpCnt && Number(minVal)>Number(maxVal)) || (i===tmpCnt && maxVal!=="" && Number(minVal)>Number(maxVal))){
		//if((minVal!=="" && maxVal!=="" && Number(maxVal)<=Number(minVal)) || (minVal=="" && maxVal==="") || (i!==0 && minVal==="") || (i!==tmpCnt && maxVal==="") || (i>0 && i<tmpCnt && (minVal==="" || maxVal===""))){
			return true;
		}
	}
	return false;
}

addVar();
Object.keys(languages).forEach(function(e){
	$("#choices").append(e+":<input type=\"checkbox\" id=\"choose"+e+"\" title=\""+languages[e]+"\">&nbsp;");
});

$("#addVar").on("click", addVar);

$("div#field").on("change", ".selected", function(){
	const whichOne = $(this).parent().attr("id"), tmpVarCnt=whichOne.replace("var", ""),
	selectDict = {
		"A": " Discrete numbers? <input type=\"checkbox\" class=\"discreteInput\"><div><div><strong>Level 1:</strong> combined levels: <input id=\"collapse"+tmpVarCnt+"-0\" type=\"text\" class=\"collapseInput\"> Format: <input id=\"format"+tmpVarCnt+"-0\" type=\"text\" class=\"formatInput\"></div></div><input class=\"addLevelA\" type=\"button\" value=\"Add another level\">",
		"B": "<div><div><strong>Level 1:</strong> min: <input id=\"min"+tmpVarCnt+"-0\" type=\"number\" class=\"minInput\"> max: <input id=\"max"+tmpVarCnt+"-0\" type=\"number\" class=\"maxInput\"> Format: <input id=\"format"+tmpVarCnt+"-0\" type=\"text\" class=\"formatInput\"></div></div><input class=\"addLevelB\" type=\"button\" value=\"Add another level\">",
		"C": "<div><div> Lower Bound: <input type=\"number\" id=\"lower"+tmpVarCnt+"\" class=\"lowerInput\"> Upper Bound: <input type=\"number\" id=\"upper"+tmpVarCnt+"\" class=\"upperInput\"></div></div>"
	};
	$(this).siblings("div.codes").html("<div>Input Variable: <input type=\"text\" class=\"inpVar\" value=\"input_"+whichOne+"\"> New Variable: <input type=\"text\" class=\"cVar\" value=\"new_"+whichOne+"\">"+selectDict[$(this).children("option:selected").val()]+"</div>").hide().show(618);
	countDict[whichOne]=0;
}).on("click", ".addLevelA", function(){
	const whichOne = $(this).parent().parent().parent().attr("id"), tmpCnt = countDict[whichOne], tmpVarCnt = Number(whichOne.replace("var", ""));
	if(checkA(tmpVarCnt, tmpCnt)){
		alert("Invalid input!");
		return;
	}
	$("<div><strong>Level "+(tmpCnt+2)+":</strong> combined levels: <input id=\"collapse"+tmpVarCnt+"-"+(tmpCnt+1)+"\" type=\"text\" class=\"collapseInput\"> Format: <input id=\"format"+tmpVarCnt+"-"+(tmpCnt+1)+"\" type=\"text\" class=\"formatInput\"></div>").hide().appendTo($(this).siblings("div")).show(618);
	countDict[whichOne]++;
}).on("click", ".addLevelB", function(){
	const whichOne = $(this).parent().parent().parent().attr("id"), tmpCnt = countDict[whichOne], tmpVarCnt = Number(whichOne.replace("var", ""));
	if(checkB(tmpVarCnt, tmpCnt)){
		alert("Invalid input!");
		return;
	}
	const lastMax=$("#max"+tmpVarCnt+"-"+tmpCnt).val();
	$("<div><strong>Level "+(tmpCnt+2)+":</strong> min: <input id=\"min"+tmpVarCnt+"-"+(tmpCnt+1)+"\" type=\"number\" value="+lastMax+" class=\"minInput\"> max: <input id=\"max"+tmpVarCnt+"-"+(tmpCnt+1)+"\" type=\"number\" class=\"maxInput\"> Format: <input id=\"format"+tmpVarCnt+"-"+(tmpCnt+1)+"\" type=\"text\" class=\"formatInput\"></div>").hide().appendTo($(this).siblings("div")).show(618);
	countDict[whichOne]++;
}).on("click", ".removeVar", function(){
	if(Object.keys(countDict).length<=1){
		alert("This is the last one left!");
		return;
	}
	const whichOne = $(this).parent().attr("id");
	delete countDict[whichOne];
	$(this).parent().hide(618, function(){$(this).remove();});
});

$("#do").on("click", function(){
	$("#outputCode").children().remove();
	const outputSAS=$("#chooseSAS").prop("checked"), outputR=$("#chooseR").prop("checked"), outputPython=$("#choosePython").prop("checked"), outputStata=$("#chooseStata").prop("checked"), outputSPSS=$("#chooseSPSS").prop("checked");
	var sasCodes = outputSAS?"<div class=\"outChunk\">SAS</div>":"", sasProcFormat = "", rCodes = outputR?"<div class=\"outChunk\">R</div>":"", pythonCodes = outputPython?"<div class=\"outChunk\">Python</div>":"", stataCodes = outputStata?"<div class=\"outChunk\">Stata</div>":"", spssCodes = outputSPSS?"<div class=\"outChunk\">SPSS</div>":"";
	Object.keys(countDict).forEach(function(element){
		const inpVar = $("#"+element).find(".inpVar").val(), cVar = $("#"+element).find(".cVar").val(), whichOne=$("#"+element).find("option:selected").val();
		var rightHalfR="", rightHalfStata="", tmpSASCodes="", tmpSASProcFormat="", tmpRCodes="", tmpPythonCodes="", tmpStataCodes="", tmpStataFormat="", tmpSPSSCodes="", tmpSPSSFormat="";
		if (whichOne==="A"){
			if(checkA(element.replace("var", ""), countDict[element])){
				$("#"+element).find(".inpVar, .cVar").css("color", "red");
				return;
			}
			$("#"+element).find(".inpVar, .cVar").css("color", "initial");
			const discrete=$("#"+element).find(".discreteInput").prop("checked");
			$("#"+element).children("div.codes").children("div").children("div").children("div").each(function(i, e){
				const collapseVal=discrete?$(e).children(".collapseInput").val().split(/;+/g).map(function(item){return item.trim();}).filter(function(item){return item!=="";}):$(e).children(".collapseInput").val().split(/;+/g).map(function(item){return "\""+item.trim()+"\"";}).filter(function(item){return item!="\"\"";});
				var format=$(e).children(".formatInput").val();
				if(format===""){
					format=collapseVal.map(function(item){return item.replace(/"/g, "");}).join(", ");
					$(e).children(".formatInput").attr("placeholder", format);
				}
				if(outputSAS){
					if(i===0){
						tmpSASProcFormat += "<div>/* FORMAT OF "+cVar+" */</div><div>VALUE "+cVar+"F</div>";
						tmpSASCodes += "<div>/* Construct Variable "+cVar+" */</div><div>IF "+inpVar+" IN ("+collapseVal.join(", ")+") THEN "+cVar+"="+(i+1)+";</div>";
					} else{
						tmpSASCodes += "<div>ELSE IF "+inpVar+" IN ("+collapseVal.join(", ")+") THEN "+cVar+"="+(i+1)+";</div>";
					}
					tmpSASProcFormat += "<div>"+(i+1)+"=\""+format+"\"</div>";
					if(i===Number(countDict[element])){
						tmpSASCodes += "<div>ELSE "+cVar+"=.;</div><div>FORMAT "+cVar+" "+cVar+"F.;</div>";
						tmpSASProcFormat += "<div>;</div>";
					}
				}
				if(outputR){
					if(i===0){
						tmpRCodes += "<div># Construct Variable "+cVar+"</div><div>"+cVar+"=sapply("+inpVar+", function(x){</div><div>&nbsp;&nbsp;ifelse(x %in% c("+collapseVal.join(", ")+"), "+(i+1)+", ";
					} else{
						tmpRCodes += "ifelse(x %in% c("+collapseVal.join(", ")+"), "+(i+1)+", ";
					}
					rightHalfR += ")";
					if(i===Number(countDict[element])){
						//rCodes += "x"+rightHalfR+"</div><div>})</div>";
						tmpRCodes += "NA"+rightHalfR+"</div><div>})</div>";
					}
				}
				if(outputPython){
					if(i===0){
						tmpPythonCodes += "<div># Construct Variable "+cVar+"</div><div>def construct_"+cVar+"(x):</div><div>&nbsp;&nbsp;&nbsp;&nbsp;if x in ["+collapseVal.join(", ")+"]:</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return "+(i+1)+"</div>";
					} else{
						tmpPythonCodes += "<div>&nbsp;&nbsp;&nbsp;&nbsp;elif x in ["+collapseVal.join(", ")+"]:</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return "+(i+1)+"</div>";
					}
					if(i===Number(countDict[element])){
						tmpPythonCodes += "<div>&nbsp;&nbsp;&nbsp;&nbsp;return float(\"NaN\")</div><div>"+cVar+"=[construct_"+cVar+"(e) for e in "+inpVar+"]</div>";
					}
				}
				if(outputStata){
					if(i===0){
						tmpStataCodes += "<div>* Construct Variable "+cVar+"</div><div>gen "+cVar+"=";
						tmpStataFormat += "<div>label define "+cVar+"f";
					}
					tmpStataCodes += "cond(inlist("+inpVar+", "+collapseVal.join(", ")+"), "+(i+1)+", ";
					rightHalfStata += ")";
					tmpStataFormat += " "+(i+1)+" \""+format+"\"";
					if(i===Number(countDict[element])){
						//stataCodes += inpVar+rightHalfStata+"</div>";
						tmpStataCodes += "."+rightHalfStata+"</div>";
						tmpStataFormat += "</div><div>label values "+cVar+" "+cVar+"f</div>";
					}
				}
				if(outputSPSS){
					if(i===0){
						//spssCodes += "<div>* Construct Variable"+cVar+"</div><div>compute "+cVar+" = "+inpVar+".</div>";
						tmpSPSSCodes += "<div>* Construct Variable"+cVar+"</div><div>compute "+cVar+" = 0.</div>";
						tmpSPSSFormat += "<div>value labels</div><div>"+cVar;
					}
					collapseVal.forEach(function(c, i2){
						if(i2!==0){
							tmpSPSSCodes += " or ";
						} else{
							tmpSPSSCodes += "<div>if ";
						}
						tmpSPSSCodes += inpVar+" eq "+c;
					});
					tmpSPSSCodes += " "+cVar+" = "+(i+1)+".</div>";
					tmpSPSSFormat += "</div><div>"+(i+1)+" \""+format+"\"";
					if(i===Number(countDict[element])){
						//tmpSPSSCodes += "<div>exe.</div>";
						tmpSPSSFormat += ".</div><div>exe.</div>";
					}
				}
				$(e).children(".collapseInput, .formatInput").attr("disabled", "disabled");
				$(e).parent().siblings(".addLevelA").attr("disabled", "disabled");
			});
			
			
		} else if(whichOne==="B"){
			if(checkB2(element)){
				$("#"+element).find(".inpVar, .cVar").css("color", "red");
				return;
			}
			$("#"+element).find(".inpVar, .cVar").css("color", "initial");
		
			$("#"+element).children("div.codes").children("div").children("div").children("div").each(function(i, e){
				const minVal=$(e).children(".minInput").val(), maxVal=$(e).children(".maxInput").val();
				var format=$(e).children(".formatInput").val();
				if(format===""){
					if(minVal!==""){
						if(maxVal!==""){
							format=minVal+"-"+maxVal;
						} else{
							format=minVal+"-HIGH";
						}
					} else if(maxVal!==""){
						format="LOW-"+maxVal;
					}
					$(e).children(".formatInput").attr("placeholder", format);
				}
				if(outputSAS){
					if(i===0){
						tmpSASProcFormat += "<div>/* FORMAT OF "+cVar+" */</div><div>VALUE "+cVar+"F</div>";
						tmpSASCodes += "<div>/* Construct Variable "+cVar+" */</div>";
						if(minVal===""){
							//if(maxVal===""){
							//	tmpSASProcFormat="";
							//	tmpSASCodes="";
							//	return false;
							//} else{
							tmpSASCodes += "<div>IF "+inpVar+" LT "+maxVal+" THEN "+cVar+"="+(i+1)+";</div>";
							//}
						} else{
							tmpSASCodes += "<div>IF "+minVal+" LE "+inpVar+" LT "+maxVal+" THEN "+cVar+"="+(i+1)+";</div>";
						}
					} else if(i===Number(countDict[element]) && maxVal===""){
						// This is also remove the event of NO input at all.
						tmpSASCodes += "<div>ELSE IF "+inpVar+" GE "+minVal+" THEN "+cVar+"="+(i+1)+";</div>";
					} else{
						tmpSASCodes += "<div>ELSE IF "+minVal+" LE "+inpVar+" LT "+maxVal+" THEN "+cVar+"="+(i+1)+";</div>";
					}
					tmpSASProcFormat += "<div>"+(i+1)+"=\""+format+"\"</div>";
					if(i===Number(countDict[element])){
						//sasCodes += "<div>ELSE "+cVar+"="+inpVar+";</div>";
						tmpSASCodes += "<div>ELSE "+cVar+"=.;</div><div>FORMAT "+cVar+" "+cVar+"F.;</div>";
						tmpSASProcFormat += "<div>;</div>";
					}
				}
				if(outputR){
					if(i===0){
						tmpRCodes += "<div># Construct Variable "+cVar+"</div><div>"+cVar+"=sapply("+inpVar+", function(x){</div>";
						if(minVal===""){
							//if(maxVal===""){
							//	tmpRCodes="";
							//	return false;
							//} else{
							tmpRCodes += "<div>&nbsp;&nbsp;ifelse(x<"+maxVal+", "+(i+1)+", ";
							//}
						} else {
							tmpRCodes += "<div>&nbsp;&nbsp;ifelse(x>="+minVal+" & x<"+maxVal+", "+(i+1)+", ";
						}
					} else if(i===Number(countDict[element]) && maxVal===""){
						tmpRCodes += "ifelse(x>="+minVal+", "+(i+1)+", ";
					} else{
						tmpRCodes += "ifelse(x>="+minVal+" & x<"+maxVal+", "+(i+1)+", ";
					}
					rightHalfR += ")";
					if(i===Number(countDict[element])){
						tmpRCodes += "NA"+rightHalfR+"</div><div>})</div>";
					}
				}
				if(outputPython){
					if(i===0){
						tmpPythonCodes += "<div># Construct Variable "+cVar+"</div><div>def construct_"+cVar+"(x):</div>";
						if(minVal===""){
							//if(maxVal===""){
							//	tmpPythonCodes="";
							//	return false;
							//} else{
							tmpPythonCodes += "<div>&nbsp;&nbsp;&nbsp;&nbsp;if x<"+maxVal+":</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return "+(i+1)+"</div>";							
							//}
						} else{
							tmpPythonCodes += "<div>&nbsp;&nbsp;&nbsp;&nbsp;if "+minVal+"<=x<"+maxVal+":</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return "+(i+1)+"</div>";
						}
					} else if(i===Number(countDict[element]) && maxVal===""){
						tmpPythonCodes += "<div>&nbsp;&nbsp;&nbsp;&nbsp;elif x>="+minVal+":</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return "+(i+1)+"</div>";
					} else{
						tmpPythonCodes += "<div>&nbsp;&nbsp;&nbsp;&nbsp;elif "+minVal+"<=x<"+maxVal+":</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return "+(i+1)+"</div>";
					}
					if(i===Number(countDict[element])){
						tmpPythonCodes += "<div>&nbsp;&nbsp;&nbsp;&nbsp;return float(\"NaN\")</div><div>"+cVar+"=[construct_"+cVar+"(e) for e in "+inpVar+"]</div>";
					}
				}
				if(outputStata){
					if(i===0){
						tmpStataCodes += "<div>* Construct Variable "+cVar+"</div><div>gen "+cVar+"=";
						tmpStataFormat += "<div>label define"+cVar+"f";
						if(minVal===""){
							//if(maxVal===""){
							//	tmpStataCodes="";
							//	tmpStataFormat="";
							//	return false;
							//} else{
							tmpStataCodes += "cond("+inpVar+"<"+maxVal;
							//}
						} else{
							tmpStataCodes += "cond("+inpVar+">="+minVal+" & "+inpVar+"<"+maxVal;
						}
					} else if(i===Number(countDict[element]) && maxVal===""){
						tmpStataCodes += "cond("+inpVar+">="+minVal;
					} else{
						tmpStataCodes += "cond("+inpVar+">="+minVal+" & "+inpVar+"<"+maxVal;
					}
					tmpStataCodes += ", "+(i+1)+", ";
					tmpStataFormat += " "+(i+1)+" \""+format+"\"";
					rightHalfStata += ")";
					if(i===Number(countDict[element])){
						//stataCodes += inpVar+rightHalfStata+"</div>";
						tmpStataCodes += "."+rightHalfStata+"</div>";
						tmpStataFormat += "</div><div>label values "+cVar+" "+cVar+"f</div>";
					}
				}
				if(outputSPSS){
					if(i===0){
						//spssCodes += "<div>* Construct Variable"+cVar+"</div><div>compute "+cVar+" = "+inpVar+".</div>";
						tmpSPSSCodes += "<div>* Construct Variable"+cVar+"</div><div>compute "+cVar+" = 0.</div>";
						tmpSPSSFormat += "<div>value labels</div><div>"+cVar;
						if(minVal===""){
							//if(maxVal===""){
							//	tmpSPSSCodes="";
							//	tmpSPSSFormat="";
							//	return false;
							//} else{
							tmpSPSSCodes += "<div>if "+inpVar+" lt "+maxVal+" "+cVar+" = "+(i+1)+".</div>";
							//}
						} else{
							tmpSPSSCodes += "<div>if "+inpVar+" ge "+minVal+" and "+inpVar+" lt "+maxVal+" "+cVar+" = "+(i+1)+".</div>";
						}
					} else if(i===Number(countDict[element]) && maxVal===""){
						tmpSPSSCodes += "<div>if "+inpVar+" ge "+minVal+" "+cVar+" = "+(i+1)+".</div>";
					} else{
						tmpSPSSCodes += "<div>if "+inpVar+" ge "+minVal+" and "+inpVar+" lt "+maxVal+" "+cVar+" = "+(i+1)+".</div>";
					}
					tmpSPSSFormat += "</div><div>"+(i+1)+" \""+format+"\"";
					if(i===Number(countDict[element])){
						//tmpSPSSCodes += "<div>exe.</div>";
						tmpSPSSFormat += ".</div><div>exe.</div>";
					}
				}
				$(e).children(".minInput, .maxInput, .formatInput").attr("disabled", "disabled");
				$(e).parent().siblings(".addLevelB").attr("disabled", "disabled");
			});
			
			
		} else if(whichOne==="C"){
			// No loop necessary for this one
			const lowerVal = $("#"+element).find(".lowerInput").val(), upperVal = $("#"+element).find(".upperInput").val();
			if(lowerVal!=="" && upperVal!=="" && Number(lowerVal)>=Number(upperVal)){
				$("#"+element).find(".inpVar, .cVar").css("color", "red");
				return;
			}
			$("#"+element).find(".inpVar, .cVar").css("color", "initial");
			if(outputSAS){
				tmpSASProcFormat += "<div>/* FORMAT OF "+cVar+" */</div><div>VALUE "+cVar+"F</div>";
				tmpSASCodes += "<div>/* Construct Variable "+cVar+" */</div>";
				if(lowerVal!==""){
					if(upperVal!==""){
						tmpSASCodes += "<div>IF "+inpVar+" LT "+lowerVal+" THEN "+cVar+"="+lowerVal+";</div><div>ELSE IF "+inpVar+" GT "+upperVal+" THEN "+cVar+"="+upperVal+";</div>";
						tmpSASProcFormat += "<div>"+lowerVal+"-"+upperVal+"=\""+lowerVal+"-"+upperVal+"\"</div>";
					} else{
						tmpSASCodes += "<div>IF "+inpVar+" LT "+lowerVal+" THEN "+cVar+"="+lowerVal+";</div>";
						tmpSASProcFormat += "<div>"+lowerVal+"-HIGH=\""+lowerVal+"-HIGH\"</div>";
					}
					tmpSASCodes += "<div>ELSE "+cVar+"="+inpVar+";</div>";
				} else{
					if(upperVal!==""){
						tmpSASCodes += "<div>IF "+inpVar+" GT "+upperVal+" THEN "+cVar+"="+upperVal+";</div><div>ELSE "+cVar+"="+inpVar+";</div>";
						tmpSASProcFormat += "<div>LOW-"+lowerVal+"=\"LOW-"+lowerVal+"\"</div>";
					}
				}
				tmpSASCodes+="<div>FORMAT "+cVar+" "+cVar+"F.;</div>";
				tmpSASProcFormat += "<div>;</div>";
			}
			if(outputR){
				tmpRCodes += "<div># Construct Variable "+cVar+"</div><div>"+cVar+"=sapply("+inpVar+", function(x){</div>";
				if(lowerVal!==""){
					if(upperVal!==""){
						tmpRCodes += "<div>&nbsp;&nbsp;ifelse(x<"+lowerVal+", "+lowerVal+", ifelse(x>"+upperVal+", "+upperVal+", x))</div>";
					} else{
						tmpRCodes += "<div>&nbsp;&nbsp;ifelse(x<"+lowerVal+", "+lowerVal+", x)</div>";
					}
					tmpRCodes += "<div>})</div>";
				} else{
					if(upperVal!==""){
						tmpRCodes += "<div>&nbsp;&nbsp;ifelse(x>"+upperVal+", "+upperVal+", x)</div><div>})</div>";
					}
				}
			}
			if(outputPython){
				tmpPythonCodes += tmpPythonCodes += "<div># Construct Variable "+cVar+"</div><div>def construct_"+cVar+"(x):</div>";
				if(lowerVal!==""){
					tmpPythonCodes += "<div>&nbsp;&nbsp;&nbsp;&nbsp;if x<"+lowerVal+":</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return "+lowerVal+"</div>";
					if(upperVal!==""){
						tmpPythonCodes += "<div>&nbsp;&nbsp;&nbsp;&nbsp;elif x>"+upperVal+":</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return "+upperVal+"</div>";
					}
				} else{
					if(upperVal!==""){
						tmpPythonCodes += "<div>&nbsp;&nbsp;&nbsp;&nbsp;if x>"+upperVal+":</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return "+upperVal+"</div>";
					}
				}
				tmpPythonCodes += "<div>&nbsp;&nbsp;&nbsp;&nbsp;return x</div><div>"+cVar+"=[construct_"+cVar+"(e) for e in "+inpVar+"]</div>";
			}
			if(outputStata){
				tmpStataCodes += "<div>* Construct Variable "+cVar+"</div><div>gen "+cVar+"=";
				tmpStataFormat += "* No format for Stata continuous variable "+cVar;
				if(lowerVal!==""){
					if(upperVal!==""){
						tmpStataCodes += "cond("+inpVar+"<"+lowerVal+", "+lowerVal+", cond("+inpVar+">"+upperVal+", "+upperVal+", "+inpVar+"))";
					} else{
						tmpStataCodes += "cond("+inpVar+"<"+lowerVal+", "+lowerVal+", "+inpVar+")";
					}
				} else{
					if(upperVal!==""){
						tmpStataCodes += "cond("+inpVar+">"+upperVal+", "+upperVal+", "+inpVar+")";
					}
				}
			}
			if(outputSPSS){
				tmpSPSSCodes += "<div>* Construct Variable "+cVar+"</div><div>compute "+cVar+" = "+inpVar+".</div>";
				tmpSPSSFormat += "* No format for SPSS continuous variable "+cVar;
				if(lowerVal!==""){
					tmpSPSSCodes += "<div>if "+inpVar+" lt "+lowerVal+" "+cVar+" = "+lowerVal+".</div>";
				}
				if(upperVal!==""){
					tmpSPSSCodes += "<div>if "+inpVar+" gt "+upperVal+" "+cVar+" = "+upperVal+".</div>";
				}
				tmpSPSSCodes += "<div>exe.</div>";
			}
			$("#"+element).find(".lowerInput, .upperInput").attr("disabled", "disabled");
		}
		sasCodes += tmpSASCodes;
		sasProcFormat += tmpSASProcFormat;
		rCodes += tmpRCodes;
		pythonCodes += tmpPythonCodes;
		stataCodes += tmpStataCodes+tmpStataFormat;
		spssCodes += tmpSPSSCodes+tmpSPSSFormat;
	});
	$("#outputCode").append(sasCodes+sasProcFormat+rCodes+pythonCodes+stataCodes+spssCodes).hide().show(618);
});
console.log("If you are seeing this, you may wonder the reason I included some of these choices. Some researchers I'm working with are not data but social scientists. Actually after seeing the download number of CHIS dummy data, you may start to know why. No offence to anyone or -thing!");
function readmeHover1(e){
	$(e).css({"cursor": "pointer"});
}
function readmeHover2(e){
	$(e).css("cursor", "default");
}
$("#readme, #hideme, #email, a").css({"font-weight": "bold", "text-decoration": "underline", "color": "rgb(19, 41, 75)"}).hover(function(){readmeHover1(this);}, function(){readmeHover2(this);});
$("#readme").on("click", function(){
	$("#readmeField").show(618);
	$(this).parent().css("display", "none");
}).parent().css("margin-top", "5px");
$("#hideme").on("click", function(){
	$("#readmeField").hide(618);
	$("#readme").parent().css("display", "initial");
}).parent().css("margin-top", "5px");