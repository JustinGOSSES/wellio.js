const test = require('tape');
const wellio = require('../../index.js');

test('las2json: test_extra_data_columns', function(t) {
  t.plan(6);
  let well_string = wellio.loadLAS("assets/usgs_bad/261058081145201.19980227.ZE.las");

  t.doesNotThrow(function() {
    let well_json = wellio.las2json(well_string);
  });

  let well_json = wellio.las2json(well_string);
  t.ok('UNKNOWN6' in well_json.CURVES, "'UNKNOWN6' curve header is in CURVES");
  t.ok('STRT' in well_json['WELL INFORMATION BLOCK'], "'STRT' well header is in WELL");
  t.equal(well_json.CURVES.UNKNOWN6[0], '0', "Non-existent item in undocumented column IS '0'");
  t.equal(well_json.CURVES.UNKNOWN6[100], '-30.0', "Entry with a value in the undocumented column");
  t.equal(well_json.CURVES.UNKNOWN6[356], '0', "Non-existant item after the undocumented column data");
});
