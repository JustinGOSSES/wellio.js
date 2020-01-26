const test = require('tape');
const wellio = require('../../index.js');

test('las2json: test_read_v2_sample', function(t) {
  t.plan(3);
  let well_string = wellio.loadLAS("assets/lasio_test.LAS");

  t.doesNotThrow(function() {
    let well_json = wellio.las2json(well_string);
  });

  let well_json = wellio.las2json(well_string);
  t.equal(well_json.CURVES.DEPT[1], '1669.875',
    'Read basic sample: 2nd DEPT is 1669.875'
  );

  ild_len = well_json.CURVES.ILD.length - 1;
  t.equal(well_json.CURVES.ILD[ild_len], '105.600',
    'Read basic sample: last ILD is 105.600'
  );
  t.end();
});
