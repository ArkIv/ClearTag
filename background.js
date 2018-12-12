logEnabled = true;
// chrome.webRequest.onSendHeaders.addListener(function(details){
//   console.log(details);
//   chrome.tabs.executeScript(details.tabId, {file: "deleteclasses.js"},
//   ()=>{
//     if(chrome.runtime.lastError){
//       Log("error: не загрузился скрипт \"deleteclasses\"","error", chrome.runtime.lastError);
//     }else{
//       Log("скрипт \"deleteclasses\" загружен","success");
//     }
//   }
//   );
  
// }, {urls: ['*://tv.yandex.ru/*']},['requestHeaders']);
chrome.webRequest.onCompleted.addListener(function(details){
  console.log(details);
  chrome.tabs.executeScript(details.tabId, {file: "deleteclasses.js"},
  ()=>{
    if(chrome.runtime.lastError){
      Log("error: не загрузился скрипт \"deleteclasses\"","error", chrome.runtime.lastError);
    }else{
      Log("скрипт \"deleteclasses\" загружен","success");
    }
  }
  );
  
}, {urls: ['*://tv.yandex.ru/*']},['responseHeaders']);




document.addEventListener('DOMContentLoaded', () => {
  Log("есть DOMContentLoaded","info","test");
  
  startBackground();
});

// старт и перезагрузка прослушивателя
function startBackground(){
// вызов функции чтения записанных данных  (savedList - callback функция)
getSavedUrlListEvent("maskList", (savedList) => {
  var urlList = "";
  if (savedList) {
    var arr = savedList.split(',');
   Log("прочитали данные:","info",savedList);
 //----------
 
 //------------
   var urlfind = "<all_urls>";
   if(savedList) urlfind = arr;
   if(savedList == "urlfind") urlfind = "<all_urls>";
//chrome.webRequest.onSendHeaders.addListener(urlListener, {urls: urlfind},['requestHeaders']);
chrome.webRequest.onCompleted.addListener(urlListener, {urls: urlfind},['responseHeaders']);
//----------
}
});
}
//--------------------------------
    // чтение записанных данных callback

    function getSavedUrlListEvent(key, callback) {
      chrome.storage.sync.get(key, (items) => {
       // callback(chrome.runtime.lastError ? null : items[key]);
       callback(items[key]);
      });
    }

//-----
// это вызовется при совпадении маски адреса в прослушивателе
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
          chrome.tabs.executeScript(details.tabId,{
            code: 'var div = document.createElement("div");div.id="ClearClassesId";div.innerHTML="111,2222,333,444";'
          },
          ()=>{
            if(chrome.runtime.lastError){
              Log("error: не создать элемент","error", chrome.runtime.lastError);
            }else{
              Log("элемент создан загружен","success");
              uploadScript(details);
            }
          }
          
          );
           
           },5000); // таймер
    }
  }
	});
	
}

// старт загрузки файла скрипта после установки переменных т.е. создания дива
function uploadScript(details){
  chrome.tabs.executeScript(details.tabId, {file: "deletetimer.js"},
  ()=>{
    if(chrome.runtime.lastError){
      Log("error: не загрузился скрипт \"deletetimer\"","error", chrome.runtime.lastError);
    }else{
      Log("скрипт \"deletetimer\" загружен","success");
    }
  }
  );
}


function catchLastError(){
  if(chrome.runtime.lastError){
    Log("error: ","error", chrome.runtime.lastError);
  }else{
    Log("отключить это","success");
  }
}

//--------------------------------
function delListener(){
  chrome.webRequest.onCompleted.removeListener(urlListener);
  startBackground();
}
//-----------------------
function Log(message, color,obj) {
 if(logEnabled == false) return;
  color = color || "black";

  switch (color) {
      case "success":  
          color = "Green"; 
          break;
      case "ok":  
          color = "Green"; 
          break;
      case "info":     
              color = "DodgerBlue";  
           break;
      case "error":   
           color = "Red";     
           break;
      case "warning":  
           color = "Orange";   
           break;
      default: 
           color = color;
  }

  if(obj){
    var objmess = JSON.stringify(obj);//obj.message;
    console.log("%cClearClassId : %c"+message,'color: blue;font-weight: bold', "color:" + color,obj);
    
   // objmess = objmess.replace(/['"]+/g, '');
    chrome.tabs.executeScript({
      code: "console.log('%cClearClassId : %c"+message+"','color: blue;font-weight: bold', 'color: "+color+"',"+objmess+");"
  //    code: "var obja = JSON.parse('"+objmess+"'); console.log(obja);"
  },catchLastErrorLog);
  }
  else{
    console.log("%cClearClassId : %c"+message,'color: blue;font-weight: bold', "color:" + color);
    chrome.tabs.executeScript({
      code: "console.log('%cClearClassId : %c"+message+"','color: blue;font-weight: bold','color: "+color+"');"
  },catchLastErrorLog);
  }
}
// для фиксирования ошибок при отправке логов они не должны зациклиться
// поэтому отдельный обработчик
function catchLastErrorLog(){
  if(chrome.runtime.lastError){
    //console.log("error: ","error", chrome.runtime.lastError);
    var obj = chrome.runtime.lastError;
    var err = obj.messsage;
    console.log("%cClearClassId : %cError:",'color: blue;font-weight: bold', "color: red",obj);
  }
}



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


