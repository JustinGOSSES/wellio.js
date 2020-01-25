const test = require('tape');
const wellio = require('../../index.js');

test('las2json: test_read_v2_sample', function(t) {
  t.plan(2);
  json_file = "assets/json_files/sample_2.0_pretty.json";

  t.doesNotThrow(function() {
    let well_json = wellio.read_json(json_file);
  });

  let well_json = wellio.read_json(json_file);

  t.equal(well_json["VERSION INFORMATION"].VERS.DATA, 2);

  t.end();
});
