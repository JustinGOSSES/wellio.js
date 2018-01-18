
// // var a = dl.Array1D.new([1, 2, 3]);
// // var b = dl.Scalar.new(2);

// // var result = math.add(a, b);

// // Option 1: With a Promise.
// // result.data().then(data => console.log(data)); // Float32Array([3, 4, 5])

// // Option 2: Synchronous download of data. This is simpler, but blocks the UI.
// console.log(result.dataSync());


function array_try_1(){
	var div = "dl_trial_a"
	var math = dl.ENV.math;
	var a = dl.Array1D.new(temp_json["CURVES"]["GR"])
	var b = dl.Scalar.new(200);
	var result = math.add(a, b);
	// result.data().then(data => console.log(data));
	result.data().then(data => draw_curve_from_data(data,div,"GR"));
	// result.data().then(data => console.log("data = ",data));

}


function ArrayControlWindow(data,instructions) {
  //// This brings in the deeplearn.js math object
  var math = dl.ENV.math;

  var self = this;

  var instructions = instructions || {}
  if(instructions.windowSize===undefined) {instructions.windowSize=5};
  if(instructions.windowPos===undefined) {instructions.windowSize="around"};
  if(instructions.scalar_1===undefined) {instructions.scalar_1=200};
  if(instructions.instructions===undefined) {instructions.instructions={}};
  
  // self.greeting = function() {
  //   alert('Hi! I\'m ' + this.name + '.');
  // };
  self.reset = function(){
		
	};
  self.reset();

  //// sets the array to be manipulated
  self.array_1 = dl.Array1D.new(data[0]);
  self.new_array = self.array_1
  
  //// sets properties
  self.scalar_1 = dl.Scalar.new(instructions.scalar_1);
  self.scalar_2 = dl.Scalar.new(instructions.scalar_2);
  self.windowSize = dl.Scalar.new(instructions.windowSize);
  self.windowPos = instructions.windowPos;
  


  //// sets instructions
  self.instructions = instructions.instructions;
  


  //// functions that can be called and returned an object instead of acting directly on self
  self.sum = function (a,b){
  	var result = dl.math.add(a, b);
  	return result
  };
  self.substract = function (a,b){
  	var result = dl.math.subtract(a, b);
  	return result
  };

  //// slice function for windowed operations on an array
  self.slice = function (window_size, window_position, a_function ){
  	var result = "?????????? put things here ?????????"
  	return result
  }



}







