const test = require('tape');
const wellio = require('../../index.js');

// TODO: Fix: [TypeError: Cannot read property 'split' of undefined] 
test.skip('las2json: test_data_characters', function(t) {
  t.plan(3);
  let well_string = wellio.loadLAS("assets/data_characters.las");

  t.doesNotThrow(function() {
    let well_json = wellio.las2json(well_string);
  });

  let well_json = wellio.las2json(well_string);
  t.equal(well_json.TIME[0] === "00:00:00");

  t.equal(well_json.DATE[0] === "01-Jan-20");
});
