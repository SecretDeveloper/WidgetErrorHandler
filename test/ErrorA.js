define("ErrorA", function(){
	
	var A = {};

	A.error = function(){
				undefined.undefined();
			};

	A.throw = function(){
				throw "ErrorA";
			};

	A.throwError = function(){
				var er = new Error("test error");
				throw er;
			};


	return A;
});