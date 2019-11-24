const test = require('tape');
const wellio = require('../../index.js');

test.skip('las2json: test_v2_inf_uwi_leading_zero_value', function(t) {
  t.plan(2);
  let well_string = wellio.loadLAS("assets/sample_2.0_inf_uwi_leading_zero.las");

  // TODO: Fix:
  // TypeError: Cannot read property 'trim' of undefined     
  // /dist/index.js:112  var unit = unit_and_data_str[0,5].trim();
  t.doesNotThrow(function() {
    let well_json = wellio.las2json(well_string);
  });

  let well_json = wellio.las2json(well_string);
  t.equal(well_json['Well Information Block'].UWI.DATA, "05001095820000");
});
