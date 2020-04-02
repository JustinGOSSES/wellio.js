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

    Pixiedust database opened successfully




<div style="margin:10px">
    <a href="https://github.com/ibm-watson-data-lab/pixiedust" target="_new">
        <img src="https://github.com/ibm-watson-data-lab/pixiedust/raw/master/docs/_static/pd_icon32.png" style="float:left;margin-right:10px"/>
    </a>
    <span>Pixiedust version 1.1.18</span>
</div>



    Unable to check latest version <urlopen error [Errno 8] nodename nor servname provided, or not known>




<div style="margin:10px"> 
<a href="https://github.com/ibm-cds-labs/pixiedust_node" target="_new"> 
<img src="https://github.com/ibm-cds-labs/pixiedust_node/raw/master/docs/_images/pdn_icon32.png" style="float:left;margin-right:10px"/> 
</a> 
<span>Pixiedust Node.js</span> 
</div> 



    pixiedust_node 0.2.5 started. Cells starting '%%node' may contain Node.js code.



```python
%%node
const wellio = require('wellio');
const wellioviz = require('wellioviz')
```

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
let lasio_obj_2 = '';
let wellio_obj_2 = '';

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
    DATA: '2020-04-02 04:27:25',
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
    null,               null,               6.2809764008568605,
    6.532057591922343,  5.941418574216999,  6.510096092865318,
    6.9220692325837,    6.472297221835048,  6.266526996652127,
    6.426148580981927,  7.048883504950486,  6.392724619869405,
    7.2067183720035475, 7.393163848991268,  7.164652421809106,
    6.974550733818363,  7.101184068253783,  6.8525783776513665,
    7.541545390015894,  7.436432709894154,  6.836662743032315,
    7.06091599211232,   7.303699679120454,  7.8037380977586706,
    7.931038808078371,  7.6215640155788025, 7.537968283552406,
    7.724943570854417,  7.231199362320828,  7.633098967866403,
    7.475786328315787,  7.312320341845188,  8.149912696122508,
    7.637795755929797,  8.23300445662301,   7.773270505562313,
    8.45011084543318,   7.822308534824677,  7.913506405921916,
    8.428213904784757,  7.873963615619421,  8.318895384342282,
    7.713787275224617,  7.935335833763701,  8.260577431999204,
    8.34180653401266,   8.344723604139427,  7.898263975036974,
    8.786489725341273,  8.866210275889168,  8.024321404897696,
    8.465436371781063,  8.032389154302193,  8.154506976715538,
    8.180920991585955,  8.577627379526891,  8.317009238435968,
    8.53235587831235,   8.731776311752975,  8.290341738179652,
    8.70406369797657,   8.816724760721584,  9.04338062086612,
    8.638051789139276,  8.817460232795039,  8.709004103406253,
    8.913203129279587,  8.57866101870139,   9.17198080601366,
    8.616914299754516,  8.582476321390612,  9.01335376557604,
    9.207471005947662,  8.947064278096674
    ]
    },
    OTHER: 'Example of how to create a LAS file from scratch using lasio'
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
let lasio_obj = '';
let wellio_obj = '';

try {
    lasio_json_str = wellio.read_lasio_json_file(myfile);
    lasio_obj = JSON.parse(lasio_json_str);
    wellio_obj = wellio.lasio_obj_2_wellio_obj(lasio_obj);
} catch (e) {
    console.log('[');
    console.log(e.name + ":: " + e.message);
    console.log(']');
}

console.log(wellio_obj);

```

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
    DATA: '2020-04-02 04:27:25',
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
    null,               null,               6.2809764008568605,
    6.532057591922343,  5.941418574216999,  6.510096092865318,
    6.9220692325837,    6.472297221835048,  6.266526996652127,
    6.426148580981927,  7.048883504950486,  6.392724619869405,
    7.2067183720035475, 7.393163848991268,  7.164652421809106,
    6.974550733818363,  7.101184068253783,  6.8525783776513665,
    7.541545390015894,  7.436432709894154,  6.836662743032315,
    7.06091599211232,   7.303699679120454,  7.8037380977586706,
    7.931038808078371,  7.6215640155788025, 7.537968283552406,
    7.724943570854417,  7.231199362320828,  7.633098967866403,
    7.475786328315787,  7.312320341845188,  8.149912696122508,
    7.637795755929797,  8.23300445662301,   7.773270505562313,
    8.45011084543318,   7.822308534824677,  7.913506405921916,
    8.428213904784757,  7.873963615619421,  8.318895384342282,
    7.713787275224617,  7.935335833763701,  8.260577431999204,
    8.34180653401266,   8.344723604139427,  7.898263975036974,
    8.786489725341273,  8.866210275889168,  8.024321404897696,
    8.465436371781063,  8.032389154302193,  8.154506976715538,
    8.180920991585955,  8.577627379526891,  8.317009238435968,
    8.53235587831235,   8.731776311752975,  8.290341738179652,
    8.70406369797657,   8.816724760721584,  9.04338062086612,
    8.638051789139276,  8.817460232795039,  8.709004103406253,
    8.913203129279587,  8.57866101870139,   9.17198080601366,
    8.616914299754516,  8.582476321390612,  9.01335376557604,
    9.207471005947662,  8.947064278096674
    ]
    },
    OTHER: 'Example of how to create a LAS file from scratch using lasio'
    }


#### Example 3: Read created Lasio Las file


```python
%%node
const path = require('path');
let mydir_2 = process.env.PWD;
let myfile_2 = mydir + path.sep + 'scratch_v2.las';

let lasio_json_str_3 = '';
let lasio_obj_3 = '';
let wellio_obj_3 = '';

try {
    lasio_json_str = wellio.read_lasio_json_file(myfile);
    lasio_obj = JSON.parse(lasio_json_str);
    wellio_obj = wellio.lasio_obj_2_wellio_obj(lasio_obj);
} catch (e) {
    console.log('[');
    console.log(e.name + ":: " + e.message);
    console.log(']');
}

console.log(wellio_obj);


```

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
    DATA: '2020-04-02 04:27:25',
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
    null,               null,               6.2809764008568605,
    6.532057591922343,  5.941418574216999,  6.510096092865318,
    6.9220692325837,    6.472297221835048,  6.266526996652127,
    6.426148580981927,  7.048883504950486,  6.392724619869405,
    7.2067183720035475, 7.393163848991268,  7.164652421809106,
    6.974550733818363,  7.101184068253783,  6.8525783776513665,
    7.541545390015894,  7.436432709894154,  6.836662743032315,
    7.06091599211232,   7.303699679120454,  7.8037380977586706,
    7.931038808078371,  7.6215640155788025, 7.537968283552406,
    7.724943570854417,  7.231199362320828,  7.633098967866403,
    7.475786328315787,  7.312320341845188,  8.149912696122508,
    7.637795755929797,  8.23300445662301,   7.773270505562313,
    8.45011084543318,   7.822308534824677,  7.913506405921916,
    8.428213904784757,  7.873963615619421,  8.318895384342282,
    7.713787275224617,  7.935335833763701,  8.260577431999204,
    8.34180653401266,   8.344723604139427,  7.898263975036974,
    8.786489725341273,  8.866210275889168,  8.024321404897696,
    8.465436371781063,  8.032389154302193,  8.154506976715538,
    8.180920991585955,  8.577627379526891,  8.317009238435968,
    8.53235587831235,   8.731776311752975,  8.290341738179652,
    8.70406369797657,   8.816724760721584,  9.04338062086612,
    8.638051789139276,  8.817460232795039,  8.709004103406253,
    8.913203129279587,  8.57866101870139,   9.17198080601366,
    8.616914299754516,  8.582476321390612,  9.01335376557604,
    9.207471005947662,  8.947064278096674
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
    { UWI: '', DEPT: 14, SYNTH: 6.2809764008568605 },
    { UWI: '', DEPT: 14.5, SYNTH: 6.532057591922343 },
    { UWI: '', DEPT: 15, SYNTH: 5.941418574216999 },
    { UWI: '', DEPT: 15.5, SYNTH: 6.510096092865318 },
    { UWI: '', DEPT: 16, SYNTH: 6.9220692325837 },
    { UWI: '', DEPT: 16.5, SYNTH: 6.472297221835048 },
    { UWI: '', DEPT: 17, SYNTH: 6.266526996652127 },
    { UWI: '', DEPT: 17.5, SYNTH: 6.426148580981927 },
    { UWI: '', DEPT: 18, SYNTH: 7.048883504950486 },
    { UWI: '', DEPT: 18.5, SYNTH: 6.392724619869405 },
    { UWI: '', DEPT: 19, SYNTH: 7.2067183720035475 },
    { UWI: '', DEPT: 19.5, SYNTH: 7.393163848991268 },
    { UWI: '', DEPT: 20, SYNTH: 7.164652421809106 },
    { UWI: '', DEPT: 20.5, SYNTH: 6.974550733818363 },
    { UWI: '', DEPT: 21, SYNTH: 7.101184068253783 },
    { UWI: '', DEPT: 21.5, SYNTH: 6.8525783776513665 },
    { UWI: '', DEPT: 22, SYNTH: 7.541545390015894 },
    { UWI: '', DEPT: 22.5, SYNTH: 7.436432709894154 },
    { UWI: '', DEPT: 23, SYNTH: 6.836662743032315 },
    { UWI: '', DEPT: 23.5, SYNTH: 7.06091599211232 },
    { UWI: '', DEPT: 24, SYNTH: 7.303699679120454 },
    { UWI: '', DEPT: 24.5, SYNTH: 7.8037380977586706 },
    { UWI: '', DEPT: 25, SYNTH: 7.931038808078371 },
    { UWI: '', DEPT: 25.5, SYNTH: 7.6215640155788025 },
    { UWI: '', DEPT: 26, SYNTH: 7.537968283552406 },
    { UWI: '', DEPT: 26.5, SYNTH: 7.724943570854417 },
    { UWI: '', DEPT: 27, SYNTH: 7.231199362320828 },
    { UWI: '', DEPT: 27.5, SYNTH: 7.633098967866403 },
    { UWI: '', DEPT: 28, SYNTH: 7.475786328315787 },
    { UWI: '', DEPT: 28.5, SYNTH: 7.312320341845188 },
    { UWI: '', DEPT: 29, SYNTH: 8.149912696122508 },
    { UWI: '', DEPT: 29.5, SYNTH: 7.637795755929797 },
    { UWI: '', DEPT: 30, SYNTH: 8.23300445662301 },
    { UWI: '', DEPT: 30.5, SYNTH: 7.773270505562313 },
    { UWI: '', DEPT: 31, SYNTH: 8.45011084543318 },
    { UWI: '', DEPT: 31.5, SYNTH: 7.822308534824677 },
    { UWI: '', DEPT: 32, SYNTH: 7.913506405921916 },
    { UWI: '', DEPT: 32.5, SYNTH: 8.428213904784757 },
    { UWI: '', DEPT: 33, SYNTH: 7.873963615619421 },
    { UWI: '', DEPT: 33.5, SYNTH: 8.318895384342282 },
    { UWI: '', DEPT: 34, SYNTH: 7.713787275224617 },
    { UWI: '', DEPT: 34.5, SYNTH: 7.935335833763701 },
    { UWI: '', DEPT: 35, SYNTH: 8.260577431999204 },
    { UWI: '', DEPT: 35.5, SYNTH: 8.34180653401266 },
    { UWI: '', DEPT: 36, SYNTH: 8.344723604139427 },
    { UWI: '', DEPT: 36.5, SYNTH: 7.898263975036974 },
    { UWI: '', DEPT: 37, SYNTH: 8.786489725341273 },
    { UWI: '', DEPT: 37.5, SYNTH: 8.866210275889168 },
    { UWI: '', DEPT: 38, SYNTH: 8.024321404897696 },
    { UWI: '', DEPT: 38.5, SYNTH: 8.465436371781063 },
    { UWI: '', DEPT: 39, SYNTH: 8.032389154302193 },
    { UWI: '', DEPT: 39.5, SYNTH: 8.154506976715538 },
    { UWI: '', DEPT: 40, SYNTH: 8.180920991585955 },
    { UWI: '', DEPT: 40.5, SYNTH: 8.577627379526891 },
    { UWI: '', DEPT: 41, SYNTH: 8.317009238435968 },
    { UWI: '', DEPT: 41.5, SYNTH: 8.53235587831235 },
    { UWI: '', DEPT: 42, SYNTH: 8.731776311752975 },
    { UWI: '', DEPT: 42.5, SYNTH: 8.290341738179652 },
    { UWI: '', DEPT: 43, SYNTH: 8.70406369797657 },
    { UWI: '', DEPT: 43.5, SYNTH: 8.816724760721584 },
    { UWI: '', DEPT: 44, SYNTH: 9.04338062086612 },
    { UWI: '', DEPT: 44.5, SYNTH: 8.638051789139276 },
    { UWI: '', DEPT: 45, SYNTH: 8.817460232795039 },
    { UWI: '', DEPT: 45.5, SYNTH: 8.709004103406253 },
    { UWI: '', DEPT: 46, SYNTH: 8.913203129279587 },
    { UWI: '', DEPT: 46.5, SYNTH: 8.57866101870139 },
    { UWI: '', DEPT: 47, SYNTH: 9.17198080601366 },
    { UWI: '', DEPT: 47.5, SYNTH: 8.616914299754516 },
    { UWI: '', DEPT: 48, SYNTH: 8.582476321390612 },
    { UWI: '', DEPT: 48.5, SYNTH: 9.01335376557604 },
    { UWI: '', DEPT: 49, SYNTH: 9.207471005947662 },
    { UWI: '', DEPT: 49.5, SYNTH: 8.947064278096674 }
    ],
    curve_names: [ 'DEPT', 'SYNTH' ],
    uwi: ''
    }



```python

```
