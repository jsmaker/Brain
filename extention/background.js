const tab_log = function(json_args) {
  var args = JSON.parse(unescape(json_args));
  console[args[0]].apply(console, Array.prototype.slice.call(args, 1));
}

chrome.extension.onRequest.addListener(function(request) {
  var execData;
  if (request.command !== 'sendToConsole'){
	  execData = {
		  code: "("+ tab_log + ")('" + request.args + "');",
	  }
  }
  if (request.command !== 'exec'){
		execData = {
			code:  request.args
		}
  }  
  chrome.tabs.executeScript(request.tabId, execData || {});  
});