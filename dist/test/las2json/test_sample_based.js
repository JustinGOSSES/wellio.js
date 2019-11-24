const test = require('tape');
const wellio = require('../../index.js');

// TODO: Fix: This test currently throws a TypeError.
// The error is problably related to the parsing of the file.
test('las2json: test_read_v2_sample_based', function(t) {
  t.plan(2);
  let well_string = wellio.loadLAS("assets/sample_2.0_based.las");

  t.doesNotThrow(function() {
    let well_json = wellio.las2json(well_string);
  });

  let well_json = wellio.las2json(well_string);
  t.notDeepEqual(well_json.CURVES, {}, 'well_json.CURVES should not be empty');
});
