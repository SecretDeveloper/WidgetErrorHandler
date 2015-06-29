requirejs.config({
    
    baseUrl: '../',

    paths: {
        "widget.onerror": "widget.onerror",
        "ErrorA":"test/ErrorA",
        "ErrorB":"http://widget.onerror2/test/ErrorB",        
    }
});

require(['widget.onerror', "ErrorA", "ErrorB"], function(widgetOnError, errorA, errorB){

	module('Autocomplete',{
            setup: function() {
                window.onerror = null
                widgetOnError.reset();
            },
            teardown: function() {              
                window.onerror = null
                widgetOnError.reset();  
            }
        });

	var delay = (function(){
    	var init = 50;
    	var step = 50;
    	var current = init;

    	return function(reset){
    		if(reset) current = init;
    		current+=step;
    		return current;
    	};
    })();

	test("widget.onerror - throws error when errorCallback is invalid", function () {
		assert.throws(function(){
			widgetOnError.init();
		});

		assert.throws(function(){
			widgetOnError.init(null);
		});

		assert.throws(function(){
			widgetOnError.init(undefined);
		});
	});

	test("widget.onerror - maintains existing this.onerror", function () {
	    
	    window.onerror = null;
	    equal(window.onerror, null, "Expected window.onerror to be null");
	    equal(widgetOnError.onerror, null, "Expected widgetOnError.onerror to be null");
	    
	    var originalOnError = function(){
	    	//console.log("originalOnError executed");
	    	//console.log("errorCallback", arguments);
	    };
	    var newOnError = function(){
	    	//console.log("newOnError executed");
	    	//console.log("errorCallback", arguments);
	    };

	    window.onerror = originalOnError;	    
	    widgetOnError.init(newOnError);

	    equal(originalOnError, widgetOnError.windowOnError, "Expected originalOnError to equal widgetOnError.windowOnError");
		notEqual(originalOnError, window.onerror, "Expected originalOnError to NOT equal window.onerror");
		equal(newOnError, widgetOnError.errorCallback, "Expected newOnError to equal widgetOnError.errorCallback");		
    });

	test("widget.onerror - can reset", function () {
	    
	    window.onerror = null;
	    equal(window.onerror, null, "Expected window.onerror to be null");
	    equal(widgetOnError.onerror, null, "Expected widgetOnError.onerror to be null");
	    
	    var originalOnError = function(){
	    	//console.log("originalOnError executed");
	    	//console.log("errorCallback", arguments);
	    };
	    var newOnError = function(){
	    	//console.log("newOnError executed");
	    	//console.log("errorCallback", arguments);
	    };

	    window.onerror = originalOnError;	    
	    widgetOnError.init(newOnError);

	    equal(originalOnError, widgetOnError.windowOnError, "Expected originalOnError to equal widgetOnError.windowOnError");
		notEqual(originalOnError, window.onerror, "Expected originalOnError to NOT equal window.onerror");
		equal(newOnError, widgetOnError.errorCallback, "Expected newOnError to equal widgetOnError.errorCallback");
		
	 	widgetOnError.reset();

		equal(window.onerror, widgetOnError.windowOnError, "Expected window.onerror and widgetOnError.windowOnError to be equal.");	 	
		equal(null, widgetOnError.errorCallback, "Expected widgetOnError.errorCallback to be null.");
		equal(originalOnError, window.onerror, "Expected originalOnError to equal window.onerror");
    });

	test("widget.onerror - errorCallback is executed", function () {

		var counter = 8;
    	expect(counter);
    	stop( 1 ); 
    			
		function done() { 			
			if(counter > 0) counter = counter -1;			
			if(counter == 0){				
				// all expected assertions were called.
				// execute qunit.start() after a timeout to catch any straggling items we did not account for.  
				// Test will fail if assertion count is not what was expected.
				setTimeout(function(){start()}, 200); 				
			} 
		} 	

    	var errorCallback = function(){
    		console.log("errorcallback args", arguments);
    		//console.log("counter", counter);
    		ok(arguments, "errorcallback executed");
    		done();
    		return true;
    	}

    	widgetOnError.init(errorCallback);

    	setTimeout(function(){
    		errorA.throw();
    	}, delay());

    	setTimeout(function(){
    		errorA.throwError();
    	}, delay());

    	setTimeout(function(){
    		errorA.error();
    	}, delay());

    	setTimeout(function(){
    		errorA.throwUndefined();
    	}, delay());

    	setTimeout(function(){
    		errorB.throw();
    	}, delay());

    	setTimeout(function(){
    		errorB.throwError();
    	}, delay());

    	setTimeout(function(){
    		errorB.error();
    	}, delay());

    	setTimeout(function(){
    		errorB.throwUndefined();
    	}, delay());
    });
});