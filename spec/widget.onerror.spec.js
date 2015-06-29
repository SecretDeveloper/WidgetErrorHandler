requirejs.config({
    
    baseUrl: '../',

    paths: {
        "widget.onerror": "widget.onerror",
        "ErrorA":"test/ErrorA",
        "ErrorB":"test/ErrorB",        
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

		var counter = 4;
    	expect(counter);
    	stop( 1 ); 

    	var delay = (function(){
    		var init = 100;
    		var step = 200
    		return function(){
    			init+=step;
    			return init;
    		}
    	})();
				
		function done() { 
			console.log("done - counter" , counter);
			if(counter > 0) counter = counter -1;
			
			if(counter == 0){
				console.log("done - calling start()" , counter);
				start(); 				
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
    		errorB.throw();
    	}, delay());
    });
});