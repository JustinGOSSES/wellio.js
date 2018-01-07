# wellio.js
#### JavaScript for converting well-log standard .las file format to json format and then back again.

[THIS IS VERY NEW AND IN PROGRESS]

# Direct Purpose
 There currently isn't any .las parser that I was able to find. This fills that gap. This script will have two functions. Both only take a single las at a time. The first function converts a  .las file into a json format file. They second function (not yet written) will do the inverse.

# Why
I wanted to build a reactive style (something like <a href="http://ncase.me/joy/">joy.js</a> ) well-log feature creation widget that would include cross-filtering like in <a href="https://dc-js.github.io/dc.js/">dc.js</a> across multiple figures with an easy exploration playground that leverages numpy style array math for use in machine-learning, like <a href="https://deeplearnjs.org/">deeplearn.js</a>. I found Python notebooks to be too linear and time intensive involving re-writing or re-running too much code. The types of things above are all built in JavaScript, so I needed las in json. Hence, , wellio.js.

