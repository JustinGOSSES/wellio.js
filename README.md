# wellio.js
#### JavaScript for converting well-log standard .las file format to json format and then back again.

[THIS IS VERY NEW AND IN PROGRESS]

# Direct Purpose
 There currently isn't any .las -> JSON parser that I was able to find. There is <a href="https://lasio.readthedocs.io/en/latest/">lasio</a> and <a href="https://github.com/agile-geoscience/welly">welly</a> for python, but nothing to ingest las files in JavaScript. Wellio.js is an attempt to fill that gap, so I can build other stuff. This script will have two functions. The first function converts a .las file into a json format file. They second function (not yet written) will do the inverse. Once you have well data as JSON, many other JavaScript-based things as possible. I'll try to keep those other things separate, except as demos for Wellio.

# Why
I wanted to build a reactive style, something like <a href="http://ncase.me/joy/">joy.js</a>, well-log feature creation widget that would include cross-filtering like in <a href="https://dc-js.github.io/dc.js/">dc.js</a> across multiple figures with an easy exploration playground, leverage numpy style array math for use in machine-learning, like <a href="https://deeplearnjs.org/">deeplearn.js</a>, and feed into machine-learning either in JavaScript or python running JavaScript in a notebook. I found trying to do this well log feature creation in Jupyter notebooks using Python to be too linear and time intensive involving re-writing or re-running too much code. JavaScript has more interactive and reactive data visualization libraries, so that is driving tool choice.   

# Example
#### LAS -> JSON
```var lasjson = function las2json(onelas)```
will give you something like this:
``` 
var lasjson = {
			"VERSION INFORMATION":{
				"VERS":{"MNEM":"","UNIT":"","DATA":"","DESCRIPTION OF MNEMONIC 1":"","DESCRIPTION OF MNEMONIC 2":""},
				"WRAP":{"MNEM":"","UNIT":"","DATA":"","DESCRIPTION OF MNEMONIC 1":"","DESCRIPTION OF MNEMONIC 2":""}
			}
			,
			"WELL INFORMATION BLOCK":[{
					"GENERATED":"",
					"MNEM_0":{"MNEM":"","UNIT":"","DATA":"","DESCRIPTION OF MNEMONIC 1":"","DESCRIPTION OF MNEMONIC 2":""},
					"MNEM_1":{"MNEM":"","UNIT":"","DATA":"","DESCRIPTION OF MNEMONIC 1":"","DESCRIPTION OF MNEMONIC 2":""},
					"MNEM_2":{"MNEM":"","UNIT":"","DATA":"","DESCRIPTION OF MNEMONIC 1":"","DESCRIPTION OF MNEMONIC 2":""}
				}]
			,
			"CURVE INFORMATION BLOCK":[{
					"MNEM_0":{"MNEM":"","UNIT":"","ERCB CURVE CODE":"","CURVE DESCRIPTION 1":"","CURVE DESCRIPTION 2":""}, 
					"MNEM_0":{"MNEM":"","UNIT":"","ERCB CURVE CODE":"","CURVE DESCRIPTION 1":"","CURVE DESCRIPTION 2":""},
				}]		
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

### Original las file example

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
