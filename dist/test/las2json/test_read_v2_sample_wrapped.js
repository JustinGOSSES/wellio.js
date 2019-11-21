const test = require('tape');
const wellio = require('../../index.js');

test.skip('las2json: test_read_v2_sample_wrapped', function(t) {
  t.plan(1);
  let well_string = wellio.loadLAS("assets/sample_2.0_wrapped.las");

  t.doesNotThrow(function() {
    let well_json = wellio.las2json(well_string);
  });
});
