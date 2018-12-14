// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback called when the URL of the current tab
 *   is found.
 */
var port = chrome.runtime.connect();
chrome.browserAction.setBadgeText({ text: 'Привет привет привет' });
// var background = chrome.extension.getBackgroundPage();
// addEventListener("unload", function (event) {
//   background.console.log(Event);
// }, true);


function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, (tabs) => {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

/**
 * Change the background color of the current page.
 *
 * @param {string} color The new background color.
 */
function changeBackgroundColor(color) {
  var script = 'document.body.style.backgroundColor="' + color + '";';
  // See https://developer.chrome.com/extensions/tabs#method-executeScript.
  // chrome.tabs.executeScript allows us to programmatically inject JavaScript
  // into a page. Since we omit the optional first argument "tabId", the script
  // is inserted into the active tab of the current window, which serves as the
  // default.
  chrome.tabs.executeScript({
    code: script
  });
}

/**
 * Gets the saved background color for url.
 *
 * @param {string} url URL whose background color is to be retrieved.
 * @param {function(string)} callback called with the saved background color for
 *     the given url on success, or a falsy value if no color is retrieved.
 */
function getSavedBackgroundColor(url, callback) {
  // See https://developer.chrome.com/apps/storage#type-StorageArea. We check
  // for chrome.runtime.lastError to ensure correctness even when the API call
  // fails.
  chrome.storage.sync.get(url, (items) => {
    callback(chrome.runtime.lastError ? null : items[url]);
  });
}

/**
 * Sets the given background color for url.
 *
 * @param {string} url URL for which background color is to be saved.
 * @param {string} color The background color to be saved.
 */
function saveBackgroundColor(url, color) {
  var items = {};
  items[url] = color;
  // See https://developer.chrome.com/apps/storage#type-StorageArea. We omit the
  // optional callback since we don't need to perform any action once the
  // background color is saved.
  chrome.storage.sync.set(items);
}

// This extension loads the saved background color for the current tab if one
// exists. The user can select a new background color from the dropdown for the
// current page, and it will be saved as part of the extension's isolated
// storage. The chrome.storage API is used for this purpose. This is different
// from the window.localStorage API, which is synchronous and stores data bound
// to a document's origin. Also, using chrome.storage.sync instead of
// chrome.storage.local allows the extension data to be synced across multiple
// user devices.
document.addEventListener('DOMContentLoaded', () => {
  startTab();

//	var div = document.createElement("DIV");
//  div.innerHTML = "898989898989898989898";
//  document.getElementsByTagName('body')[0].appendChild(div);

  //  что тута????
  
  // getCurrentTabUrl((url) => {
  //   var dropdown = document.getElementById('dropdown');
  //  	var t = document.getElementById('TT');
	// t.innerHTML=url; 
	

	
  //   // Load the saved background color for this page and modify the dropdown
  //   // value, if needed.
  //   getSavedBackgroundColor(url, (savedColor) => {
  //     if (savedColor) {
  //       changeBackgroundColor(savedColor);
  //       dropdown.value = savedColor;
	//   }
  //   });

  //   // Ensure the background color is changed and saved when the dropdown
  //   // selection changes.
  //   dropdown.addEventListener('change', () => {
  //     changeBackgroundColor(dropdown.value);
  //     saveBackgroundColor(url, dropdown.value);
  //   });
	// var buttonscr = document.getElementById('buttonscr');
	// buttonscr.addEventListener('click', () => {
	// 	clickButton();
	// });
	
  // });
  var inf = document.getElementsByClassName("textInfo");
  inf[0].innerHTML = textInfo;
//console.log("inner",inf.innerHTML);

});
function clickButton() {
//	var ddd = document.getElementById('background');

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
  \
  u = document.getElementsByClassName("globalClass_ET");\
   if(u[0])u[0].remove();\
   \
  u = document.getElementsByClassName("recommended-top");\
  if(u[0])u[0].remove();';

  chrome.tabs.executeScript({
    code: script
  });
}

// tabs
    // чтение записанных данных Адреса
function getSavedUrlListEvent(key, callback) {
      chrome.storage.sync.get(key, (items) => {
        callback(chrome.runtime.lastError ? null : items[key]);
      });
}
    // чтение записанных данных  Класы
function getSavedClassesList(key, callback) {
      chrome.storage.sync.get(key, (items) => {
        callback(chrome.runtime.lastError ? null : items[key]);
      });
}
  // чтение записанных данных  Id
  function getSavedIdList(key, callback) {
    chrome.storage.sync.get(key, (items) => {
      callback(chrome.runtime.lastError ? null : items[key]);
    });
}
/**  startTab это срабатывает после загрузки страницы popup
 * 
 */
function startTab(){
  var maskList = document.getElementById("maskList");
  maskList.onkeyup = onkeyup ;
  maskList.oninput  = onkeyup ; // ловим изменения в textArea
  var classList = document.getElementById("classList");
  classList.onkeyup = onkeyupClass ;
  classList.oninput  = onkeyupClass ; // ловим изменения в textArea
  var idList = document.getElementById("idList");
  
// вызов функции чтения записанных данных  (savedList - callback функция)
getSavedUrlListEvent("maskList", (savedList) => {  // UrlListEvents интересно осталось или нет
    if (savedList) {
      var arr = savedList.split(',');
      var index, len;
     for (index = 0, len = arr.length; index < len; ++index) {
      maskList.value += arr[index].trim()+"\n";//.slice(1, -1)+"\n";
     }
 //    onkeyup(null);
  }
});
getSavedClassesList("classList", (savedList) => {
  if (savedList) {
    var arr = savedList.split(',');
    var index, len;
   for (index = 0, len = arr.length; index < len; ++index) {
    classList.value += arr[index].trim()+"\n";//.slice(1, -1)+"\n";
   }
 //  onkeyup(null);
}
});
getSavedIdList("idList", (savedList) => {
  if (savedList) {
    var arr = savedList.split(',');
    var index, len;
   for (index = 0, len = arr.length; index < len; ++index) {
    idList.value += arr[index].trim()+"\n";//.slice(1, -1)+"\n";
   }
  // onkeyup(null);
}
});


  
// это к Tab - основной
var jsTriggers = document.querySelectorAll('.js-tab-trigger');
jsTriggers.forEach(function(trigger) {
   trigger.addEventListener('click', function() {
      var id = this.getAttribute('data-tab'),
          content = document.querySelector('.js-tab-content[data-tab="'+id+'"]'),
          activeTrigger = document.querySelector('.js-tab-trigger.active'),
          activeContent = document.querySelector('.js-tab-content.active');
      
      activeTrigger.classList.remove('active');
      trigger.classList.add('active');
      
      activeContent.classList.remove('active');
      content.classList.add('active');
   });
});

// Tab2 - 
var jsTriggers2 = document.querySelectorAll('.js-tab-trigger2');
jsTriggers2.forEach(function(trigger) {
   trigger.addEventListener('click', function() {
      var id = this.getAttribute('data-tab'),
          content = document.querySelector('.js-tab-content2[data-tab="'+id+'"]'),
          activeTrigger = document.querySelector('.js-tab-trigger2.active'),
          activeContent = document.querySelector('.js-tab-content2.active');
      
      activeTrigger.classList.remove('active');
      trigger.classList.add('active');
      
      activeContent.classList.remove('active');
      content.classList.add('active');
   });
});
// Tab - основной конец
// Tab2 - 
var jsTriggers3 = document.querySelectorAll('.js-tab-trigger3');
jsTriggers3.forEach(function(trigger) {
   trigger.addEventListener('click', function() {
      var id = this.getAttribute('data-tab'),
          content = document.querySelector('.js-tab-content3[data-tab="'+id+'"]'),
          activeTrigger = document.querySelector('.js-tab-trigger3.active'),
          activeContent = document.querySelector('.js-tab-content3.active');
      
      activeTrigger.classList.remove('active');
      trigger.classList.add('active');
      
      activeContent.classList.remove('active');
      content.classList.add('active');
   });
});
/////////////////chrome.runtime.sendMessage({type:'request_password'});
// window.onbeforeunload = function (event) { 
//   //return (true ? "Измененные данные не сохранены. Закрыть страницу?" : null); 
//   // в новых это уже не работает выводится стандартный от хрома  отправить null без предупреждения
//   event.returnValue = "Измененные данные не сохранены. Закрыть страницу?"; 
//   return "Измененные данные не сохранены. Закрыть страницу?"; 
// } 
// сгенерируем событие   проверка кто вызвал event.isTrusted = true  если был человечий клик https://learn.javascript.ru/dispatch-events
var nabclick = document.querySelector(".js-tab-trigger[data-tab='2']");
var event = new Event("click");
nabclick.dispatchEvent(event);
var nabclick = document.querySelector(".js-tab-trigger2[data-tab='2']");
var event = new Event("click");
nabclick.dispatchEvent(event);
//
var buttonInsert = document.querySelector(".buttonInsert");
buttonInsert.addEventListener('click',()=>{
addSelect();
})
var selectAddr = document.querySelector(".selectAddr");
selectAddr.addEventListener('dblclick',()=>{
  var textOption = document.querySelector(".textOption ");
  textOption.value = selectAddr.value;
  var id = selectAddr.id;
  selectAddr.options[selectAddr.selectedIndex].remove();
//   alert(selectAddr.options[selectAddr.selectedIndex].text);
//   alert(selectAddr.options.length);
  // var selectA = selectAddr.querySelector("option:[value='"+selectAddr.value+"']");
  // selectA.remove();//Child(selectA.querySelector('.selectAddr option[value="'+selectA.value+'"]'));
})

onclick="insertOption();"
chrome.tabs.query({  // запрос всех вкладок
  active: true,      // фильтруем нужные
  currentWindow: true
}, function (tabs) {    	// получаем отфильтрованные
  if (tabs[0]) { 
    var textOption = document.querySelector(".textOption");
    textOption.value = tabs[0].url;
  }
});
addSelect("Иванов");
function addSelect(txt){
  txt = txt? txt : document.querySelector(".textOption").value;
  var wrapper = document.querySelector(".selectAddr");
  var opt = document.createElement("option");
  opt.innerHTML=txt;
  opt.id = getRandomId();
  if(!isOptionText(wrapper,txt))
    {
    wrapper.appendChild(opt);
    sortetSelect();
    }
   else{

   }
}
sortetSelect();
function sortetSelect() {
  var wrapper = document.querySelector(".selectAddr"),
  nodes = wrapper.getElementsByTagName("OPTION"),
  len = nodes.length,
  sorted = [];
  while (nodes[0]) {
    sorted.push(new String(nodes[0].value));
    sorted[sorted.length-1].element = nodes[0];
    wrapper.removeChild(nodes[0]);
  }
  sorted = sorted.sort();
  for (var i = 0; i < len; i++) {
    wrapper.appendChild(sorted[i].element);
  }
}
function getRandomId() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};
function isOptionText(obj,txt){
  var i;
  for (i = 0; i < obj.options.length; i++) {
      if(txt == obj.options[i].text)
        {
          obj.style.backgroundColor = "yellow";
          setTimeout(function(){
            obj.style.backgroundColor = "white";
              },50);
          return true;
        }
  }
}
// end tabs
function onkeyup (e){

}

var buttonDelListener = document.getElementById('buttonDelListener');
buttonDelListener.addEventListener('click', () => {
   clickSaveRestart();
});
}

// преобразуем список в строку с запятыми
function getListString(List){
  var myList = List.value.split('\n');

// собираем строку из textArea
var ListBuf="";
var index, len;
for (index = 0, len = myList.length; index < len; ++index) {
    if(myList[index].trim() != "")
      if(ListBuf.length > 0)
      ListBuf += ','+myList[index].trim();   
      else
      ListBuf += myList[index].trim(); 
}
//testMasklist.textContent = ListBuf;
return ListBuf;
}

// Запись данных и перезагрузка слушателя
function clickSaveRestart(){
// Записываем данные из textArea
var maskSaveList = {};
var maskList = document.getElementById("maskList");
maskSaveList["maskList"] = getListString(maskList);
if(maskSaveList["maskList"]=="")
maskSaveList["maskList"]="http://test.com/test.html"

chrome.storage.sync.set(maskSaveList,function(){
  if(chrome.runtime.lastError){
    Log("error: ","error", chrome.runtime.lastError);
  }else{
    Log("Сохранили адреса...","success");
    saveClassList();
    
  }
});
}

function saveClassList(){
  // Записываем данные из textArea
var maskSaveList = {};
var maskList = document.getElementById("classList");
maskSaveList["classList"] = getListString(maskList);
if(maskSaveList["classList"]=="")
    maskSaveList["classList"]="globalClass_ET";
chrome.storage.sync.set(maskSaveList,function(){
  if(chrome.runtime.lastError){
    Log("Ошибка записи списка классов","error", chrome.runtime.lastError);
  }else{
    Log("Сохранили classList...","success");
    saveIdList();
  }
});
}
function saveIdList(){
  // Записываем данные из textArea
var maskSaveList = {};
var maskList = document.getElementById("idList");
maskSaveList["idList"] = getListString(maskList);
if(maskSaveList["idList"]=="")
    maskSaveList["idList"]="";
chrome.storage.sync.set(maskSaveList,function(){
  if(chrome.runtime.lastError){
    Log("Ошибка записи списка ID","error", chrome.runtime.lastError);
  }else{
    Log("Сохранили idList...","success");
   closePopup();
  }
});
}





 // заставим перечитать данные для слушателя 
function closePopup(){
 var bgPage = chrome.extension.getBackgroundPage();
 bgPage.delListener();
 window.close();
}


function onkeyupClass (e){
  // var myList = classList.value.split('\n');
  // var testMasklist = document.getElementById("testMasklist");
  // // собираем строку из textArea
  // testMasklist.textContent="";
  // var index, len;
  // for (index = 0, len = myList.length; index < len; ++index) {
  //     if(myList[index].trim() != "")
  //       if(testMasklist.textContent.length > 0)
  //       testMasklist.textContent += ','+myList[index].trim();   
  //       else
  //       testMasklist.textContent += myList[index].trim(); 
  // }
  
  // // Записываем данные из textArea
  // var SaveUrlListEvents = {};
  // SaveUrlListEvents["ClassesList"] = testMasklist.textContent;
  // if(SaveUrlListEvents["ClassesList"]=="")SaveUrlListEvents["ClassesList"]="globalClass_ET" 
  // chrome.storage.sync.set(SaveUrlListEvents,catchLastError);
  }

  function Log(message,color,obj){
    var bgPage = chrome.extension.getBackgroundPage();
    bgPage.Log("[popup] "+message,color,obj);
    console.log(message);
  }
  function catchLastError(){
    if(chrome.runtime.lastError){
      Log("error: ","error", chrome.runtime.lastError);
    }else{
      Log("Скрипт загружен...","success");
  
    }
  }