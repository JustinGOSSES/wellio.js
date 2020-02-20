const test = require('tape');
const wellio = require('../../index.js');

/**
* A test function for v2 empty headers
*/
test('readLasioJson: test_read_v2_sample_empty_headers', function(t) {
  t.plan(2);
  json_file = "assets/json_files/sample_2.0_empty_headers.json";

  t.doesNotThrow(function() {
    let lasio_json_str = wellio.read_file(json_file);
  });

  let lasio_json_str = wellio.read_file(json_file);
  let lasio_obj = JSON.parse(lasio_json_str);
  let wellio_obj = wellio.lasio_2_wellio(lasio_obj);

  t.false('VERS' in wellio_obj["VERSION INFORMATION"],
    "Sample json, empty headers: 'VERS' key is not in the Version section"
  );

  t.end();
});
