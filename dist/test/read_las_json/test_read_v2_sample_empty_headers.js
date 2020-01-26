const test = require('tape');
const wellio = require('../../index.js');

test('readLasioJson: test_read_v2_sample_empty_headers', function(t) {
  t.plan(2);
  json_file = "assets/json_files/sample_2.0_empty_headers.json";

  t.doesNotThrow(function() {
    let well_json = wellio.read_json(json_file);
  });

  let well_json = wellio.read_json(json_file);

  t.false('VERS' in well_json["VERSION INFORMATION"],
    "Sample json, empty headers: 'VERS' key is not in the Version section"
  );

  t.end();
});
