define("ErrorB", function(){
	
	var B = {};

	B.throw = function(){
				throw "throw errorB";
			};

	B.throwError = function(){
		throw new Error("throw new Error('throw new Error')");		
	};

	B.error = function(){
		throw "error occurred in object B";
	};

	B.throwUndefined = function(){
				return undefined.undefined();
			};

	return B;
});