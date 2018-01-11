function las2json(onelas){
	//// var lasjson establishes a blank json for holding las 2.0 data.
	var lasjson = {
			"VERSION INFORMATION":{
				"VERS":{"MNEM":"","UNIT":"","DATA":"","DESCRIPTION OF MNEMONIC 1":"","DESCRIPTION OF MNEMONIC 2":""},
				"WRAP":{"MNEM":"","UNIT":"","DATA":"","DESCRIPTION OF MNEMONIC 1":"","DESCRIPTION OF MNEMONIC 2":""}
			}
			,
			"WELL INFORMATION BLOCK":[{
					"GENERATED":"",
					"MNEM_0":{"MNEM":"","UNIT":"","DATA":"","DESCRIPTION OF MNEMONIC 1":"","DESCRIPTION OF MNEMONIC 2":""},
					"MNEM_1":{"MNEM":"","UNIT":"","DATA":"","DESCRIPTION OF MNEMONIC 1":"","DESCRIPTION OF MNEMONIC 2":""},
					"MNEM_2":{"MNEM":"","UNIT":"","DATA":"","DESCRIPTION OF MNEMONIC 1":"","DESCRIPTION OF MNEMONIC 2":""}
				}]
			,
			"CURVE INFORMATION BLOCK":[{
					"MNEM_0":{"MNEM":"","UNIT":"","ERCB CURVE CODE":"","CURVE DESCRIPTION 1":"","CURVE DESCRIPTION 2":""}, 
					"MNEM_0":{"MNEM":"","UNIT":"","ERCB CURVE CODE":"","CURVE DESCRIPTION 1":"","CURVE DESCRIPTION 2":""},
				}]		
			,
			"PARAMETER INFORMATION":{
					"MNEM_0":{"MNEM":"","UNIT":"","DATA":"","DESCRIPTION OF MNEMONIC 1":"","DESCRIPTION OF MNEMONIC 2":""}, 
					"MNEM_1":{"MNEM":"","UNIT":"","DATA":"","DESCRIPTION OF MNEMONIC 1":"","DESCRIPTION OF MNEMONIC 2":""},
				}
			,
			"CURVES":{
					"Curve_NAME_ONE" :[1,2,3,4,5,6,7,8,9,10,11],
					"Curve_NAME_ONE" :[1,2,3,4,5,6,7,8,9,10,11],
				}
		}
	//// Some objects in the json above, like the obj in the "Curves" array will be emptyed on firt load. 
	//// They were only partially populated above to make following along easier
	lasjson["VERSION INFORMATION"] = [];
	lasjson["WELL INFORMATION BLOCK"] = [];
	lasjson["CURVE INFORMATION BLOCK"] = [];
	lasjson["PARAMETER INFORMATION"] = [];
	lasjson["CURVES"] = {};
	//// The number of the objects 'of the type below' added to the json vary by well, so these will be building blocks.
	var ver_info_obj = {"MNEM":"","UNIT":"","DATA":"","DESCRIPTION OF MNEMONIC 1":"","DESCRIPTION OF MNEMONIC 2":""};
	var well_info_obj = {"MNEM":"","UNIT":"","DATA":"","DESCRIPTION OF MNEMONIC 1":"","DESCRIPTION OF MNEMONIC 2":""};
	var curve_info_obj = {"MNEM":"","UNIT":"","ERCB CURVE CODE":"","CURVE DESCRIPTION 1":"","CURVE DESCRIPTION 2":""};
	var param_info_obj = {"MNEM":"","UNIT":"","DATA":"","DESCRIPTION OF MNEMONIC 1":"","DESCRIPTION OF MNEMONIC 2":""};
	//// The file is read as a txt file. It will first be split into seperate strings based on "~"
	var split1 = onelas.split("~");
	var vers_str = split1[1];
	var well_info_str = split1[2];
	var curve_info_str = split1[3];
	var param_info_str = split1[4];
	var curve_str = split1[5];
	//// Working with version block first by splitting it by newline and taking items of array 1 and 2 for vers and wrap
	var vers_line = vers_str.split("\n")[1];
	var wrap_line = vers_str.split("\n")[2];
	//// function to process objects for ver_info_obj, well_inf_obj, and param_info_obj
	function splitLineofType1(ver_info_obj,arrayString){
		var vers_line_1half = arrayString.split(":")[0].replace(" ","");
		var vers_line_1half_array = vers_line_1half.split(".")
		ver_info_obj["MNEM"] = vers_line_1half_array[0]
		var unit_and_data = vers_line_1half_array.slice(1,vers_line_1half_array.length);
		var unit_and_data_str = "                        ";
		if (unit_and_data.length > 1){
			unit_and_data_str = unit_and_data[0].toString()+"."+unit_and_data[1].toString();
		}
		else{
			unit_and_data_str = unit_and_data.toString()
		}
		var unit = unit_and_data_str[0,5].trim();
		var data = unit_and_data_str.substring(5,unit_and_data_str.length).trim();
		ver_info_obj["DATA"] = data
  		ver_info_obj["UNIT"] = unit
  		//// 
  		if(arrayString.split(":")[1].indexOf("-") !== -1){
  			ver_info_obj["DESCRIPTION OF MNEMONIC 1"] = arrayString.split(":")[1].split("-")[0].trim()
  			ver_info_obj["DESCRIPTION OF MNEMONIC 2"] = arrayString.split(":")[1].split("-")[1].replace("\r","").trim()
  		}
  		else{
  			ver_info_obj["DESCRIPTION OF MNEMONIC 1"] = arrayString.split(":")[1].replace("\r","").trim()
  			ver_info_obj["DESCRIPTION OF MNEMONIC 2"] = ""
  		}
 		return ver_info_obj
	};
	lasjson["VERSION INFORMATION"]["WRAP"] = splitLineofType1(Object.assign({}, ver_info_obj),wrap_line);
	lasjson["VERSION INFORMATION"]["VERS"] = splitLineofType1(Object.assign({}, ver_info_obj),vers_line);
	//// Working with PARAMETER INFORMATION block second by splitting it by newline into an array and taking items after 0,1,2 or [3:]
	var param_line_array = param_info_str.split("\n").slice(3,);
	for(i = 0; i < param_line_array.length; i++){
		//// create one object for parameter line
		if(param_line_array[i] != ""){
			var param_obj_inst = splitLineofType1(Object.assign({}, param_info_obj),param_line_array[i]);
			lasjson["PARAMETER INFORMATION"][param_obj_inst["MNEM"]] = param_obj_inst
		}
	}
	//// Working with CURVE INFORMATION BLOCK second by splitting it by newline into an array and taking items after 0,1,2 or [3:]
	var curve_line_array = curve_info_str.split("\n").slice(3,);
	for(i = 0; i < curve_line_array.length; i++){
		//// create one object for parameter line
		if(curve_line_array[i] != ""){
			var curve_obj_inst = splitLineofType1(Object.assign({}, curve_info_obj),curve_line_array[i]);
			lasjson["CURVE INFORMATION BLOCK"][curve_obj_inst["MNEM"]] = curve_obj_inst
		}
	}
	//// Working with WELL INFORMATION BLOCK second by splitting it by newline into an array and taking items after 0,1,2 or [3:]
	var well_line_array = well_info_str.split("\n").slice(3,);
	for(i = 0; i < well_line_array.length; i++){
		if(well_line_array[i].includes("Generated")){
			lasjson["WELL INFORMATION BLOCK"]["GENERATED"] = well_line_array[i].replace("\r","").replace("\t"," ").replace("#","")
		}
		//// create one object for parameter line
		else if(well_line_array[i] != ""){
			var well_obj_inst = splitLineofType1(Object.assign({}, well_info_obj),well_line_array[i]);
			lasjson["WELL INFORMATION BLOCK"][well_obj_inst["MNEM"]] = well_obj_inst
		}
		else{
			console.log(" got else ")
		}
	}
	//// Working with CURVES second by splitting it by newline into an array,
	//// then using the first line item of that array to find the curve names
	//// using those curves names to establish object keys and then interating through the other array items
	//// and populating arrays for each key
	var curve_str_array = curve_str.split("\n");
	var curve_names_array = [];
	var curve_names_array_holder = [];
	if(curve_str_array[0][0] === "A"){
		curve_names_array = curve_str_array[0].split(" ")
		console.log("0 curve_names_array = ",curve_names_array)
		curve_names_array = curve_names_array.slice(1,curve_names_array.length);
		for(i = 0; i < curve_names_array.length; i++){
			if(curve_names_array[i] !== ""){
				console.log("0.5 curve_names_array[i] = ",curve_names_array[i])
				curve_names_array_holder.push(curve_names_array[i]);
				lasjson["CURVES"][curve_names_array[i]] = []
			}
		}
	}
	else{console.log("Couldn't find curve names above curves in LAS, check formatting!")}
	//// start at position 1 instead of 0 is to avoid the curve names
	for(j = 1; j < curve_str_array.length-1; j++){
		var curve_data_line_array = curve_str_array[j].split(" ");
		var counter_of_curve_names = 0;
		for(k = 0; k < curve_data_line_array.length; k++){
			if(curve_data_line_array[k] !== ""){				
				lasjson["CURVES"][curve_names_array_holder[counter_of_curve_names]].push(curve_data_line_array[k])
				counter_of_curve_names += 1;
			}
		}
	}
	console.log(" test: lasjson",lasjson);
	return(lasjson)
}