const test = require('tape');
const wellio = require('../../index.js');

test('readLasioJson: test_read_lasio_sample_2.0_with_empty_headers.json', function(t) {
  t.plan(2);
  json_file = "assets/json_files/lasio_sample_2.0_empty_headers.json";

  t.doesNotThrow(function() {
    let lasio_json_str = wellio.read_lasio_json_file(json_file);
  });

  let lasio_json_str = wellio.read_lasio_json_file(json_file);
  let lasio_obj = JSON.parse(lasio_json_str);
  let wellio_obj = wellio.lasio_obj_2_wellio_obj(lasio_obj);

  t.false('VERS' in wellio_obj["VERSION INFORMATION"],
    "Sample json, empty headers: 'VERS' key is not in the Version section"
  );

  t.end();
});
