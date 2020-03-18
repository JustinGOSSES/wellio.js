const test = require('tape');
const wellio = require('../../index.js');

test('readWellioJson: test_read_wellio_sample_2.0.json', function(t) {
  t.plan(2);
  json_file = "assets/json_files/wellio_sample_2.0.json";

  t.doesNotThrow(function() {
    let wellio_json_str = wellio.read_lasio_json_file(json_file);
  });

  let wellio_json_str = wellio.read_lasio_json_file(json_file);
  let wellio_obj = JSON.parse(wellio_json_str);

  t.equal(wellio_obj["VERSION INFORMATION"].VERS.DATA, '2.0',
    "Sample Wellio json: LAS is version 2"
  );

  t.end();
});
