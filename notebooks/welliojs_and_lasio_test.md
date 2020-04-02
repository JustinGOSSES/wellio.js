### Idea Working Towards:
- Load well with LASIO
- Export LASIO style JSON
- CONVERT LASIO style JSON to WELLIO style JSON
- Visualize with wellioviz


```python
import json
import lasio
import numpy as np
from datetime import datetime
```

#### Pixiedust node module enables running Node.js code in Jupyter.
https://github.com/pixiedust/pixiedust_node


```python
import pixiedust_node
```


```python
%%node
const wellio = require('wellio');
const wellioviz = require('wellioviz')
```

    Uncaught
    Uncaught


#### Create a las file via lasio and translate it to json.


```python
las = lasio.LASFile()

las.well.DATE = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
las.params['ENG'] = lasio.HeaderItem('ENG', value='Kent Inverarity')
las.params['LMF'] = lasio.HeaderItem('LMF', value='GL')
las.other = 'Example of how to create a LAS file from scratch using lasio'
depths = np.arange(10, 50, 0.5)
synth = np.log10(depths)*5+np.random.random(len(depths))
synth[:8] = np.nan
las.add_curve('DEPT', depths, unit='m')
las.add_curve('SYNTH', synth, descr='fake data')
las.write('scratch_v2.las', version=2)
json_images = json.dumps(las, cls=lasio.JSONEncoder)
```

#### Example 1: Read the in-memory Lasio json string into Wellio json


```python
%%node
let lasio_obj = '';
let wellio_obj = '';

try {
    lasio_obj = JSON.parse(json_images);
    wellio_obj = wellio.lasio_obj_2_wellio_obj(lasio_obj);
} catch (e) {
    console.log('[');
    console.log(e.name + ":: " + e.message);
    console.log(']');
}

console.log(wellio_obj);


```

    Uncaught
    Uncaught
    ... ... ... ... ... ... ...
    {
    'VERSION INFORMATION': {
    VERS: {
    MNEM: 'VERS',
    UNIT: '',
    DATA: 2,
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    WRAP: {
    MNEM: 'WRAP',
    UNIT: '',
    DATA: 'NO',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    DLM: {
    MNEM: 'DLM',
    UNIT: '',
    DATA: 'SPACE',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    }
    },
    'WELL INFORMATION BLOCK': {
    STRT: {
    MNEM: 'STRT',
    UNIT: '',
    DATA: 10,
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    STOP: {
    MNEM: 'STOP',
    UNIT: '',
    DATA: 49.5,
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    STEP: {
    MNEM: 'STEP',
    UNIT: '',
    DATA: 0.5,
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    NULL: {
    MNEM: 'NULL',
    UNIT: '',
    DATA: -9999.25,
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    COMP: {
    MNEM: 'COMP',
    UNIT: '',
    DATA: '',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    WELL: {
    MNEM: 'WELL',
    UNIT: '',
    DATA: '',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    FLD: {
    MNEM: 'FLD',
    UNIT: '',
    DATA: '',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    LOC: {
    MNEM: 'LOC',
    UNIT: '',
    DATA: '',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    PROV: {
    MNEM: 'PROV',
    UNIT: '',
    DATA: '',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    CNTY: {
    MNEM: 'CNTY',
    UNIT: '',
    DATA: '',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    STAT: {
    MNEM: 'STAT',
    UNIT: '',
    DATA: '',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    CTRY: {
    MNEM: 'CTRY',
    UNIT: '',
    DATA: '',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    SRVC: {
    MNEM: 'SRVC',
    UNIT: '',
    DATA: '',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    DATE: {
    MNEM: 'DATE',
    UNIT: '',
    DATA: '2020-04-02 10:33:34',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    UWI: {
    MNEM: 'UWI',
    UNIT: '',
    DATA: '',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    API: {
    MNEM: 'API',
    UNIT: '',
    DATA: '',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    }
    },
    'CURVE INFORMATION BLOCK': {
    DEPT: {
    MNEM: 'DEPT',
    UNIT: '',
    DATA: '',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    SYNTH: {
    MNEM: 'SYNTH',
    UNIT: '',
    DATA: '',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    }
    },
    'PARAMETER INFORMATION': {
    ENG: {
    MNEM: 'ENG',
    UNIT: '',
    DATA: 'Kent Inverarity',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    LMF: {
    MNEM: 'LMF',
    UNIT: '',
    DATA: 'GL',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    }
    },
    CURVES: {
    DEPT: [
    10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5,
    15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5,
    20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5,
    25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5,
    30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34, 34.5,
    35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5,
    40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5,
    45, 45.5, 46, 46.5, 47, 47.5, 48, 48.5, 49, 49.5
    ],
    SYNTH: [
    null,               null,               null,
    null,               null,               null,
    null,               null,               6.656126216525917,
    6.679133697708385,  6.568704369178376,  6.6972674302176,
    6.9952966958975455, 6.215067958948919,  6.216229106804464,
    6.578506807255792,  6.4063916132066305, 6.834066583041462,
    7.074548678838579,  7.434101159592576,  6.813692875131577,
    7.124467278648008,  7.305891281079443,  6.8548440372284425,
    7.187425208744087,  7.614504283784063,  7.400538301687238,
    7.634951335964951,  7.1591613220416885, 7.24660033345942,
    7.857618563408799,  7.216432694478079,  7.936601694712575,
    7.875392325565011,  7.846522098205257,  7.961055735523032,
    7.9875444534185265, 7.682651775215826,  8.263217826161247,
    7.428245570191011,  7.458552722300149,  7.673507182326855,
    8.133879671159866,  8.012507192488785,  7.908945798159758,
    8.54491362181899,   8.376826166395343,  8.521367058238015,
    7.869488464355213,  8.540819991711249,  7.747693920723054,
    7.76482594561203,   8.28587927242152,   8.728442160706201,
    8.151644609626715,  8.006276115555549,  8.281930061984767,
    8.766240213463439,  8.319394583040257,  8.489786177815033,
    8.146427144422542,  8.844022951417106,  9.03420857345524,
    8.576113379003877,  8.847766779137505,  8.862173511651742,
    8.268354623317148,  8.66131564127789,   8.220744002754165,
    9.16311245034184,   9.001221866547048,  8.736589896026489,
    9.19890130952019,   8.501797698154366,  8.407307072785272,
    8.790066454256026,  8.795004229881293,  8.43386447378256,
    9.102603234862638,  8.508067459270954
    ]
    },
    OTHER: 'Example of how to create a LAS file from scratch using lasio'
    }


#### Introduce wellioviz and pass the wellio_obj to wellioviz


```python
%%node
console.log(wellioviz.define_wellioviz());
```

    WELLIOVIZ is a JavaScript library that provides functionality to visualize well logs, particularly those already converted to JSON, using d3.js visualization library.



```python
%%node
let three_things = wellioviz.fromJSONofWEllGetThingsForPlotting(wellio_obj,"DEPT");
console.log(three_things);
```

    {
    well_log_curves_reformatted_for_d3: [
    { UWI: '', DEPT: 10, SYNTH: NaN },
    { UWI: '', DEPT: 10.5, SYNTH: NaN },
    { UWI: '', DEPT: 11, SYNTH: NaN },
    { UWI: '', DEPT: 11.5, SYNTH: NaN },
    { UWI: '', DEPT: 12, SYNTH: NaN },
    { UWI: '', DEPT: 12.5, SYNTH: NaN },
    { UWI: '', DEPT: 13, SYNTH: NaN },
    { UWI: '', DEPT: 13.5, SYNTH: NaN },
    { UWI: '', DEPT: 14, SYNTH: 6.656126216525917 },
    { UWI: '', DEPT: 14.5, SYNTH: 6.679133697708385 },
    { UWI: '', DEPT: 15, SYNTH: 6.568704369178376 },
    { UWI: '', DEPT: 15.5, SYNTH: 6.6972674302176 },
    { UWI: '', DEPT: 16, SYNTH: 6.9952966958975455 },
    { UWI: '', DEPT: 16.5, SYNTH: 6.215067958948919 },
    { UWI: '', DEPT: 17, SYNTH: 6.216229106804464 },
    { UWI: '', DEPT: 17.5, SYNTH: 6.578506807255792 },
    { UWI: '', DEPT: 18, SYNTH: 6.4063916132066305 },
    { UWI: '', DEPT: 18.5, SYNTH: 6.834066583041462 },
    { UWI: '', DEPT: 19, SYNTH: 7.074548678838579 },
    { UWI: '', DEPT: 19.5, SYNTH: 7.434101159592576 },
    { UWI: '', DEPT: 20, SYNTH: 6.813692875131577 },
    { UWI: '', DEPT: 20.5, SYNTH: 7.124467278648008 },
    { UWI: '', DEPT: 21, SYNTH: 7.305891281079443 },
    { UWI: '', DEPT: 21.5, SYNTH: 6.8548440372284425 },
    { UWI: '', DEPT: 22, SYNTH: 7.187425208744087 },
    { UWI: '', DEPT: 22.5, SYNTH: 7.614504283784063 },
    { UWI: '', DEPT: 23, SYNTH: 7.400538301687238 },
    { UWI: '', DEPT: 23.5, SYNTH: 7.634951335964951 },
    { UWI: '', DEPT: 24, SYNTH: 7.1591613220416885 },
    { UWI: '', DEPT: 24.5, SYNTH: 7.24660033345942 },
    { UWI: '', DEPT: 25, SYNTH: 7.857618563408799 },
    { UWI: '', DEPT: 25.5, SYNTH: 7.216432694478079 },
    { UWI: '', DEPT: 26, SYNTH: 7.936601694712575 },
    { UWI: '', DEPT: 26.5, SYNTH: 7.875392325565011 },
    { UWI: '', DEPT: 27, SYNTH: 7.846522098205257 },
    { UWI: '', DEPT: 27.5, SYNTH: 7.961055735523032 },
    { UWI: '', DEPT: 28, SYNTH: 7.9875444534185265 },
    { UWI: '', DEPT: 28.5, SYNTH: 7.682651775215826 },
    { UWI: '', DEPT: 29, SYNTH: 8.263217826161247 },
    { UWI: '', DEPT: 29.5, SYNTH: 7.428245570191011 },
    { UWI: '', DEPT: 30, SYNTH: 7.458552722300149 },
    { UWI: '', DEPT: 30.5, SYNTH: 7.673507182326855 },
    { UWI: '', DEPT: 31, SYNTH: 8.133879671159866 },
    { UWI: '', DEPT: 31.5, SYNTH: 8.012507192488785 },
    { UWI: '', DEPT: 32, SYNTH: 7.908945798159758 },
    { UWI: '', DEPT: 32.5, SYNTH: 8.54491362181899 },
    { UWI: '', DEPT: 33, SYNTH: 8.376826166395343 },
    { UWI: '', DEPT: 33.5, SYNTH: 8.521367058238015 },
    { UWI: '', DEPT: 34, SYNTH: 7.869488464355213 },
    { UWI: '', DEPT: 34.5, SYNTH: 8.540819991711249 },
    { UWI: '', DEPT: 35, SYNTH: 7.747693920723054 },
    { UWI: '', DEPT: 35.5, SYNTH: 7.76482594561203 },
    { UWI: '', DEPT: 36, SYNTH: 8.28587927242152 },
    { UWI: '', DEPT: 36.5, SYNTH: 8.728442160706201 },
    { UWI: '', DEPT: 37, SYNTH: 8.151644609626715 },
    { UWI: '', DEPT: 37.5, SYNTH: 8.006276115555549 },
    { UWI: '', DEPT: 38, SYNTH: 8.281930061984767 },
    { UWI: '', DEPT: 38.5, SYNTH: 8.766240213463439 },
    { UWI: '', DEPT: 39, SYNTH: 8.319394583040257 },
    { UWI: '', DEPT: 39.5, SYNTH: 8.489786177815033 },
    { UWI: '', DEPT: 40, SYNTH: 8.146427144422542 },
    { UWI: '', DEPT: 40.5, SYNTH: 8.844022951417106 },
    { UWI: '', DEPT: 41, SYNTH: 9.03420857345524 },
    { UWI: '', DEPT: 41.5, SYNTH: 8.576113379003877 },
    { UWI: '', DEPT: 42, SYNTH: 8.847766779137505 },
    { UWI: '', DEPT: 42.5, SYNTH: 8.862173511651742 },
    { UWI: '', DEPT: 43, SYNTH: 8.268354623317148 },
    { UWI: '', DEPT: 43.5, SYNTH: 8.66131564127789 },
    { UWI: '', DEPT: 44, SYNTH: 8.220744002754165 },
    { UWI: '', DEPT: 44.5, SYNTH: 9.16311245034184 },
    { UWI: '', DEPT: 45, SYNTH: 9.001221866547048 },
    { UWI: '', DEPT: 45.5, SYNTH: 8.736589896026489 },
    { UWI: '', DEPT: 46, SYNTH: 9.19890130952019 },
    { UWI: '', DEPT: 46.5, SYNTH: 8.501797698154366 },
    { UWI: '', DEPT: 47, SYNTH: 8.407307072785272 },
    { UWI: '', DEPT: 47.5, SYNTH: 8.790066454256026 },
    { UWI: '', DEPT: 48, SYNTH: 8.795004229881293 },
    { UWI: '', DEPT: 48.5, SYNTH: 8.43386447378256 },
    { UWI: '', DEPT: 49, SYNTH: 9.102603234862638 },
    { UWI: '', DEPT: 49.5, SYNTH: 8.508067459270954 }
    ],
    curve_names: [ 'DEPT', 'SYNTH' ],
    uwi: ''
    }


#### Example 2: Write Lasio json to file, then get current path and read the created json file into wellio json


```python
las_json_dict =json.loads(json_images)
with open('data.json', 'w') as outfile:
    json.dump(las_json_dict, outfile)
```


```python
%%node
const path = require('path');
let mydir = process.env.PWD;
let myfile = mydir + path.sep + 'data.json';

let lasio_json_str = '';
let lasio_obj_2 = '';
let wellio_obj_2 = '';

try {
    lasio_json_str = wellio.read_lasio_json_file(myfile);
    lasio_obj_2 = JSON.parse(lasio_json_str);
    wellio_obj_2 = wellio.lasio_obj_2_wellio_obj(lasio_obj_2);
} catch (e) {
    console.log('[');
    console.log(e.name + ":: " + e.message);
    console.log(']');
}

console.log(wellio_obj_2);

```

    Uncaught
    Uncaught
    Uncaught
    Uncaught
    Uncaught
    Uncaught
    ... ... ... ... ... ... ... ...
    {
    'VERSION INFORMATION': {
    VERS: {
    MNEM: 'VERS',
    UNIT: '',
    DATA: 2,
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    WRAP: {
    MNEM: 'WRAP',
    UNIT: '',
    DATA: 'NO',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    DLM: {
    MNEM: 'DLM',
    UNIT: '',
    DATA: 'SPACE',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    }
    },
    'WELL INFORMATION BLOCK': {
    STRT: {
    MNEM: 'STRT',
    UNIT: '',
    DATA: 10,
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    STOP: {
    MNEM: 'STOP',
    UNIT: '',
    DATA: 49.5,
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    STEP: {
    MNEM: 'STEP',
    UNIT: '',
    DATA: 0.5,
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    NULL: {
    MNEM: 'NULL',
    UNIT: '',
    DATA: -9999.25,
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    COMP: {
    MNEM: 'COMP',
    UNIT: '',
    DATA: '',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    WELL: {
    MNEM: 'WELL',
    UNIT: '',
    DATA: '',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    FLD: {
    MNEM: 'FLD',
    UNIT: '',
    DATA: '',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    LOC: {
    MNEM: 'LOC',
    UNIT: '',
    DATA: '',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    PROV: {
    MNEM: 'PROV',
    UNIT: '',
    DATA: '',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    CNTY: {
    MNEM: 'CNTY',
    UNIT: '',
    DATA: '',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    STAT: {
    MNEM: 'STAT',
    UNIT: '',
    DATA: '',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    CTRY: {
    MNEM: 'CTRY',
    UNIT: '',
    DATA: '',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    SRVC: {
    MNEM: 'SRVC',
    UNIT: '',
    DATA: '',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    DATE: {
    MNEM: 'DATE',
    UNIT: '',
    DATA: '2020-04-02 10:33:34',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    UWI: {
    MNEM: 'UWI',
    UNIT: '',
    DATA: '',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    API: {
    MNEM: 'API',
    UNIT: '',
    DATA: '',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    }
    },
    'CURVE INFORMATION BLOCK': {
    DEPT: {
    MNEM: 'DEPT',
    UNIT: '',
    DATA: '',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    SYNTH: {
    MNEM: 'SYNTH',
    UNIT: '',
    DATA: '',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    }
    },
    'PARAMETER INFORMATION': {
    ENG: {
    MNEM: 'ENG',
    UNIT: '',
    DATA: 'Kent Inverarity',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    },
    LMF: {
    MNEM: 'LMF',
    UNIT: '',
    DATA: 'GL',
    'DESCRIPTION OF MNEMONIC 1': '',
    'DESCRIPTION OF MNEMONIC 2': ''
    }
    },
    CURVES: {
    DEPT: [
    10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5,
    15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5,
    20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5,
    25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5,
    30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34, 34.5,
    35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5,
    40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5,
    45, 45.5, 46, 46.5, 47, 47.5, 48, 48.5, 49, 49.5
    ],
    SYNTH: [
    null,               null,               null,
    null,               null,               null,
    null,               null,               6.656126216525917,
    6.679133697708385,  6.568704369178376,  6.6972674302176,
    6.9952966958975455, 6.215067958948919,  6.216229106804464,
    6.578506807255792,  6.4063916132066305, 6.834066583041462,
    7.074548678838579,  7.434101159592576,  6.813692875131577,
    7.124467278648008,  7.305891281079443,  6.8548440372284425,
    7.187425208744087,  7.614504283784063,  7.400538301687238,
    7.634951335964951,  7.1591613220416885, 7.24660033345942,
    7.857618563408799,  7.216432694478079,  7.936601694712575,
    7.875392325565011,  7.846522098205257,  7.961055735523032,
    7.9875444534185265, 7.682651775215826,  8.263217826161247,
    7.428245570191011,  7.458552722300149,  7.673507182326855,
    8.133879671159866,  8.012507192488785,  7.908945798159758,
    8.54491362181899,   8.376826166395343,  8.521367058238015,
    7.869488464355213,  8.540819991711249,  7.747693920723054,
    7.76482594561203,   8.28587927242152,   8.728442160706201,
    8.151644609626715,  8.006276115555549,  8.281930061984767,
    8.766240213463439,  8.319394583040257,  8.489786177815033,
    8.146427144422542,  8.844022951417106,  9.03420857345524,
    8.576113379003877,  8.847766779137505,  8.862173511651742,
    8.268354623317148,  8.66131564127789,   8.220744002754165,
    9.16311245034184,   9.001221866547048,  8.736589896026489,
    9.19890130952019,   8.501797698154366,  8.407307072785272,
    8.790066454256026,  8.795004229881293,  8.43386447378256,
    9.102603234862638,  8.508067459270954
    ]
    },
    OTHER: 'Example of how to create a LAS file from scratch using lasio'
    }


#### Example 3: Read created Lasio Las file


```python
%%node
three_things_2 = wellioviz.fromJSONofWEllGetThingsForPlotting(wellio_obj,"DEPT");
console.log(three_things_2);
```

    {
    well_log_curves_reformatted_for_d3: [
    { UWI: '', DEPT: 10, SYNTH: NaN },
    { UWI: '', DEPT: 10.5, SYNTH: NaN },
    { UWI: '', DEPT: 11, SYNTH: NaN },
    { UWI: '', DEPT: 11.5, SYNTH: NaN },
    { UWI: '', DEPT: 12, SYNTH: NaN },
    { UWI: '', DEPT: 12.5, SYNTH: NaN },
    { UWI: '', DEPT: 13, SYNTH: NaN },
    { UWI: '', DEPT: 13.5, SYNTH: NaN },
    { UWI: '', DEPT: 14, SYNTH: 6.656126216525917 },
    { UWI: '', DEPT: 14.5, SYNTH: 6.679133697708385 },
    { UWI: '', DEPT: 15, SYNTH: 6.568704369178376 },
    { UWI: '', DEPT: 15.5, SYNTH: 6.6972674302176 },
    { UWI: '', DEPT: 16, SYNTH: 6.9952966958975455 },
    { UWI: '', DEPT: 16.5, SYNTH: 6.215067958948919 },
    { UWI: '', DEPT: 17, SYNTH: 6.216229106804464 },
    { UWI: '', DEPT: 17.5, SYNTH: 6.578506807255792 },
    { UWI: '', DEPT: 18, SYNTH: 6.4063916132066305 },
    { UWI: '', DEPT: 18.5, SYNTH: 6.834066583041462 },
    { UWI: '', DEPT: 19, SYNTH: 7.074548678838579 },
    { UWI: '', DEPT: 19.5, SYNTH: 7.434101159592576 },
    { UWI: '', DEPT: 20, SYNTH: 6.813692875131577 },
    { UWI: '', DEPT: 20.5, SYNTH: 7.124467278648008 },
    { UWI: '', DEPT: 21, SYNTH: 7.305891281079443 },
    { UWI: '', DEPT: 21.5, SYNTH: 6.8548440372284425 },
    { UWI: '', DEPT: 22, SYNTH: 7.187425208744087 },
    { UWI: '', DEPT: 22.5, SYNTH: 7.614504283784063 },
    { UWI: '', DEPT: 23, SYNTH: 7.400538301687238 },
    { UWI: '', DEPT: 23.5, SYNTH: 7.634951335964951 },
    { UWI: '', DEPT: 24, SYNTH: 7.1591613220416885 },
    { UWI: '', DEPT: 24.5, SYNTH: 7.24660033345942 },
    { UWI: '', DEPT: 25, SYNTH: 7.857618563408799 },
    { UWI: '', DEPT: 25.5, SYNTH: 7.216432694478079 },
    { UWI: '', DEPT: 26, SYNTH: 7.936601694712575 },
    { UWI: '', DEPT: 26.5, SYNTH: 7.875392325565011 },
    { UWI: '', DEPT: 27, SYNTH: 7.846522098205257 },
    { UWI: '', DEPT: 27.5, SYNTH: 7.961055735523032 },
    { UWI: '', DEPT: 28, SYNTH: 7.9875444534185265 },
    { UWI: '', DEPT: 28.5, SYNTH: 7.682651775215826 },
    { UWI: '', DEPT: 29, SYNTH: 8.263217826161247 },
    { UWI: '', DEPT: 29.5, SYNTH: 7.428245570191011 },
    { UWI: '', DEPT: 30, SYNTH: 7.458552722300149 },
    { UWI: '', DEPT: 30.5, SYNTH: 7.673507182326855 },
    { UWI: '', DEPT: 31, SYNTH: 8.133879671159866 },
    { UWI: '', DEPT: 31.5, SYNTH: 8.012507192488785 },
    { UWI: '', DEPT: 32, SYNTH: 7.908945798159758 },
    { UWI: '', DEPT: 32.5, SYNTH: 8.54491362181899 },
    { UWI: '', DEPT: 33, SYNTH: 8.376826166395343 },
    { UWI: '', DEPT: 33.5, SYNTH: 8.521367058238015 },
    { UWI: '', DEPT: 34, SYNTH: 7.869488464355213 },
    { UWI: '', DEPT: 34.5, SYNTH: 8.540819991711249 },
    { UWI: '', DEPT: 35, SYNTH: 7.747693920723054 },
    { UWI: '', DEPT: 35.5, SYNTH: 7.76482594561203 },
    { UWI: '', DEPT: 36, SYNTH: 8.28587927242152 },
    { UWI: '', DEPT: 36.5, SYNTH: 8.728442160706201 },
    { UWI: '', DEPT: 37, SYNTH: 8.151644609626715 },
    { UWI: '', DEPT: 37.5, SYNTH: 8.006276115555549 },
    { UWI: '', DEPT: 38, SYNTH: 8.281930061984767 },
    { UWI: '', DEPT: 38.5, SYNTH: 8.766240213463439 },
    { UWI: '', DEPT: 39, SYNTH: 8.319394583040257 },
    { UWI: '', DEPT: 39.5, SYNTH: 8.489786177815033 },
    { UWI: '', DEPT: 40, SYNTH: 8.146427144422542 },
    { UWI: '', DEPT: 40.5, SYNTH: 8.844022951417106 },
    { UWI: '', DEPT: 41, SYNTH: 9.03420857345524 },
    { UWI: '', DEPT: 41.5, SYNTH: 8.576113379003877 },
    { UWI: '', DEPT: 42, SYNTH: 8.847766779137505 },
    { UWI: '', DEPT: 42.5, SYNTH: 8.862173511651742 },
    { UWI: '', DEPT: 43, SYNTH: 8.268354623317148 },
    { UWI: '', DEPT: 43.5, SYNTH: 8.66131564127789 },
    { UWI: '', DEPT: 44, SYNTH: 8.220744002754165 },
    { UWI: '', DEPT: 44.5, SYNTH: 9.16311245034184 },
    { UWI: '', DEPT: 45, SYNTH: 9.001221866547048 },
    { UWI: '', DEPT: 45.5, SYNTH: 8.736589896026489 },
    { UWI: '', DEPT: 46, SYNTH: 9.19890130952019 },
    { UWI: '', DEPT: 46.5, SYNTH: 8.501797698154366 },
    { UWI: '', DEPT: 47, SYNTH: 8.407307072785272 },
    { UWI: '', DEPT: 47.5, SYNTH: 8.790066454256026 },
    { UWI: '', DEPT: 48, SYNTH: 8.795004229881293 },
    { UWI: '', DEPT: 48.5, SYNTH: 8.43386447378256 },
    { UWI: '', DEPT: 49, SYNTH: 9.102603234862638 },
    { UWI: '', DEPT: 49.5, SYNTH: 8.508067459270954 }
    ],
    curve_names: [ 'DEPT', 'SYNTH' ],
    uwi: ''
    }



```python
%%node
const path = require('path');
let mydir_3 = process.env.PWD;
let myfile_3 = mydir + path.sep + 'scratch_v2.las';

let las_str_3 = '';
let wellio_obj_3 = '';

try {
    las_str_3 = wellio.loadLAS(myfile_3);

    wellio_obj_3 = wellio.las2json(las_str_3);
} catch (e) {
    console.log('[');
    console.log(e.name + ":: " + e.message);
    console.log(']');
}

console.log(wellio_obj_3);


```

    Uncaught
    Uncaught
    Uncaught
    Uncaught
    Uncaught
    ... ... ... ... ... ... ... ... onelas =  ~Version ---------------------------------------------------
    VERS.   2.0 : CWLS log ASCII Standard -VERSION 2.0
    WRAP.    NO : One line per depth step
    DLM . SPACE : Column Data Section Delimiter
    ~Well ------------------------------------------------------
    STRT.m               10.0 : START DEPTH
    STOP.m               49.5 : STOP DEPTH
    STEP.m                0.5 : STEP
    NULL.            -9999.25 : NULL VALUE
    COMP.                     : COMPANY
    WELL.                     : WELL
    FLD .                     : FIELD
    LOC .                     : LOCATION
    PROV.                     : PROVINCE
    CNTY.                     : COUNTY
    STAT.                     : STATE
    CTRY.                     : COUNTRY
    SRVC.                     : SERVICE COMPANY
    DATE. 2020-04-02 10:33:34 : DATE
    UWI .                     : UNIQUE WELL ID
    API .                     : API NUMBER
    ~Curve Information -----------------------------------------
    DEPT .m  :
    SYNTH.   : fake data
    ~Params ----------------------------------------------------
    ENG. Kent Inverarity :
    LMF.              GL :
    ~Other -----------------------------------------------------
    Example of how to create a LAS file from scratch using lasio
    ~ASCII -----------------------------------------------------
    10.00000   -9999.25
    10.50000   -9999.25
    11.00000   -9999.25
    11.50000   -9999.25
    12.00000   -9999.25
    12.50000   -9999.25
    13.00000   -9999.25
    13.50000   -9999.25
    14.00000    6.65613
    14.50000    6.67913
    15.00000    6.56870
    15.50000    6.69727
    16.00000    6.99530
    16.50000    6.21507
    17.00000    6.21623
    17.50000    6.57851
    18.00000    6.40639
    18.50000    6.83407
    19.00000    7.07455
    19.50000    7.43410
    20.00000    6.81369
    20.50000    7.12447
    21.00000    7.30589
    21.50000    6.85484
    22.00000    7.18743
    22.50000    7.61450
    23.00000    7.40054
    23.50000    7.63495
    24.00000    7.15916
    24.50000    7.24660
    25.00000    7.85762
    25.50000    7.21643
    26.00000    7.93660
    26.50000    7.87539
    27.00000    7.84652
    27.50000    7.96106
    28.00000    7.98754
    28.50000    7.68265
    29.00000    8.26322
    29.50000    7.42825
    30.00000    7.45855
    30.50000    7.67351
    31.00000    8.13388
    31.50000    8.01251
    32.00000    7.90895
    32.50000    8.54491
    33.00000    8.37683
    33.50000    8.52137
    34.00000    7.86949
    34.50000    8.54082
    35.00000    7.74769
    35.50000    7.76483
    36.00000    8.28588
    36.50000    8.72844
    37.00000    8.15164
    37.50000    8.00628
    38.00000    8.28193
    38.50000    8.76624
    39.00000    8.31939
    39.50000    8.48979
    40.00000    8.14643
    40.50000    8.84402
    41.00000    9.03421
    41.50000    8.57611
    42.00000    8.84777
    42.50000    8.86217
    43.00000    8.26835
    43.50000    8.66132
    44.00000    8.22074
    44.50000    9.16311
    45.00000    9.00122
    45.50000    8.73659
    46.00000    9.19890
    46.50000    8.50180
    47.00000    8.40731
    47.50000    8.79007
    48.00000    8.79500
    48.50000    8.43386
    49.00000    9.10260
    49.50000    8.50807
    split1 =  [
    '',
    '~Version ---------------------------------------------------\n' +
    'VERS.   2.0 : CWLS log ASCII Standard -VERSION 2.0\n' +
    'WRAP.    NO : One line per depth step\n' +
    'DLM . SPACE : Column Data Section Delimiter\n',
    '',
    '~Well ------------------------------------------------------\n' +
    'STRT.m               10.0 : START DEPTH\n' +
    'STOP.m               49.5 : STOP DEPTH\n' +
    'STEP.m                0.5 : STEP\n' +
    'NULL.            -9999.25 : NULL VALUE\n' +
    'COMP.                     : COMPANY\n' +
    'WELL.                     : WELL\n' +
    'FLD .                     : FIELD\n' +
    'LOC .                     : LOCATION\n' +
    'PROV.                     : PROVINCE\n' +
    'CNTY.                     : COUNTY\n' +
    'STAT.                     : STATE\n' +
    'CTRY.                     : COUNTRY\n' +
    'SRVC.                     : SERVICE COMPANY\n' +
    'DATE. 2020-04-02 10:33:34 : DATE\n' +
    'UWI .                     : UNIQUE WELL ID\n' +
    'API .                     : API NUMBER\n',
    '',
    '~Curve Information -----------------------------------------\n' +
    'DEPT .m  : \n' +
    'SYNTH.   : fake data\n',
    '',
    '~Params ----------------------------------------------------\n' +
    'ENG. Kent Inverarity : \n' +
    'LMF.              GL : \n',
    '',
    '~Other -----------------------------------------------------\n' +
    'Example of how to create a LAS file from scratch using lasio\n',
    '',
    '~ASCII -----------------------------------------------------\n' +
    '   10.00000   -9999.25\n' +
    '   10.50000   -9999.25\n' +
    '   11.00000   -9999.25\n' +
    '   11.50000   -9999.25\n' +
    '   12.00000   -9999.25\n' +
    '   12.50000   -9999.25\n' +
    '   13.00000   -9999.25\n' +
    '   13.50000   -9999.25\n' +
    '   14.00000    6.65613\n' +
    '   14.50000    6.67913\n' +
    '   15.00000    6.56870\n' +
    '   15.50000    6.69727\n' +
    '   16.00000    6.99530\n' +
    '   16.50000    6.21507\n' +
    '   17.00000    6.21623\n' +
    '   17.50000    6.57851\n' +
    '   18.00000    6.40639\n' +
    '   18.50000    6.83407\n' +
    '   19.00000    7.07455\n' +
    '   19.50000    7.43410\n' +
    '   20.00000    6.81369\n' +
    '   20.50000    7.12447\n' +
    '   21.00000    7.30589\n' +
    '   21.50000    6.85484\n' +
    '   22.00000    7.18743\n' +
    '   22.50000    7.61450\n' +
    '   23.00000    7.40054\n' +
    '   23.50000    7.63495\n' +
    '   24.00000    7.15916\n' +
    '   24.50000    7.24660\n' +
    '   25.00000    7.85762\n' +
    '   25.50000    7.21643\n' +
    '   26.00000    7.93660\n' +
    '   26.50000    7.87539\n' +
    '   27.00000    7.84652\n' +
    '   27.50000    7.96106\n' +
    '   28.00000    7.98754\n' +
    '   28.50000    7.68265\n' +
    '   29.00000    8.26322\n' +
    '   29.50000    7.42825\n' +
    '   30.00000    7.45855\n' +
    '   30.50000    7.67351\n' +
    '   31.00000    8.13388\n' +
    '   31.50000    8.01251\n' +
    '   32.00000    7.90895\n' +
    '   32.50000    8.54491\n' +
    '   33.00000    8.37683\n' +
    '   33.50000    8.52137\n' +
    '   34.00000    7.86949\n' +
    '   34.50000    8.54082\n' +
    '   35.00000    7.74769\n' +
    '   35.50000    7.76483\n' +
    '   36.00000    8.28588\n' +
    '   36.50000    8.72844\n' +
    '   37.00000    8.15164\n' +
    '   37.50000    8.00628\n' +
    '   38.00000    8.28193\n' +
    '   38.50000    8.76624\n' +
    '   39.00000    8.31939\n' +
    '   39.50000    8.48979\n' +
    '   40.00000    8.14643\n' +
    '   40.50000    8.84402\n' +
    '   41.00000    9.03421\n' +
    '   41.50000    8.57611\n' +
    '   42.00000    8.84777\n' +
    '   42.50000    8.86217\n' +
    '   43.00000    8.26835\n' +
    '   43.50000    8.66132\n' +
    '   44.00000    8.22074\n' +
    '   44.50000    9.16311\n' +
    '   45.00000    9.00122\n' +
    '   45.50000    8.73659\n' +
    '   46.00000    9.19890\n' +
    '   46.50000    8.50180\n' +
    '   47.00000    8.40731\n' +
    '   47.50000    8.79007\n' +
    '   48.00000    8.79500\n' +
    '   48.50000    8.43386\n' +
    '   49.00000    9.10260\n' +
    '   49.50000    8.50807\n',
    ''
    ]
    [
    TypeError:: Cannot read property 'trim' of undefined
    ]



```python
%%node
three_things_3 = wellioviz.fromJSONofWEllGetThingsForPlotting(wellio_obj,"DEPT");
console.log(three_things_3);
```

    {
    well_log_curves_reformatted_for_d3: [
    { UWI: '', DEPT: 10, SYNTH: NaN },
    { UWI: '', DEPT: 10.5, SYNTH: NaN },
    { UWI: '', DEPT: 11, SYNTH: NaN },
    { UWI: '', DEPT: 11.5, SYNTH: NaN },
    { UWI: '', DEPT: 12, SYNTH: NaN },
    { UWI: '', DEPT: 12.5, SYNTH: NaN },
    { UWI: '', DEPT: 13, SYNTH: NaN },
    { UWI: '', DEPT: 13.5, SYNTH: NaN },
    { UWI: '', DEPT: 14, SYNTH: 6.656126216525917 },
    { UWI: '', DEPT: 14.5, SYNTH: 6.679133697708385 },
    { UWI: '', DEPT: 15, SYNTH: 6.568704369178376 },
    { UWI: '', DEPT: 15.5, SYNTH: 6.6972674302176 },
    { UWI: '', DEPT: 16, SYNTH: 6.9952966958975455 },
    { UWI: '', DEPT: 16.5, SYNTH: 6.215067958948919 },
    { UWI: '', DEPT: 17, SYNTH: 6.216229106804464 },
    { UWI: '', DEPT: 17.5, SYNTH: 6.578506807255792 },
    { UWI: '', DEPT: 18, SYNTH: 6.4063916132066305 },
    { UWI: '', DEPT: 18.5, SYNTH: 6.834066583041462 },
    { UWI: '', DEPT: 19, SYNTH: 7.074548678838579 },
    { UWI: '', DEPT: 19.5, SYNTH: 7.434101159592576 },
    { UWI: '', DEPT: 20, SYNTH: 6.813692875131577 },
    { UWI: '', DEPT: 20.5, SYNTH: 7.124467278648008 },
    { UWI: '', DEPT: 21, SYNTH: 7.305891281079443 },
    { UWI: '', DEPT: 21.5, SYNTH: 6.8548440372284425 },
    { UWI: '', DEPT: 22, SYNTH: 7.187425208744087 },
    { UWI: '', DEPT: 22.5, SYNTH: 7.614504283784063 },
    { UWI: '', DEPT: 23, SYNTH: 7.400538301687238 },
    { UWI: '', DEPT: 23.5, SYNTH: 7.634951335964951 },
    { UWI: '', DEPT: 24, SYNTH: 7.1591613220416885 },
    { UWI: '', DEPT: 24.5, SYNTH: 7.24660033345942 },
    { UWI: '', DEPT: 25, SYNTH: 7.857618563408799 },
    { UWI: '', DEPT: 25.5, SYNTH: 7.216432694478079 },
    { UWI: '', DEPT: 26, SYNTH: 7.936601694712575 },
    { UWI: '', DEPT: 26.5, SYNTH: 7.875392325565011 },
    { UWI: '', DEPT: 27, SYNTH: 7.846522098205257 },
    { UWI: '', DEPT: 27.5, SYNTH: 7.961055735523032 },
    { UWI: '', DEPT: 28, SYNTH: 7.9875444534185265 },
    { UWI: '', DEPT: 28.5, SYNTH: 7.682651775215826 },
    { UWI: '', DEPT: 29, SYNTH: 8.263217826161247 },
    { UWI: '', DEPT: 29.5, SYNTH: 7.428245570191011 },
    { UWI: '', DEPT: 30, SYNTH: 7.458552722300149 },
    { UWI: '', DEPT: 30.5, SYNTH: 7.673507182326855 },
    { UWI: '', DEPT: 31, SYNTH: 8.133879671159866 },
    { UWI: '', DEPT: 31.5, SYNTH: 8.012507192488785 },
    { UWI: '', DEPT: 32, SYNTH: 7.908945798159758 },
    { UWI: '', DEPT: 32.5, SYNTH: 8.54491362181899 },
    { UWI: '', DEPT: 33, SYNTH: 8.376826166395343 },
    { UWI: '', DEPT: 33.5, SYNTH: 8.521367058238015 },
    { UWI: '', DEPT: 34, SYNTH: 7.869488464355213 },
    { UWI: '', DEPT: 34.5, SYNTH: 8.540819991711249 },
    { UWI: '', DEPT: 35, SYNTH: 7.747693920723054 },
    { UWI: '', DEPT: 35.5, SYNTH: 7.76482594561203 },
    { UWI: '', DEPT: 36, SYNTH: 8.28587927242152 },
    { UWI: '', DEPT: 36.5, SYNTH: 8.728442160706201 },
    { UWI: '', DEPT: 37, SYNTH: 8.151644609626715 },
    { UWI: '', DEPT: 37.5, SYNTH: 8.006276115555549 },
    { UWI: '', DEPT: 38, SYNTH: 8.281930061984767 },
    { UWI: '', DEPT: 38.5, SYNTH: 8.766240213463439 },
    { UWI: '', DEPT: 39, SYNTH: 8.319394583040257 },
    { UWI: '', DEPT: 39.5, SYNTH: 8.489786177815033 },
    { UWI: '', DEPT: 40, SYNTH: 8.146427144422542 },
    { UWI: '', DEPT: 40.5, SYNTH: 8.844022951417106 },
    { UWI: '', DEPT: 41, SYNTH: 9.03420857345524 },
    { UWI: '', DEPT: 41.5, SYNTH: 8.576113379003877 },
    { UWI: '', DEPT: 42, SYNTH: 8.847766779137505 },
    { UWI: '', DEPT: 42.5, SYNTH: 8.862173511651742 },
    { UWI: '', DEPT: 43, SYNTH: 8.268354623317148 },
    { UWI: '', DEPT: 43.5, SYNTH: 8.66131564127789 },
    { UWI: '', DEPT: 44, SYNTH: 8.220744002754165 },
    { UWI: '', DEPT: 44.5, SYNTH: 9.16311245034184 },
    { UWI: '', DEPT: 45, SYNTH: 9.001221866547048 },
    { UWI: '', DEPT: 45.5, SYNTH: 8.736589896026489 },
    { UWI: '', DEPT: 46, SYNTH: 9.19890130952019 },
    { UWI: '', DEPT: 46.5, SYNTH: 8.501797698154366 },
    { UWI: '', DEPT: 47, SYNTH: 8.407307072785272 },
    { UWI: '', DEPT: 47.5, SYNTH: 8.790066454256026 },
    { UWI: '', DEPT: 48, SYNTH: 8.795004229881293 },
    { UWI: '', DEPT: 48.5, SYNTH: 8.43386447378256 },
    { UWI: '', DEPT: 49, SYNTH: 9.102603234862638 },
    { UWI: '', DEPT: 49.5, SYNTH: 8.508067459270954 }
    ],
    curve_names: [ 'DEPT', 'SYNTH' ],
    uwi: ''
    }

