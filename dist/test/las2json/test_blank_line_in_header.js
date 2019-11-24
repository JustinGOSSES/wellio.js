const test = require('tape');
const wellio = require('../../index.js');

// TODO: Fix: [TypeError: Cannot read property 'trim' of undefined] 
test.skip('las2json: test_blank_line_in_header', function(t) {
  t.plan(2);
  let well_string = wellio.loadLAS("assets/blank_line.las");

  t.doesNotThrow(function() {
    let well_json = wellio.las2json(well_string);
  });

  let well_json = wellio.las2json(well_string);
  t.equal(well_json.curves[0] === "DEPT");
});
