JSON.flatten = function(data){
	var result = {};

	function recurse(cur,prop){
		if(Object(cur) !== cur){
			result[prop] = cur;
		}else if(Array.isArray(cur)){
			for(var i = 0; l = cur.length; i < l; i++)
				recurse(cur[i], prop + "[" + i + "]");
				if(l == 0) result[prop] = [];	
		}else{
			var isEmpty = true;
			for(var p in cur){
				isEmpty = false;
				recurse(cur[p], prop ? prop + "." + p : p);
			}
			if(isEmpty && prop) result[prop] = {};
		}
	}
	recurse(data, "");
	return result;
};

JSON.unflatten = function(data){
	"use strict";
	if(Object(data) !== data || Array.isArray(data)) return data;
	var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g, 
		resultHolder = {};
	for(var p in data){
		var cur = resultHolder,
			prop = "",
			m;
		while(m = regex.exec(p)){
			cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}));
				prop = m[2] || m[1];
		}
		cur[prop] = data[p];
	}
	return resultHolder[""] || resultHolder;
};

$("#process").click(function (){
	var flatten = $("#flatten").is(":checked");
	var result = flatten ?
	 	JSON.stringify(JSON.flatten(JSON.parse($("#input").val())), null, "\t") : JSON.stringify(JSON.unflatten(JSON.parse($("#input").val())), null, "\t")

		$("#output").val(result);
		$("#formatted").text(result);
});