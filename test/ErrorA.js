define("ErrorA", function(){
	
	var A = {};

	A.throw = function(){
				throw "ErrorA";
			};

	A.throwError = function(){
		throw new Error("throw new Error");		
	};
	
	A.error = function(){
				undefined.undefined();
			};

	A.throwUndefined = function(){
				return undefined.undefined();
			};

	return A;
});