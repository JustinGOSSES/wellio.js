//// wellio_batch.js is a small script to convert all LAS files in a certain directory into a single JSON
//// by Justin Gosses, May 12th, 2018
//// MIT License
//// @justinGOSSES

//// INSTRUCTIONS:
//// In a command line type `node wellio_batch.js <dirStr> <fileStr> <allWellsJSONname> <failedWellsJSONname>`
//// replace the <string> with your own arguments. Defaults are given below under "THE FOUR ARGUMENTS"


//////////////////////////////////////////////////////////////////////////////
var args = {};

//// Arguments supplied from command line if given are processed here and put into args object
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
  if (index >= 2){
    args[(index-2)] = val
  }
});
console.log("args = ",args)

//// The four arguments
//// inputs
var dirStr = args[0] || "../LogsTest/"
var fileStr = args[1] || "*.LAS"
//// outputs
var allWellsJSONname = args[2] || "TestAllWells"
var failedWellsJSONname = args[3] || "TestFailedWells"

////////////////////////////////////////////////////////////////////////////////

//// combine directory and file strings used in glob into a single path
var pattern = dirStr + fileStr

//// Import node.js libraries
var writeFile = require("fs").writeFile
var Glob = require("glob")
var wellio = require('wellio')

//// command line checks at start
console.log("pattern to find files is: ",pattern)
console.log("name of resulting json will be: ",allWellsJSONname+".json")

//// function that takes full path and returns just the UWI part
function cleanName(fullPath){
  var noDir =  fullPath.replace(dirStr,'');
  var noLAS =  noDir.replace('.LAS','');
  return noLAS
}

//// A function that takes in the paths of all the files found that match the pattern
//// Loads the wells from LAS to LAS string to Wellio JSON and then makes:
//// (1) a big json of all wells &
//// (2) a json of all wells that couldn't be added for some reason.
//// It then write these two JSON to file in the same place this program is run from!
function writeMultiLASIntoBigJSON(matches){
  
  //// establish array that will eventually be the big json for multiple wells
  var all_wells = {};
  var wells_not_processed = {};

  function getDataAddToJSON(pathToWellStr){
    
    try {
      console.log("entering try block");
      //// get the LAS string
      var well_string = wellio.loadLAS(pathToWellStr)
      //// convert LAS string into JSON
      var well_json = wellio.las2json(well_string)
      //// get UWI string from path string
      var UWIstr = cleanName(pathToWellStr)
      //// append each well json to big json of all wells using UWI as key and individual well json as value
      all_wells[UWIstr] = well_json
    }
    
    catch (e) {
      console.log("entering catch block");
      console.log("e = ",e);
      var UWI = cleanName(pathToWellStr)
      console.log("UWI of problem well is ",UWI)
      wells_not_processed[UWI.toString()] = e.message;
      console.log("leaving catch block");
    }
    
    finally {
      console.log("entering and leaving the finally block");
    }
    
    
  }
  
  //// for each well path in matches
  matches.map(getDataAddToJSON)
  
  //// stringify big json with all wells
  well_json_string_big = JSON.stringify(all_wells)
  
  
  //// write stringified big json to file
  writeFile(allWellsJSONname+".json", well_json_string_big, 'utf8', function (err) {console.log("error in writing allMannvillWells.json if exists is - ",err)})
  
  //// stringify failed wells json
  wells_not_processed_str = JSON.stringify(wells_not_processed)
  
  //// write stringified big json to file
  writeFile(failedWellsJSONname+".json", wells_not_processed_str, 'utf8', function (err) {console.log("error in writing MannvillWells_NowWorked.json if exists is - ",err)})
  console.log("done")
}

//// Uses node.js Glob to search for files that match a pattern, convert results from LAS to JSON format, and then write results to file
var mg = new Glob(pattern, {mark: true}, function (er, matches) {
  console.log("matches", matches)
  writeMultiLASIntoBigJSON(matches)
  return matches
})

console.log("done")
