const test = require('tape');
const wellio = require('../../index.js');

test('las2json: test_inf_uwi', function(t) {
  t.plan(2);
  let well_string = wellio.loadLAS("assets/sample_2.0_inf_uwi.las");

  t.doesNotThrow(function() {
    let well_json = wellio.las2json(well_string);
  });

  let well_json = wellio.las2json(well_string);
  t.equal(well_json['WELL INFORMATION BLOCK'].UWI.DATA, "300E074350061450");
});

