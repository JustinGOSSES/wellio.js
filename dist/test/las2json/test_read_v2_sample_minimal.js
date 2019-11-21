const test = require('tape');
const wellio = require('../../index.js');


test('las2json: test_read_v2_sample_minimal', function(t) {
  t.plan(11);
  let well_string = wellio.loadLAS("assets/sample_2.0_minimal.las");

  t.doesNotThrow(function() {
    let well_json = wellio.las2json(well_string);
  });

  let well_json = wellio.las2json(well_string);
  t.notDeepEqual(well_json.CURVES, {}, 'well_json.CURVES should not be empty');

  t.equal(Object.keys(well_json.CURVES).length, 
    Object.keys(well_json['CURVE INFORMATION BLOCK']).length,
    'CURVE header count should match number of keys in CURVE INFORMATION BLOCK');

  for (k of Object.keys(well_json['CURVE INFORMATION BLOCK'])){
    t.ok(k in well_json.CURVES, k + 'is in well_json.CURVES');
  }
});

