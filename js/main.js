
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
  fileContentsDiv = document.getElementById('log_plot_div');
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

  
}

function draw_gr(){
    makePlot(temp_json["CURVES"]["GR"],".log_plot_div",1600,200,[0,300],[0,temp_json["CURVES"]["GR"].length])
}

