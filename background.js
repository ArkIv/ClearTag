chrome.webRequest.onSendHeaders.addListener(function(details){
  chrome.tabs.executeScript(null, {file: "deleteclasses.js"});
  
}, {urls: [ "*://tv.yandex.ru/*" ]},['requestHeaders']);

var urlfind = "<all_urls>";
chrome.webRequest.onSendHeaders.addListener(function(details){
	chrome.tabs.query({
    active: true,
    currentWindow: true
    },function(tabs){	
		var vvvv =  details.url;
		var currenttab = tabs[0].url;
		if(vvvv == currenttab){  // если запрос от текущей страницы активной вкладки
	       setTimeout(function(){
            chrome.tabs.executeScript(null, {file: "deletetimer.js"});
           },5000); // таймер
		}
	});
	
}, {urls: [ urlfind ]},['requestHeaders']);


//  Загрузка по очереди [m][z]
//chrome.tabs.executeScript(null, {file: "jquery.min.js"}, function(){
//    chrome.tabs.executeScript(null, {file: "auto.js"}, function(){
//        chrome.tabs.executeScript(null, {file: "script.js"}, function(){
//            //all injected
//        });
//    });
//});

// globalClass_ET
// git
// git remote add origin https://github.com/ArkIv/ClearTag.git
// git push -u origin master


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    //code in here will run every time a user goes onto a new tab, so you can insert your scripts into every new tab
}); 


