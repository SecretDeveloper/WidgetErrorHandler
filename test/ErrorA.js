define("ErrorA", function(){
	
	var A = {};
	A.Error = function(){
				throw "ErrorA";
			};
	return A;
});