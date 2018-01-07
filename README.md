# wellio.js
#### JavaScript for converting well-log standard .las file format to json format and then back again.

[THIS IS VERY NEW AND IN PROGRESS]

# Direct Purpose
 There currently isn't any .las parser that I was able to find. This fills that gap. This script will have two functions. Both only take a single las at a time. The first function converts a  .las file into a json format file. They second function (not yet written) will do the inverse.

# Why
I wanted to build a reactive style well-log feature creation widget that would include cross-filtering across multiple figures and live exploration playground for mathematical creation of well log array features for use in machine-learning. I found Python implimentations to be too linear and time intensive involving re-writing or re-running too much code. These types of things are often built in JavaScript, which then required the need to read las files into json and back again.

