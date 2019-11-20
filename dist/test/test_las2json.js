const test = require('tape');
const wellio = require('../index.js');

test('las2json: test_read_v2_sample', function(t) {
  t.plan(1);
  let well_string = wellio.loadLAS("assets/lasio_test.LAS");

  t.doesNotThrow(function() {
    let well_json = wellio.las2json(well_string);
  });
});


// TODO: Fix: This test currently throws a TypeError.
// The error is problably related to the parsing of the file.
test.skip('las2json: test_read_v2_sample_based', function(t) {
  t.plan(1);
  let well_string = wellio.loadLAS("assets/sample_2.0_based.las");

  t.doesNotThrow(function() {
    let well_json = wellio.las2json(well_string);
  });
});


test('las2json: test_read_v2_sample_minimal', function(t) {
  t.plan(1);
  let well_string = wellio.loadLAS("assets/sample_2.0_minimal.las");

  t.doesNotThrow(function() {
    let well_json = wellio.las2json(well_string);
  });
});


test('las2json: test_read_v2_sample_wrapped', function(t) {
  t.plan(1);
  let well_string = wellio.loadLAS("assets/sample_2.0_wrapped.las");

  t.doesNotThrow(function() {
    let well_json = wellio.las2json(well_string);
  });
});


test('las2json: test_inf_uwi', function(t) {
  t.plan(2);
  let well_string = wellio.loadLAS("assets/sample_2.0_inf_uwi.las");

  t.doesNotThrow(function() {
    let well_json = wellio.las2json(well_string);
  });

  let well_json = wellio.las2json(well_string);
  t.equal(well_json['WELL INFORMATION BLOCK'].UWI.DATA, "300E074350061450");
});


test.skip('las2json: test_v2_inf_uwi_leading_zero_value', function(t) {
  t.plan(2);
  let well_string = wellio.loadLAS("assets/sample_2.0_inf_uwi_leading_zero.las");

  // TODO: Fix:
  // TypeError: Cannot read property 'trim' of undefined     
  // /dist/index.js:112  var unit = unit_and_data_str[0,5].trim();
  t.doesNotThrow(function() {
    let well_json = wellio.las2json(well_string);
  });

  let well_json = wellio.las2json(well_string);
  t.equal(well_json['Well Information Block'].UWI.DATA, "05001095820000");
});


test.skip('las2json: test_v2_inf_api_leading_zero_value', function(t) {
  t.plan(2);
  let well_string = wellio.loadLAS("assets/sample_2.0_inf_api_leading_zero.las");

  // TODO: Fix:
  // TypeError: Cannot read property 'trim' of undefined     
  // /dist/index.js:112  var unit = unit_and_data_str[0,5].trim();
  t.doesNotThrow(function() {
    let well_json = wellio.las2json(well_string);
  });

  let well_json = wellio.las2json(well_string);
  t.equal(well_json['Well Information Block'].UWI.DATA, "05001095820000");
});


// TODO: Fix: [TypeError: Cannot read property 'trim' of undefined] 
test.skip('las2json: test_blank_line_in_header', function(t) {
  t.plan(2);
  let well_string = wellio.loadLAS("assets/blank_line.las");

  t.doesNotThrow(function() {
    let well_json = wellio.las2json(well_string);
  });

  let well_json = wellio.las2json(well_string);
  t.equal(well_json.curves[0] === "DEPT");
});


// TODO: Fix: [TypeError: Cannot read property 'split' of undefined] 
test.skip('las2json: test_data_characters', function(t) {
  t.plan(3);
  let well_string = wellio.loadLAS("assets/data_characters.las");

  t.doesNotThrow(function() {
    let well_json = wellio.las2json(well_string);
  });

  let well_json = wellio.las2json(well_string);
  t.equal(well_json.TIME[0] === "00:00:00");

  t.equal(well_json.DATE[0] === "01-Jan-20");
});


// TODO: Fix: [TypeError: Cannot read property 'trim' of undefined]
test.skip('las2json: test_missing_a_section', function(t) {
  t.plan(2);
  let well_string = wellio.loadLAS("assets/missing_a_section.las");

  t.doesNotThrow(function() {
    let well_json = wellio.las2json(well_string);
  });

  let well_json = wellio.las2json(well_string);
  // TODO: change to check that well_json.CURVES is empty
  t.ok('data' in well_json, false);
});
