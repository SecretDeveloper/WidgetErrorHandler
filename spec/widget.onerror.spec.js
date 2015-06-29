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
	console.log("widgetOnError", widgetOnError);
	console.log("errorA", errorA);
	console.log("errorB", errorB);

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
	    	console.log("originalOnError executed");
	    	console.log("errorCallback", arguments);
	    };
	    var newOnError = function(){
	    	console.log("newOnError executed");
	    	console.log("errorCallback", arguments);
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
	    	console.log("originalOnError executed");
	    	console.log("errorCallback", arguments);
	    };
	    var newOnError = function(){
	    	console.log("newOnError executed");
	    	console.log("errorCallback", arguments);
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

/*
    QUnit.test("widget.onerror - ", function (assert) {

    	window.calledCount = 0;
    	console.log(assert);
    	var done = assert.async();

    	var errorCallback = function(){
    		window.calledCount++;
    		return false;
    	}

    	widgetOnError.init(errorCallback);

    	setTimeout(function(){
    		errorA.Error();
    	}, 100);


    	setTimeout(function(){
    		errorB.Error();
    	}, 100);

    	setTimeout(function(){
    		equal(2, this.calledCount);
    		done();
    		console.log("done");
    	}, 200);

    	equal(widgetOnError.errorCallback, errorCallback, "Expected this.onerror to be errorCallback");
    });
 */
 
});