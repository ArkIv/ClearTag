chrome.webRequest.onSendHeaders.addListener(function(details){
//   console.log(details.url);
//	alert(details.url);
	var script = '\
  var u = document.getElementsByClassName("super-banner");\
  if(u[0])u[0].remove();\
  u = document.getElementsByClassName("grid-chunk__column-box");\
  if(u[0])u[0].remove();\
  u = document.getElementsByClassName("main-controller__adv-bottom");\
  if(u[0])u[0].remove();\
    u = document.getElementsByClassName("footer");\
  if(u[0])u[0].remove();\
    u = document.getElementsByClassName("header");\
  if(u[0])u[0].remove();\
  u = document.getElementsByClassName("recommended-top");\
  if(u[0])u[0].remove();\
  console.log("очистка яндекс tv");';
//	chrome.tabs.executeScript({
//    code: script
//  });
  chrome.tabs.executeScript(null, {file: "deleteclasses.js"});
  
}, {urls: [ "*://tv.yandex.ru/*" ]},['requestHeaders']);


//  Загрузка по очереди [m][z]
//chrome.tabs.executeScript(null, {file: "jquery.min.js"}, function(){
//    chrome.tabs.executeScript(null, {file: "auto.js"}, function(){
//        chrome.tabs.executeScript(null, {file: "script.js"}, function(){
//            //all injected
//        });
//    });
//});

// globalClass_ET


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    //code in here will run every time a user goes onto a new tab, so you can insert your scripts into every new tab
}); 


