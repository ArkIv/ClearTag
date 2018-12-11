chrome.webRequest.onSendHeaders.addListener(function(details){
  chrome.tabs.executeScript(details.tabId, {file: "deleteclasses.js"},catchLastError);
  
}, {urls: ['*://tv.yandex.ru/*']},['requestHeaders']);

document.addEventListener('DOMContentLoaded', () => {
  console.log("есть DOMContentLoaded");
  startBackground();
});

function startBackground(){
// вызов функции чтения записанных данных  (savedList - callback функция)
getSavedUrlListEvent("UrlListEvents", (savedList) => {
  var urlList = "";
  if (savedList) {
    var arr = savedList.split(',');
   console.log("прочитали данные:",savedList);
 //  alert(savedList);
   //----------
   var urlfind = "<all_urls>";
   if(savedList) urlfind = arr;
   if(savedList == "urlfind") urlfind = "<all_urls>";
  // console.log("urls: ",urlfind);
//chrome.webRequest.onSendHeaders.addListener(urlListener, {urls: urlfind},['requestHeaders']);
chrome.webRequest.onCompleted.addListener(urlListener, {urls: urlfind},['responseHeaders']);
//----------
}
});
}

//--------------------------------
    // чтение записанных данных
    function getSavedUrlListEvent(key, callback) {
      chrome.storage.sync.get(key, (items) => {
       // callback(chrome.runtime.lastError ? null : items[key]);
       callback(items[key]);
      });
    }

//-----
function urlListener(details){
	chrome.tabs.query({
    active: true,
    currentWindow: true
    },function(tabs){	
    var vvvv =  details.url;
   if(tabs[0]){ 
    // console.log("tabs---",tabs);
		var currenttab = tabs[0].url;
		if(vvvv == currenttab){  // если запрос от текущей страницы активной вкладки
	       setTimeout(function(){
            chrome.tabs.executeScript(details.tabId, {file: "deletetimer.js"},catchLastError);
           },5000); // таймер
    }
  }
	});
	
}
function catchLastError(){
  if(chrome.runtime.lastError){
    console.log("error: ", chrome.runtime.lastError);
  }else{
    console.log("Скрипт загружен...");

  }
}

//--------------------------------
function delListener(){
  chrome.webRequest.onCompleted.removeListener(urlListener);
  startBackground();
}
//-----------------------


// var urlfind = "<all_urls>";
// chrome.webRequest.onSendHeaders.addListener(function(details){
// 	chrome.tabs.query({
//     active: true,
//     currentWindow: true
//     },function(tabs){	
// 		var vvvv =  details.url;
// 		var currenttab = tabs[0].url;
// 		if(vvvv == currenttab){  // если запрос от текущей страницы активной вкладки
// 	       setTimeout(function(){
//             chrome.tabs.executeScript(null, {file: "deletetimer.js"});
//            },5000); // таймер
// 		}
// 	});
	
// }, {urls: [ urlfind ]},['requestHeaders']);


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


// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//     //code in here will run every time a user goes onto a new tab, so you can insert your scripts into every new tab
// }); 


