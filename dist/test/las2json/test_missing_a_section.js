const test = require('tape');
const wellio = require('../../index.js');

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
