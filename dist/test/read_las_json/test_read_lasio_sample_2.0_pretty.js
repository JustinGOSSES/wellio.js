const test = require('tape');
const wellio = require('../../index.js');

test('readLasioJson: test_read_lasio_sample_2.0_pretty.json', function(t) {
  t.plan(2);
  json_file = "assets/json_files/lasio_sample_2.0_pretty.json";

  t.doesNotThrow(function() {
    let lasio_json_str = wellio.read_lasio_json_file(json_file);
  });

  let lasio_json_str = wellio.read_lasio_json_file(json_file);
  let lasio_obj = JSON.parse(lasio_json_str);
  let wellio_obj = wellio.lasio_obj_2_wellio_obj(lasio_obj);

  t.equal(wellio_obj["VERSION INFORMATION"].VERS.DATA, 2,
    "Sample pretty json: LAS is version 2"
  );

  t.end();
});
