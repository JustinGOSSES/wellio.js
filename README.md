# wellio.js
#### JavaScript for converting well-log standard .las file format to json format and then back again.

[![DOI](https://zenodo.org/badge/116549236.svg)](https://zenodo.org/badge/latestdoi/116549236)

[![NPM](https://nodei.co/npm/wellio.png?compact=true)](https://npmjs.org/package/wellio)

## Purpose
<b> Wellio.js is a JavaScript library for converting a LAS 2.0 well log file into a wellio style JSON. It was created to enable well logs to be easily visualized on the web.s</b>s

##### You might be wondering...Why Bother? Geologists Use Python.
Although Python is great for data analysis, and it is the language most learned by geologists, it isn't great for building user interfaces that live on the web. If you want to enable that functionality, you need to get well logs into a format JavaScript visualization libraries can consume and that's JSON.

Further explanation on why create wellio is given in the <a href="https://justingosses.github.io/wellio.js/docs/">docs</a>.

## Demos

#### 1. Github pages demo <a href="https://justingosses.github.io/wellio.js/">page</a>: 
Open the demo page running on github pages. Click one of the big blue buttons up top to  open a file loader. You can either use a LAS files already part of the webpage or you can load a local LAS file from your computer. 

If you want to test the 'load local file' feature and don't have any local LAS files, you can quickly get one by going to <a href="https://raw.githubusercontent.com/JustinGOSSES/wellio.js/master/assets/00-01-01-073-05W5-0.LAS">this</a> link and saving the results to a ".las" file using your browser. That is a raw las file for well UWI 00-01-01-073-05W5-0.

#### 2. ObservableHQ demo <a href="https://beta.observablehq.com/@justingosses/upload-well-logs-convert-las-to-json-with-wellio-then-visual/2">page</a>:
ObservableHQ is new way to explore and play with JavaScript code. Think Jupyter notebook but in a more reactive and interactive form. It runs JavaScript code instead of Python/Julia/R. There's <a href="https://observablehq.com/@justingosses/upload-well-logs-convert-las-to-json-with-wellio-then-visual/2">this</a> demo that uses vega to visualize the well log but is limited to horizontal visualization. There's also <a href="https://observablehq.com/@justingosses/a-notebook-using-wellio-js-wellioviz-js-for-quick-looks-of-la"> this </a> demo that uses wellioviz to visualize the well log as people expect it to be visualized in a vertical orientation with shading, etc. 

#### 3. Jupyter Notebook Node.js <a href="https://github.com/JustinGOSSES/wellio.js/blob/master/notebooks/Wellio%20Demo%20in%20Jupyter%20Notebook%20Node.js.ipynb">demo</a>
Wellio can also be worked with in a jupyter notebook running a node.js kernal.

## Documentation

#### Please find the documentation here: https://justingosses.github.io/wellio.js/docs/ 
Contents include:
- PURPOSE
- USAGE
- HOW TO INSTALL
- HOW TO USE ONCE INSTALLED
- WELLIO-STYLE JSON VS OTHERS
- HOW TO EDIT DOCUMENTATION
- FUNCTIONS

## Contributing
There are a variety of <a href="https://github.com/JustinGOSSES/wellio.js/issues">issues</a> that need worked. Several of which are suitable for those who are new to JavaScript. 

Please add any suggestions you'd like or bugs you find to the issues.

Docs are a great way to make pull request contributions even if you aren't immmersed in the code base yet.

## Contributors: 
- https://github.com/JustinGOSSES
- https://github.com/dcslagel


## Road Map
Right now, the main functionality of wellio.js is LAS file -> Wellio-style JSON. 

There is also functionality to:
- save wellio-style JSON as a .json file.
- load & convert <a href="https://lasio.readthedocs.io/en/latest/">LASIO</a>-style json into wellio-style JSON.

In the future, we may add functionality to convert <a href="https://jsonwelllogformat.org/">JSON well log format</as>, or what becomes the unfortunately named JSON-style JSON, to wellio-style json and back.

## Wellio.js & Wellioviz.js
<i>Wellioviz</i> is the visualization companion to <i>wellio</i>!

Where are <i>Wellio</i> is just concerned with the conversion of LAS 2.0 files into JSON, <i>Wellioviz</i> is concerned with making a visualization of the resulting JSON using d3.js v5. This means you can load, convert, and visualize well logs entirely on the web with front-end JavaScript.

<a href="https://github.com/JustinGOSSES/wellioviz"><b>Find out more about WELLIOVIZ here</b></a>

## Where To Get Open-Source Well Logs in .LAS format?
You can use the file upload button to load into your browsers memory any LAS files from your local computer. I've also included a few well logs in the /assets/ folder of this repo from the electronic data file below. 

Electronic data (including well logs, tops, etc.) for Athabasca Oil Sands Data McMurray/Wabiskaw Oil Sands Deposit <a href="http://ags.aer.ca/publications/SPE_006.html">http://ags.aer.ca/publications/SPE_006.html Data is also in the repo folder: SPE_006_originalData</a>

Report for Athabasca Oil Sands Data McMurray/Wabiskaw Oil Sands Deposit <a href="http://ags.aer.ca/document/OFR/OFR_1994_14.PDF">http://ags.aer.ca/document/OFR/OFR_1994_14.PDF</a>

You can also find them on USGS and Kansas open data sites as is done in <a href="https://observablehq.com/@justingosses/a-notebook-using-wellio-js-wellioviz-js-for-quick-looks-of-la">this Observable notebook</a> that leverages wellio & wellioviz.


## Example of LAS format and JSON formated well log data

### Original las file example
or go <a href="https://justingosses.github.io/wellio.js/">here</a> for live example.
```
~VERSION INFORMATION
 VERS.                 2.0:   CWLS LOG ASCII STANDARD -VERSION 2.0
 WRAP.                  NO:   ONE LINE PER DEPTH STEP
~WELL INFORMATION BLOCK
#MNEM.UNIT           DATA                    DESCRIPTION OF MNEMONIC
#---------    -------------------            -------------------------------
# Generated from Intellog Unique Number	CW_73_75/WELL/2722
WELL.         CHEVRON MGSU 1 MITSUE 01-01    : Well_name    - WELL
LOC .         00/01-01-073-05W5/0            : Location     - LOCATION
UWI .         00/01-01-073-05W5/0            : Uwi          - UNIQUE WELL ID
ENTR.         JAYE                           : Entered      - ENTERED BY
SRVC.         SCHLUMBERGER                   : Scn          - SERVICE COMPANY
DATE.         23 DEC 86                      : Date         - LOG DATE
STRT.M        390                            : top_depth    - START DEPTH
STOP.M        650                            : bot_depth    - STOP DEPTH
STEP.M        0.25                           : increment    - STEP LENGTH
 NULL. -999.2500:NULL Value
~CURVE INFORMATION BLOCK
#MNEM UNIT       ERCB CURVE CODE    CURVE DESCRIPTION
#-----------   ------------------   ----------------------------------
DEPT.M        00 001 00 00         : DEPTH        - DEPTH
DPHI.V/V      00 890 00 00         : PHID         - DENSITY POROSITY (SANDSTONE)
NPHI.V/V      00 330 00 00         : PHIN         - NEUTRON POROSITY (SANDSTONE)
GR  .API      00 310 00 00         : GR           - GAMMA RAY
CALI.MM       00 280 01 00         : CAL          - CALIPER
ILD .OHMM     00 120 00 00         : RESD         - DEEP RESISTIVITY (DIL)
~PARAMETER INFORMATION
#MNEM.UNIT           DATA             DESCRIPTION OF MNEMONIC
#---------         -----------     ------------------------------
GL  .M        583.3                : gl           - GROUND LEVEL ELEVATION
EREF.M        589                  : kb           - ELEVATION OF DEPTH REFERENCE
DATM.M        583.3                : datum        - DATUM ELEVATION
TDD .M        733.4                : tdd          - TOTAL DEPTH DRILLER
RUN .         ONE                  : Run          - RUN NUMBER
ENG .         SIMMONS              : Engineer     - RECORDING ENGINEER
WIT .         SANK                 : Witness      - WITNESSED BY
BASE.         S.L.                 : Branch       - HOME BASE OF LOGGING UNIT
MUD .         GEL CHEM             : Mud_type     - MUD TYPE
MATR.         SANDSTONE            : Logunit      - NEUTRON MATRIX
TMAX.C        41                   : BHT          - MAXIMUM RECORDED TEMPERATURE
BHTD.M        733.8                : BHTDEP       - MAXIMUM RECORDED TEMPERATURE
RMT .C        17                   : MDTP         - TEMPERATURE OF MUD
MUDD.KG/M     1100                 : MWT          - MUD DENSITY
NEUT.         1                    : NEUTRON      - NEUTRON TYPE
RESI.         0                    : RESIST       - RESISTIVITY TYPE
RM  .OHMM     2.62                 : RM           - RESISTIVITY OF MUD
RMC .OHMM     0                    : RMC          - RESISTIVITY OF MUD CAKE
RMF .OHMM     1.02                 : RMF          - RESISTIVITY OF MUD FILTRATE
SUFT.C        0                    : SUFT         - SURFACE TEMPERATURE
~A  DEPTH     PHID     PHIN       GR      CAL     RESD
  390.000    0.199    0.457   82.478  238.379    2.923
  390.250    0.208    0.456   86.413  238.331    2.925
  390.500    0.246    0.452   90.229  238.069    2.917
  390.750    0.266    0.475   90.944  238.752    2.898
  391.000    0.287    0.484   88.866  239.724    2.890
  391.250    0.288    0.474   82.638  241.951    2.844
  391.500    0.241    0.461   83.345  244.478    2.748
  391.750    0.215    0.471   88.403  247.116    2.725
  392.000    0.190    0.448   91.038  250.475    2.748
  392.250    0.219    0.478   89.579  254.764    2.845
  392.500    0.269    0.552   84.092  258.019    2.939
  392.750    0.316    0.458   78.479  260.143    3.088
  393.000    0.299    0.429   72.249  256.370    3.338
```

#### LAS -> JSON
```var lasjson = function las2json(onelas)```
will give you something like this though in the example below all the data is taken out to save space:
``` 
var lasjson = {
			"VERSION INFORMATION":{
				"VERS":{"MNEM":"","UNIT":"","DATA":"","DESCRIPTION OF MNEMONIC 1":"","DESCRIPTION OF MNEMONIC 2":""},
				"WRAP":{"MNEM":"","UNIT":"","DATA":"","DESCRIPTION OF MNEMONIC 1":"","DESCRIPTION OF MNEMONIC 2":""}
			}
			,
			"WELL INFORMATION BLOCK":{
					"GENERATED":"",
					"MNEM_0":{"MNEM":"","UNIT":"","DATA":"","DESCRIPTION OF MNEMONIC 1":"","DESCRIPTION OF MNEMONIC 2":""},
					"MNEM_1":{"MNEM":"","UNIT":"","DATA":"","DESCRIPTION OF MNEMONIC 1":"","DESCRIPTION OF MNEMONIC 2":""},
					"MNEM_2":{"MNEM":"","UNIT":"","DATA":"","DESCRIPTION OF MNEMONIC 1":"","DESCRIPTION OF MNEMONIC 2":""}
				}
			,
			"CURVE INFORMATION BLOCK":{
					"MNEM_0":{"MNEM":"","UNIT":"","ERCB CURVE CODE":"","CURVE DESCRIPTION 1":"","CURVE DESCRIPTION 2":""}, 
					"MNEM_0":{"MNEM":"","UNIT":"","ERCB CURVE CODE":"","CURVE DESCRIPTION 1":"","CURVE DESCRIPTION 2":""},
				}		
			,
			"PARAMETER INFORMATION":{
					"MNEM_0":{"MNEM":"","UNIT":"","DATA":"","DESCRIPTION OF MNEMONIC 1":"","DESCRIPTION OF MNEMONIC 2":""}, 
					"MNEM_1":{"MNEM":"","UNIT":"","DATA":"","DESCRIPTION OF MNEMONIC 1":"","DESCRIPTION OF MNEMONIC 2":""},
				}
			,
			"CURVES":{
					"Curve_NAME_ONE" :[1,2,3,4,5,6,7,8,9,10,11],
					"Curve_NAME_ONE" :[1,2,3,4,5,6,7,8,9,10,11],
				}
		}
```

