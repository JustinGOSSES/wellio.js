// These are rules for eslint, which is used to check style and other problems
/* eslint-disable guard-for-in */
/* eslint-disable no-console */
/* eslint-disable global-require */
/* eslint-disable prefer-object-spread */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
/* eslint-disable comma-dangle */
/* eslint-disable object-curly-spacing */
/* eslint-disable object-curly-newline */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
!function (e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):"undefined"!=typeof window?window.commonJsModule=e():"undefined"!=typeof global?global.commonJsModule=e():"undefined"!=typeof self&&(self.commonJsModule=e())}(function(){var define,module,exports;module={exports:(exports={})}; // eslint-disable-line

  module.exports = {

    /**
 * A helper function that takes no input arugments and returns a string with some basic
 * information about wellio.
 * @returns {string} A predetermined string message to the user about wellio.
 * @example wellio.help() >>> Wellio has the following functions: 'help',
 * 'returnThing', 'loadLAS', 'las2json', 'read_lasio_json_file', and 'lasio_obj_2_wellio_obj'.
 * You'll probably want to do well_string = wellio.loadLAS and then
 * well_as_json = las2json(well_string)."
 */
    help: function () {
      const answer = "Wellio has the following functions: 'help', 'returnThing', 'loadLAS', 'las2json', 'read_lasio_json_file', and 'lasio_obj_2_wellio_obj'. You'll probably want to do well_string = wellio.loadLAS and then well_as_json = las2json(well_string).";
      return answer;
    },

    /**
 * A helper function that proves wellio,js was installed correctly. It merely returns the
 * argument provided to it. For example, "test" as input would return "test".
 * @param {string} aTestString Any string
 * @returns {string} Returns the input that was given as an argument. This is just for
 * testing that wellio was installed correctly.
 * @example wellio.returnThing("test") >>> "test"
 */
    returnThing: function (aTestString) {
      return aTestString;
    },

    // Read and transform Lasio Json files to Wellio.js json data format

    /**
* Loads a LAS 2.0 file from local files. Takes one argument `wellLog` and returns
a string representation of the contents of the well log file.
* @param {string} wellLog A string reprepresentatiion of filename of well log to be
loaded into memory
* @returns {string} A string representation of the contents of that well log file.
 It is a single string.
*/
    loadLAS: function (wellLog) {
      const file = wellLog;
      let fs = '';

      if (process !== 'undefined' && process.versions != null && process.versions.node != null) {
        // eslint-disable-next-line global-require
        fs = require('fs');
      }
      const contents = fs.readFileSync(file).toString();
      // var contents = fs.readFileSync('test.LAS', 'utf8');
      return contents;
    },
    /**
     * las2json function converts a LAS 2.0 file already loaded into memory as a string
     * into a wellio-style JSON object
     * @param {string} onelas A string representation of a LAS 2.0 well log file.
     *  Typically from the result of the loadLAS function.
     * @param {boolean} print A true or false boolean. If true, intermediate products
     *  are sent to console.warn() to help withe debugging.
     * @returns {Object} A JSON object that represents the information that was in the
     *  LAS 2.0 well log file but in JSON wellio style format.
     * */
    las2json: function (onelas, print = true) {
      // var lasjson establishes a blank json for holding las 2.0 data.
      // It will look like the example below:
      const lasjson = {
        'VERSION INFORMATION': {
          'VERS': {'MNEM': '', 'UNIT': '', 'DATA': '', 'DESCRIPTION OF MNEMONIC 1': '', 'DESCRIPTION OF MNEMONIC 2': ''},
          'WRAP': {'MNEM': '', 'UNIT': '', 'DATA': '', 'DESCRIPTION OF MNEMONIC 1': '', 'DESCRIPTION OF MNEMONIC 2': ''}
        },
        'WELL INFORMATION BLOCK': {
          'GENERATED': '',
          'MNEM_0': {'MNEM': '', 'UNIT': '', 'DATA': '', 'DESCRIPTION OF MNEMONIC 1': '', 'DESCRIPTION OF MNEMONIC 2': ''},
          'MNEM_1': {'MNEM': '', 'UNIT': '', 'DATA': '', 'DESCRIPTION OF MNEMONIC 1': '', 'DESCRIPTION OF MNEMONIC 2': ''},
          'MNEM_2': {'MNEM': '', 'UNIT': '', 'DATA': '', 'DESCRIPTION OF MNEMONIC 1': '', 'DESCRIPTION OF MNEMONIC 2': ''}
        },
        'CURVE INFORMATION BLOCK': {
          'MNEM_0': {'MNEM': '', 'UNIT': '', 'ERCB CURVE CODE': '', 'CURVE DESCRIPTION 1': '', 'CURVE DESCRIPTION 2': ''},
          'MNEM_1': {'MNEM': '', 'UNIT': '', 'ERCB CURVE CODE': '', 'CURVE DESCRIPTION 1': '', 'CURVE DESCRIPTION 2': ''}
        },
        'PARAMETER INFORMATION': {
          'MNEM_0': {'MNEM': '', 'UNIT': '', 'DATA': '', 'DESCRIPTION OF MNEMONIC 1': '', 'DESCRIPTION OF MNEMONIC 2': ''},
          'MNEM_1': {'MNEM': '', 'UNIT': '', 'DATA': '', 'DESCRIPTION OF MNEMONIC 1': '', 'DESCRIPTION OF MNEMONIC 2': ''}
        },
        'CURVES': {
          'Curve_NAME_ONE': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          'Curve_NAME_TWO': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        }
      };
      // Some objects in the json were partially populated in the example above
      // to make understanding the format easier.
      // We'll empty them as a first step
      lasjson['VERSION INFORMATION'] = {};
      lasjson['WELL INFORMATION BLOCK'] = {};
      lasjson['CURVE INFORMATION BLOCK'] = {};
      lasjson['PARAMETER INFORMATION'] = {};
      lasjson['CURVES'] = {};
      // Within the "blocks" ["CURVE INFORMATION BLOCK","PARAMETER INFORMATION", etc.]
      // there are other objects with repeating keys.
      // The variables below will be the building blocks for each of those objects {}.
      // They are initially populated with empty strings as the values.
      const ver_info_obj = {'MNEM': '', 'UNIT': '', 'DATA': '', 'DESCRIPTION OF MNEMONIC 1': '', 'DESCRIPTION OF MNEMONIC 2': ''};
      const well_info_obj = {'MNEM': '', 'UNIT': '', 'DATA': '', 'DESCRIPTION OF MNEMONIC 1': '', 'DESCRIPTION OF MNEMONIC 2': ''};
      const curve_info_obj = {'MNEM': '', 'UNIT': '', 'ERCB CURVE CODE': '', 'CURVE DESCRIPTION 1': '', 'CURVE DESCRIPTION 2': ''};
      const param_info_obj = {'MNEM': '', 'UNIT': '', 'DATA': '', 'DESCRIPTION OF MNEMONIC 1': '', 'DESCRIPTION OF MNEMONIC 2': ''};
      // The las file is read as a txt file. It will first be split into seperate
      // strings based on "~" character which occurs at the top of each "block"

      let vers_str = '';
      let well_info_str = '';
      let curve_info_str = '';
      let param_info_str = '';
      let other = '';
      let curve_str = '';

      if (print === true) {
        console.warn('onelas = ', onelas);
      }

      // Split in to las sections that start with a tilde: ~.
      const split1 = onelas.split(/(~[^~]+)/);
      if (print === true) {
        console.warn('split1 = ', split1);
      }

      // As the 'OTHER' block may or may not be present, we have to split by '~' and
      // then look for a substring to make sure we have the right block before we put
      // each into a variable.
      if (print === true) {
        console.warn('split1.lengths = ', split1.length);
        console.warn('split1 = ', split1);
      }
      for (let i = 0; i < split1.length; i++) {
        // Skip blank entries in the split1 array.
        if (split1[i].length === 0) {
          // eslint-disable-next-line no-continue
          continue;
        }
        if (split1[i].includes('~V')) {
          vers_str = split1[i];
        }
        else if (split1[i].includes('~W')) {
          well_info_str = split1[i];
        }
        else if (split1[i].includes('~C')) {
          curve_info_str = split1[i];
        }
        else if (split1[i].includes('~P')) {
          param_info_str = split1[i];
        }
        else if (split1[i].includes('~O')) {
          // note 'other' is never used! This should be fixed in future!
          // eslint-disable-next-line no-unused-vars
          other = split1[i];
        }
        else if (split1[i].includes('~A')) {
          curve_str = split1[i];
        }
        else {
          console.warn(`WARNING: In wellio.js the las2json() function: split1[${i}] is not a recognized las section`);
          console.warn(`elem: [${split1[i]}]`);
        }
      }

      // Regular expression for splitting las file into lines
      const eol_regex = /\r\n|\r|\n/;

      // Working with version block first by splitting it by newline and places each
      // item into an array
      // and taking items of array 1 and 2 for vers and wrap
      const vers_line = vers_str.split(eol_regex)[1];
      const wrap_line = vers_str.split(eol_regex)[2];
      // As version information, well information, and parameter information blocks
      // contain objects with the same keys, we can process them using a loop.
      // function to process objects for ver_info_obj, well_inf_obj, and param_info_obj
      // The splitLineofType1() function takes as argument the prototypical object
      // building block and the array of strings for that block
      // eslint-disable-next-line no-shadow
      function splitLineofType1(ver_info_obj, arrayString) {
        // splits string (should be a single line from the LAS text) by ":",
        // takes the first item of the resulting array, and then replaces any " "
        // with "".
        const as_array = arrayString.split(':');
        const vers_line_1half = as_array[0].replace(' ', '');
        // splits the previous string variable by "." into an array of strings.
        const vers_line_1half_array = vers_line_1half.split('.');
        // trimming this so I get "UWI" instead of "UWI    "
        // eslint-disable-next-line no-param-reassign
        ver_info_obj['MNEM'] = vers_line_1half_array[0].trim();
        const unit_and_data = vers_line_1half_array.slice(1, vers_line_1half_array.length);
        let unit_and_data_str = '                        ';
        if (unit_and_data.length > 1) {
          // eslint-disable-next-line prefer-template
          unit_and_data_str = unit_and_data[0].toString() + '.' + unit_and_data[1].toString();
        }
        // This is an empty ver_info_obj, print a warning and return
        else if (ver_info_obj['MNEM'] === '' && unit_and_data.length === 0) {
          console.warn('WARNING: Metatdata line has no data: ', vers_line_1half_array);
          return ver_info_obj;
        }
        else {
          unit_and_data_str = unit_and_data.toString();
        }

        // Sometimes the unit_and_data_str are less that 5 chars
        let last_idx = 5;
        if ((unit_and_data_str.length - 1) < 5) {
          last_idx = unit_and_data_str.length - 1;
        }
        // eslint-disable-next-line no-sequences
        const unit = unit_and_data_str[0, last_idx].trim();
        const data = unit_and_data_str.substring(5, unit_and_data_str.length).trim();
        ver_info_obj['DATA'] = data;
        ver_info_obj['UNIT'] = unit;

        if (as_array[1] && as_array[1].indexOf('-') !== -1) {
          ver_info_obj['DESCRIPTION OF MNEMONIC 1'] = as_array[1].split('-')[0].trim();
          ver_info_obj['DESCRIPTION OF MNEMONIC 2'] = as_array[1].split('-')[1].trim();
        }
        else if (as_array[1]) {
          ver_info_obj['DESCRIPTION OF MNEMONIC 1'] = as_array[1].trim();
          ver_info_obj['DESCRIPTION OF MNEMONIC 2'] = '';
        }
        return ver_info_obj;
      }
      lasjson['VERSION INFORMATION']['WRAP'] = splitLineofType1(Object.assign({}, ver_info_obj), wrap_line);
      lasjson['VERSION INFORMATION']['VERS'] = splitLineofType1(Object.assign({}, ver_info_obj), vers_line);
      // Working with PARAMETER INFORMATION block second by splitting it by newline
      // into an array. This skips the line with the section's title.
      const param_line_array = param_info_str.split(eol_regex).slice(1,);
      for (let i = 0; i < param_line_array.length; i++) {
        // create one object for parameter line
        // Skip empty elements and comment elements that start with '#'.
        if (param_line_array[i] !== '' && !param_line_array[i].trim().startsWith('#')) {
          const param_obj_inst = splitLineofType1(
            Object.assign({}, param_info_obj), param_line_array[i]
          );
          if (param_obj_inst.MNEM) {
            lasjson['PARAMETER INFORMATION'][param_obj_inst['MNEM']] = param_obj_inst;
          }
        }
      }
      // Working with CURVE INFORMATION BLOCK second by splitting it by newline
      // into an array.
      // This skips the line with the section's title.
      const curve_line_array = curve_info_str.split(eol_regex).slice(1,);
      for (let i = 0; i < curve_line_array.length; i++) {
        // create one object for parameter line
        // Skip empty elements and comment elements that start with '#'.
        if (curve_line_array[i] !== '' && !curve_line_array[i].trim().startsWith('#')) {
          const curve_obj_inst = splitLineofType1(
            Object.assign({}, curve_info_obj), curve_line_array[i]
          );
          if (curve_obj_inst.MNEM) {
            lasjson['CURVE INFORMATION BLOCK'][curve_obj_inst['MNEM']] = curve_obj_inst;
          }
        }
      }
      // Working with WELL INFORMATION BLOCK second by splitting it by newline into an
      // array. This skips the line with the section's title.
      const well_line_array = well_info_str.split(eol_regex).slice(1,);
      for (let i = 0; i < well_line_array.length; i++) {
        if (well_line_array[i].includes('Generated')) {
          lasjson['WELL INFORMATION BLOCK']['GENERATED'] = well_line_array[i].replace('\t', ' ').replace('#', '');
        }
        // create one object for parameter line
        // Skip empty elements and comment elements that start with '#'.
        else if (well_line_array[i] !== '' && !well_line_array[i].trim().startsWith('#')) {
          const well_obj_inst = splitLineofType1(
            Object.assign({}, well_info_obj), well_line_array[i]
          );
          if (well_obj_inst.MNEM) {
            lasjson['WELL INFORMATION BLOCK'][well_obj_inst['MNEM']] = well_obj_inst;
          }
        }
        else {
          console.warn(`INFO: in else for well_line: ${i}`);
          console.warn(`elem: [${well_line_array[i]}]`);
        }
      }
      // Work with CURVES section by splitting it by newline into an array,
      // Iterate through the array items populate arrays for each key
      const curve_str_array = curve_str.split(eol_regex);

      // Get the curve column names from the curve names in the curve information block
      //
      // Per LAS_20_Update_Jan2014.pdf section 5.5 specs for ~C(Curve Information)
      // - This section is manditory.
      // - It describes the curves and its units in the order they appear in the ~ASCII
      // log data section of the file.
      // - The channels described in this section must be present in the data set.
      const curve_names_array_holder = [];
      const curve_info = Object.keys(lasjson['CURVE INFORMATION BLOCK']);

      if (curve_info.length > 0) {
        for (let k = 0; k < curve_info.length; k++) {
          const col_name = curve_info[k];
          curve_names_array_holder.push(col_name);
          lasjson.CURVES[col_name] = [];
        }
      }

      let curve_data_line_array = [];

      // start at position 1 instead of 0 is to avoid the curve names
      for (let j = 1; j < curve_str_array.length; j++) {
        // Skip empty rows.
        if (curve_str_array[j].length === 0) {
          // eslint-disable-next-line no-continue
          continue;
        }

        const temp_data_array = curve_str_array[j].split(/\s+/);
        // Split can leave an empty element at the beginning, remove it.
        if (temp_data_array[0].length === 0) {
          temp_data_array.shift();
        }

        // If data is wrapped continue to accumulate data from rows till
        // we have a data element for each data column
        let idx = curve_data_line_array.length;
        curve_data_line_array.length = idx + temp_data_array.length;
        for (let i = 0; i < temp_data_array.length; i++, idx++) {
          curve_data_line_array[idx] = temp_data_array[i];
        }

        if (
          lasjson['VERSION INFORMATION'].WRAP.DATA === 'YES'
          && curve_data_line_array.length < curve_names_array_holder.length
        ) {
          // eslint-disable-next-line no-continue
          continue;
        }

        let counter_of_curve_names = 0;
        console.warn('curve_data_line_array.length = ', curve_data_line_array.length);
        console.warn('curve_data_line_array = ', curve_data_line_array);

        const last_curv_data_line_position = curve_data_line_array.length - 1;
        console.warn('curve_data_line_array[last_curv_data_line_position] = ', curve_data_line_array[last_curv_data_line_position]);
        curve_data_line_array[last_curv_data_line_position] = curve_data_line_array[last_curv_data_line_position].replace('\r', '');
        console.warn('curve_data_line_array[last_curv_data_line_position] = ', curve_data_line_array[last_curv_data_line_position]);
        for (let k = 0; k < curve_data_line_array.length; k++) {
          if (curve_data_line_array[k] !== '') {
            lasjson['CURVES'][curve_names_array_holder[counter_of_curve_names]].push(curve_data_line_array[k]);
            counter_of_curve_names += 1;
          }
        }
        // Zero out curve_data_line_array for next set of data
        curve_data_line_array = [];
      }
      console.warn(' test: lasjson', lasjson);
      return (lasjson);
    },

    // Given a well already converted into json, returns the available curves
    /**
     * Given a well already converted into wellio-style json in memory,
     * the CurveNames function returns the available curves in that well.
     * @param {object} well_json A wellio-style json in memory, typically resulting
     * from the wellio.las2json() function.
     * @returns {Array} An array of strings representing the curve names in the well.
     */
    CurveNames: function (well_json) {
      const curveNames = Object.keys(well_json['CURVES']);
      return curveNames;
    },

    /**
     * Given a well already converted into wellio-style json in memory, the VER_block
     * function returns the entire version block of the original LAS file as a string.
     * @param {object} well_json A wellio-style json in memory, typically resulting from
     * the wellio.las2json() function.
     * @returns {string} An array of strings representing the entire version block of the
     *  original LAS file as a string.
     */
    VER_block: function (well_json) {
      return well_json['VERSION INFORMATION'];
    },
    // Given a well already converted into json, returns the well UWI
    /**
     * Given a well already converted into wellio-style json in memory, the UWI function
     *  attempts to return the UWI field of the original LAS file as a string. Pleaes note
     * that this doesn't exisst in every well log and will therefore fail sometimes!
     * @param {object} well_json A wellio-style json in memory, typically resulting from
     *  the wellio.las2json() function.
     * @returns {string} An a string representing the UWI field of the original LAS file.
     */
    UWI: function (well_json) {
      return well_json['WELL INFORMATION BLOCK']['UWI']['DATA'];
    },
    // Given a well already converted into json, returns a given curve name in string format
    /**
     * Given a well already converted into wellio-style json in memory, the wellio.getCurve()
     *  function attempts to return the curve data of a given well log. If it doesn't
     *  exist, the message "that curve does not exist! see console.warn" is outputted to
     *  console.warn and returned by the function.
     * @param {object} well_json A wellio-style json in memory, typically resulting from the
     *  wellio.las2json() function.
     * @param {string} curve A string representation of a particular curve name.
     * @returns {array} An array of integers or floats representing the data for a particular
      *  curve in a given well log.
     */
    getCurve(well_json, curve) {
      if (!well_json['CURVES'][curve]) {
        console.warn('in getCurve function, that curve does not exist! =', curve);
        return 'that curve does not exist! see console.warn';
      }
      // eslint-disable-next-line no-else-return
      else {
        return well_json['CURVES'][curve];
      }
    },

    /**
     * File reading utility function for a JSON file that contains what was a LAS 2.0 well
     *  log already converted into JSON by the Python package Lasio.
     * Lasio is also used by Welly.
     * This function will read the file and keep it in memory.
     * After running this function, You'll likely want to use the `lasio_obj_2_wellio_obj`
     *  function to convert the lasio-style JSON in memory to wellio-style JSON in memory.
     * @param {string} file_to_read : file_to_read - The file to open.s
     * @returns {string} : The file's contents as a string.
     */
    read_lasio_json_file: function (file_to_read) {
      // Configure fs if running from node
      let fs = '';

      if (process !== 'undefined' && process.versions != null && process.versions.node != null) {
        fs = require('fs');
      }

      return fs.readFileSync(file_to_read, 'utf8');
    },

    /**
    * The lasio_obj_2_wellio_obj function transforms lasio-style JSON strings into wellio-style
    * JSON data format in memory and returns it.
    * If you're working with a JSON file created by lasio, you'll want to load it into memory
    * first using the `read_lasio_json_file` function.
    * @param {object} lasio_json - A JavaScript object representation of lasio well log format
    *
    * @example
    * This is an example of a full sequence of calls that also uses this function.
    * let wellio = require('wellio')
    * let lasio_json_str = wellio.read_lasio_json_file('lasio.json');
    * let lasio_obj = JSON.parse(lasio_json_str);
    * let wellio_obj = wellio.lasio_obj_2_wellio_obj(lasio_obj);
    *
    * @returns {object} A wellio style JSON object
    */
    lasio_obj_2_wellio_obj: function (lasio_obj) {
      const std_headers = {
        'Version': 'VERSION INFORMATION',
        'Well': 'WELL INFORMATION BLOCK',
        'Curves': 'CURVE INFORMATION BLOCK',
        'Parameter': 'PARAMETER INFORMATION'
      };

      const lasjson = {};
      lasjson['VERSION INFORMATION'] = {};
      lasjson['WELL INFORMATION BLOCK'] = {};
      lasjson['CURVE INFORMATION BLOCK'] = {};
      lasjson['PARAMETER INFORMATION'] = {};
      lasjson['CURVES'] = lasio_obj.data;

      // Example code for adding non-standard headers
      // eslint-disable-next-line no-restricted-syntax
      for (const item in lasio_obj.metadata) {
        if (!(item in std_headers)) {
          lasjson[item.toUpperCase()] = lasio_obj.metadata[item];
        }
        else {
          // eslint-disable-next-line guard-for-in
          // eslint-disable-next-line no-restricted-syntax
          for (const mnemonic in lasio_obj.metadata[item]) {
            // eslint-disable-next-line no-undef
            section = std_headers[item];
            // eslint-disable-next-line no-undef
            lasjson[section][mnemonic] = {
              'MNEM': mnemonic,
              'UNIT': '',
              'DATA': lasio_obj.metadata[item][mnemonic],
              'DESCRIPTION OF MNEMONIC 1': '',
              'DESCRIPTION OF MNEMONIC 2': ''
            };
          }
        }
      }

      return lasjson;
    }

  };

  return module.exports;
});
