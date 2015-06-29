# widget.onerror

Can be used to wrap global window.onerror events and filter them based on a regular expression or filtering callback.  This is useful if you are embedding a widget control inside another page and you only wish to respond to errors thrown within your own control.

##Options:
**widget.onerror.init(errorCallback[, regexUrl, filterCallback])**

*errorCallback* is the function to be called when a window.onerror event is triggered. Should return true/false to indicate whether the error has been handled. Parameters are *errorMsg, url, lineNumber*
*regexUrl* optional parameter used to match the url of the script that threw the error.  e.g. */https?\/\/mydomain.com\./*
*filterCallback* optional function that can also be used to filter the error.  Parameters are *errorMsg, url, lineNumber*

##Usage:
```
require(["widget.onerror"], function(widgetOnError){
        widgetOnError.init()
    })
