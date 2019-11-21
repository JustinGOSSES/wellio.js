const test = require('tape');
const wellio = require('../../index.js');

test('las2json: test_read_v2_sample', function(t) {
  t.plan(1);
  let well_string = wellio.loadLAS("assets/lasio_test.LAS");

  t.doesNotThrow(function() {
    let well_json = wellio.las2json(well_string);
  });
});
