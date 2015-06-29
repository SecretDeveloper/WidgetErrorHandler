define("widget.onerror", function(){
"use strict";
	var widgetOnError = {};
	 
	widgetOnError.init = function(errorCallback, regexUrl, filterCallback){
		// store existing window.onerror function.
		widgetOnError.windowOnError = window.onerror;

		if(typeof errorCallback != "function") throw "errorCallback must be provided.";
		widgetOnError.errorCallback = errorCallback;
		
		window.onerror = function(errorMsg, url, lineNumber){		

			var res = false;
			// call pre existing onerror function if one existed.
			if(widgetOnError.windowOnError)
				res = widgetOnError.windowOnError(errorMsg, url, lineNumber);

			if(!widgetOnError.errorCallback) return res;
			// check we have been provided a regex for url and it passes this url
			if(regexUrl && regexUrl instanceof RegExp && !regexUrl.test(url)) return res;
			// check if we have a filterCallback and it returns true
			if(filterCallback && !filterCallback(errorMsg, url, lineNumber)) return res;
			// execute errorCallback so it can be handled
			res = widgetOnError.errorCallback(errorMsg, url, lineNumber);

			return res;			
		};
	};	

	// restore prior window.onerror state.
	widgetOnError.reset = function(){
		window.onerror = widgetOnError.windowOnError;
		widgetOnError.errorCallback = null;
	};

	return widgetOnError;
});