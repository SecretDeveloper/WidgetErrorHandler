# widget.onerror

Can be used to wrap global window.onerror events and filter them based on a regular expression or filtering callback.  This is useful if you are embedding a widget control inside another page and you only wish to respond to errors thrown within your own control.

##Options:
```javascript
    widget.onerror.init(errorCallback[, regexUrl, filterCallback])
```

**errorCallback** is the function to be called when a window.onerror event is triggered. Should return true/false to indicate whether the error has been handled. Parameters are *errorMsg, url, lineNumber*  
**regexUrl** optional parameter used to match the url of the script that threw the error.  e.g. */https?\/\/mydomain.com\./*  
**filterCallback** optional function that can also be used to filter the error.  Parameters are *errorMsg, url, lineNumber*  

**widget.onerror.reset()**
Resets window.onerror to its prior state before init() was called.

##Usage:
```javascript
require(["widget.onerror"], function(widgetOnError){
    var myCallback = function(errorMsg, url, linenumber){
        console.log(errorMsg);
    }

    widgetOnError.init(myCallback);
});


require(["widget.onerror"], function(widgetOnError){
    var myCallback = function(errorMsg, url, linenumber){
        console.log(errorMsg);
    };

    var myReg = /https?\/\/mydomain.com\./;

    var myfilter = function(errorMsg, url, linenumber){
        return errorMsg == "myApp";
    };    
    widgetOnError.init(myCallback, myReg, myfilter);

    // ...


    widgetOnError.reset();
});

```
