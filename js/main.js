
var all_files = [];
var temp_json = {};

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}


function removeTextLAS(){
  fileContentsDiv = document.getElementById("fileContents");
  while (fileContentsDiv.hasChildNodes()) {
    fileContentsDiv.removeChild(fileContentsDiv.lastChild);
  }
}

function remove_DOM_children(div_name){
  if(!div_name){
    div_name = 'log_plot_div'
  }
  fileContentsDiv = document.getElementById(div_name);
  while (fileContentsDiv.hasChildNodes()) {
    fileContentsDiv.removeChild(fileContentsDiv.lastChild);
  }
}

function displayFileFunction(){
  var files = document.getElementById("files").files
  if (files) {
    for (var i = 0, file; file = files[i]; i++) {
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt) {
          fileContentsDiv = document.getElementById("fileContents")
          var para = document.createElement("P")
          var t = document.createTextNode(evt.target.result);      // Create a text node
          para.appendChild(t); 
          fileContentsDiv.appendChild(para); 
      }
      reader.onerror = function (evt) {
          document.getElementById("fileContents").innerHTML = "error reading file";
      }
    }  
  }
}

function writeDataToVar(files){
  if (files) {
    for (var i = 0, file; file = files[i]; i++) {
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt) {
          console.log("why wont 'this run")
          console.log("all_files = ",evt.target.result)
          fileContentsDiv = document.getElementById("fileContents")
          var para = document.createElement("P")
          var t = document.createTextNode(evt.target.result);      // Create a text node
          para.appendChild(t); 
          fileContentsDiv.appendChild(para); 
          console.log("t ",t)
      }
      reader.onerror = function (evt) {
          document.getElementById("fileContents").innerHTML = "error reading file";
      }
    }
  }

}


function readInFilesFunction(){
  console.log("got into readInFilesFunction");
  var files = document.getElementById("files").files;
  console.log("files = ",files);
  if (files) {
    all_files = []
    for (var i = 0, file; file = files[i]; i++) {
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt) {
          all_files.push(evt.target.result);
      }
      reader.onerror = function (evt) {
          document.getElementById("fileContents").innerHTML = "error reading file";
      }
    }
  }
  console.log("all_files = ",all_files)
}

function removeSubStr(string,substring){
  return string.replace(substring,"")
}


function splitLastString(){
  remove_DOM_children("curveButtons_holder")
  var las = all_files[0];
  var split1 = las.split("~");
  console.log("split1 [0] = ",split1[0]);
  console.log("split1 [1] = ",split1[1]);
  console.log("split1 [2] = ",split1[2]);
  console.log("split1 [3] = ",split1[3]);
  console.log("split1 [4] = ",split1[4]);
  console.log("split1 [5] = ",split1[5]);
  var split2_arr = split1[2].split("#");
  console.log("split2_arr[0] = ",split2_arr[0]);
  console.log("split2_arr[1] = ",split2_arr[1]);
  console.log("split2_arr[2] = ",split2_arr[2]);
  console.log("split2_arr[3] = ",split2_arr[3]);
  console.log("split2_arr[3].length() = ",split2_arr[3].length);
  var split2_arr3_newlines = split2_arr[3].split("\n");
  console.log("split2_arr3_newlines = ",split2_arr3_newlines);
  var split2_arr3_newlines_try = split2_arr3_newlines[2].split(".");
  console.log("split2_arr3_newlines_try  = ",split2_arr3_newlines_try );
  console.log(" =============  version info attempts ==========");
  var version_info = split1[1];
  var version_info_array = version_info.split("\n");
  console.log("version info :version_info_array :",version_info_array);
  var vers_line = version_info_array[1];
  var vers_line_1half = vers_line.split(":")[0].replace(" ","");
  var vers_line_1half_ver = vers_line_1half.split(".")[0];
  var version_OBJ = {"MNEM":"","UNIT":"","DATA":"","DESCRIPTION OF MNEMONIC 1":"","DESCRIPTION OF MNEMONIC 2":""};
  // version_OBJ["MNEM"] = "VER";
  version_OBJ["MNEM"] = vers_line_1half.split(".")[0];
  var hasdfa  = vers_line_1half.split(".");
  console.log("hasdfa = ",hasdfa);
  console.log("hasdfa length = ",hasdfa.length);
  console.log("hasdfa 0 onwoards = ",hasdfa.slice(1,hasdfa.length));
  // var hasdfa_2 = hasdfa[0:4].replace(" ","");
  // version_OBJ["UNIT"] = hasdfa_2;
  // version_OBJ["DATA"] = vers_line_1half.split(".")[1][4:].replace(" ","");
  version_OBJ["DESCRIPTION OF MNEMONIC 1"] = version_info_array[1].split(":")[1].split("-")[0].replace("  ","");
  version_OBJ["DESCRIPTION OF MNEMONIC 2"] = version_info_array[1].split(":")[1].split("-")[1].replace("\r","");
  console.log("version_OBJ :",version_OBJ);
  
  var wrap_line = version_info_array[2];

  var single_well_json = las2json(all_files[0]);
  console.log('single_well_json = ',single_well_json)
  console.log('single_well_json["CURVES"]["GR"] = ',single_well_json["CURVES"]["GR"])

  temp_json = single_well_json

  addCurveOptionButtons()

  
  document.getElementById("which_well").innerHTML = "UWI = "+temp_json["WELL INFORMATION BLOCK"]["UWI"]["DATA"];
  /// +temp_json["WELL INFORMATION BLOCK"]["UWI"]["DATA"]
  // document.getElementById("demo").innerHTML = "Paragraph changed!";

}

function print_well(){
  var text_of_json = vkbeautify.json(temp_json);
  var json_string = ""
  var array_of_blocks_in_las = ["WELL INFORMATION BLOCK","VERSION INFORMATION","CURVE INFORMATION BLOCK","PARAMETER INFORMATION"];
  for (each_block in array_of_blocks_in_las){
    json_string = json_string.concat(array_of_blocks_in_las[each_block]+": [")
    var counter = 0
    for(each_item in temp_json[array_of_blocks_in_las[each_block]]){
      counter += 1
      json_string = json_string.concat(JSON.stringify(temp_json[array_of_blocks_in_las[each_block]][each_item]));
      // json_string = json_string.concat(", ")
      console.log("temp_json[array_of_blocks_in_las[each_block]] == ",temp_json[array_of_blocks_in_las[each_block]])
      console.log("Object.keys(temp_json[array_of_blocks_in_las[each_block]]).length",Object.keys(temp_json[array_of_blocks_in_las[each_block]]).length)
      console.log("each_item",each_item)
      if (counter < Object.keys(temp_json[array_of_blocks_in_las[each_block]]).length){
        json_string = json_string.concat(", ")
      }
      
    }
    json_string = json_string.concat(" ], ")
  }
  json_string = json_string.concat(JSON.stringify(temp_json["CURVES"]))
  // var text_of_json_well_info = vkbeautify.json(json_string,4);
  // document.getElementById("json_print").innerHTML = text_of_json_well_info;
  document.getElementById("json_print").innerHTML = json_string;
  console.log('json_string = ',json_string)
}

function draw_gr(curve){
    if(!curve){
      var curve = "GR"
    }
    makePlot(temp_json["CURVES"][curve],".log_plot_div",1600,200,[0,300],[0,temp_json["CURVES"][curve].length])
}


function addCurveOptionButtons(){
  /// curveButtons_holder
  var div_id = "curveButtons_holder"
  var curves_available = Object.keys(temp_json["CURVES"])
  console.log("curves_available = ",curves_available)
  for(each_curve in curves_available){
    addSingleCurveButton(div_id,curves_available[each_curve])
  }
}

function addSingleCurveButton(div_id,curve_name){
          var node = document.createElement("button");
          node.setAttribute('onclick','draw_curve("'+String(curve_name)+'")')                 // Create a <li> node
          var textnode = document.createTextNode(curve_name);         // Create a text node
          node.appendChild(textnode);                              // Append the text to <li>
          document.getElementById(div_id).appendChild(node);  
}
