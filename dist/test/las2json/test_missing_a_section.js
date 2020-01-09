const test = require('tape');
const wellio = require('../../index.js');

test('las2json: test_missing_a_section', function(t) {
  t.plan(4);
  let well_string = wellio.loadLAS("assets/missing_a_section.las");

  t.doesNotThrow(function() {
    let well_json = wellio.las2json(well_string);
  });

  let well_json = wellio.las2json(well_string);
  t.equal(Object.keys(well_json.CURVES).length, 1,
    'Missing data test: well_json.CURVES has one key'
  );

  t.ok('DEPT' in well_json.CURVES,
    'Missing data test: "DEPT" MNEM is the key well_json.CURVES'
  );

  t.equal(well_json.CURVES.DEPT.length, 0,
    'Missing data test: well_json_CURVES.DEPT has no data'
  );
});
