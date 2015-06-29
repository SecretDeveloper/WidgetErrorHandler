requirejs.config({
    
    baseUrl: '../',

    paths: {
        "widget.onerror": "widget.onerror",
        "ErrorA":"test/ErrorA",
        "ErrorB":"test/ErrorB",
        "ErrorB":"test/ErrorB",
    }
});

require(['widget.onerror', "ErrorA", "ErrorB"], function(widgetOnError, errorA, errorB){
	//console.log("widgetOnError", widgetOnError);
	//console.log("errorA", errorA);
	//console.log("errorB", errorB);

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

    	expect(4);

    	stop( 2 );
 
		// Only call start() when counter is 0.
		var counter = 2;
		function done() { 
			console.log("done - counter" , counter);
			if(counter >0) --counter;
			if(counter == 0) start(); 			
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
    		errorA.Error();
    	}, 100);

    	setTimeout(function(){
    		errorA.Error();
    	}, 110);

    	setTimeout(function(){
    		errorA.Error();
    	}, 120);

    	setTimeout(function(){
    		errorB.Error();
    	}, 130);



    });

});