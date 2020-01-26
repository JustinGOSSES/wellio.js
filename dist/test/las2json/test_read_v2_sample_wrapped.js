const test = require('tape');
const wellio = require('../../index.js');

test('las2json: test_read_v2_sample_wrapped', function(t) {
  t.plan(4);
  let well_string = wellio.loadLAS("assets/sample_2.0_wrapped.las");

  t.doesNotThrow(function() {
    let well_json = wellio.las2json(well_string);
  });

  let well_json = wellio.las2json(well_string);

  console.log(well_json.CURVES.length);
  console.log(well_json.CURVES);
  t.equal(well_json.CURVES.DEPT[0], '910.000000',
    'Wrapped data: 1st DEPT is 910.000000'
  );
  t.equal(well_json.CURVES.DEPT[1], '909.875000',
    'Wrapped data: 2nd DEPT is 909.875000'
  );

  t.equal(well_json.CURVES.RESD[0], '12.2681',
    'Wrapped data: 1st RESD is 12.2681'
  );
  
  t.end();
});
