const test = require('tape');
const wellio = require('../../index.js');

test('las2json: test_duplicate_header', function(t) {
  t.plan(3);
  let well_string = wellio.loadLAS("assets/usgs_bad/260341080252801.19980915.NN.las");

  t.doesNotThrow(function() {
    let well_json = wellio.las2json(well_string);
  });

  let well_json = wellio.las2json(well_string);
  t.ok('DEPT' in well_json.CURVES, "'DEPT' curve header is in CURVES");
  t.ok('STRT' in well_json['WELL INFORMATION BLOCK'], "'STRT' well header is in WELL");
});
