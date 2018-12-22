// Copyright (c) 2018 The ANI Software Authors. All rights reserved.

var port = chrome.runtime.connect({ name: "popupConnectFlag" });
port.postMessage({ event: "OpenAndConnect" });

var bgPage = chrome.extension.getBackgroundPage();
var CurrentSelectUrl = "";
//bgPage.selectors
//var selectors = {};
//selectors["ClearClassId"] = [];

// на иконке текст 4 символа
chrome.browserAction.setBadgeText({ text: 'Ура!' });

function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    // поскольку астивная вкладка всегда есть - значит есть 0-элемент
    var tab = tabs[0];
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url доступен если есть permission "activeTab" 
    // для просмотра других вкладок  permission  "Tabs"  
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  startClearClassId();

  var inf = document.getElementsByClassName("textInfo");
  inf[0].innerHTML = textInfo;
  //console.log("inner",inf.innerHTML);

});
function clickButton() {
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

/**  startClearClassId это срабатывает после загрузки страницы popup
 * 
 */
function startClearClassId() {

//===============================
  var selectUrl = document.querySelector(".selectUrl");
  var selectClass = document.querySelector(".selectClass");

  //var addrCurrent = document.querySelector(".addrCurrent");
  var tabHeader_1_4 = document.getElementById("tabHeader_1_4"); // вкладка тест
  var tab2 = document.getElementById("tab-2"); // Селекторы
  tab2.style.visibility = "hidden";

  let textOptionUrl = document.querySelector(".textOptionUrl");
  let textOptionClass = document.querySelector(".textOptionClass");
  // let textOptionId = document.querySelector(".textOptionId");
  let addrCurrentTooltip = document.querySelector(".addrCurrentTooltip");
  let addrCurrentSpan = document.querySelector(".addrCurrentSpan");
    
//====================================

  let keys = Object.keys(bgPage.selectors);
  Log("Прочитали селекторы:", "info", keys);
  selectUrl.innerHTML = "";

  for (let i = 0; i < keys.length; i++) {
    addSelectUrl(false,keys[i]); // false не устанавливать фокус
    
  }
   // это к Tab - основной
  var jsTriggers = document.querySelectorAll('.js-tab-trigger');
  jsTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var id = this.getAttribute('data-tab'),
        content = document.querySelector('.js-tab-content[data-tab="' + id + '"]'),
        activeTrigger = document.querySelector('.js-tab-trigger.active'),
        activeContent = document.querySelector('.js-tab-content.active');

      activeTrigger.classList.remove('active');
      trigger.classList.add('active');

      activeContent.classList.remove('active');
      content.classList.add('active');
    });
  });
 
  var jsTriggers3 = document.querySelectorAll('.js-tab-trigger3');
  jsTriggers3.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var id = this.getAttribute('data-tab'),
        content = document.querySelector('.js-tab-content3[data-tab="' + id + '"]'),
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
  var nabclick = document.querySelector(".js-tab-trigger[data-tab='4']");
  var event = new Event("click");
  nabclick.dispatchEvent(event);  // кликаем по четвертому табу
  var nabclick = document.querySelector(".js-tab-trigger3[data-tab='1']");
  var event = new Event("click");
  nabclick.dispatchEvent(event);  // кликаем по первому табу в третьем табе
  //
  var buttonInsertUrl = document.querySelector(".buttonInsertUrl");
  var buttonInsertClass = document.querySelector(".buttonInsertClass");

  buttonInsertUrl.addEventListener('click', () => {
    addSelectUrl(true);
  });
  buttonInsertClass.addEventListener('click', () => {
    addSelectClass(true);
    saveSelectors();
  });

 
  tabHeader_1_4.addEventListener("click", () => {
    isSelectedTab2();
  });
  // удаление из списка при дваойном клике  
  // двойной клик удаляем текст из поля выбранного URL

  selectUrl.addEventListener('dblclick', removeOptionUrl);
  selectClass.addEventListener('dblclick', removeOptionClass);


  function removeOptionUrl(e) {
    if (e.target.nodeName.toLowerCase() == "option") {
     // bgPage.selectors[CurrentSelectUrl] = selectToStr(selectClass);
      CurrentSelectUrl = selectUrl.options[selectUrl.selectedIndex].value.trim();
      if (CurrentSelectUrl == "!_____all_url_____!") {
        selectUrl.style.backgroundColor = "yellow";
        setTimeout(function () {
          selectUrl.style.backgroundColor = "white";
        }, 50);
        return;
      };
      delete bgPage.selectors[CurrentSelectUrl];
      CurrentSelectUrl = "";
      addrCurrentTooltip.innerHTML = "";
      addrCurrentSpan.innerHTML = "";
      textOptionUrl.value = e.target.value;
      e.target.remove();
      isSelectedTab2();
    }
  }
  function removeOptionClass(e) {
    if (e.target.nodeName.toLowerCase() == "option") {
      textOptionClass.value = e.target.value;
      e.target.remove();
      saveSelectors(); // Запись
    }
  }
  // выделение  и определение адреса при выборе из списка
  selectUrl.addEventListener('change', () => {
    CurrentSelectUrl = selectUrl.options[selectUrl.selectedIndex].value.trim();
    addrCurrentTooltip.innerHTML = CurrentSelectUrl; // вплываем
    addrCurrentSpan.innerHTML = CurrentSelectUrl;  // показываем
    
    isSelectedTab2(CurrentSelectUrl);
  });

  // проверка что в поле выбора URL чтото есть и включим остальные вкладки
  function isSelectedTab2(Key) {
    if (CurrentSelectUrl == "") {
      tab2.style.visibility = "hidden";
     } else {
      tab2.style.visibility = "visible";
      if (Key) {
        let str = bgPage.selectors[Key];
        if (str) {
          let arr = str.split(',');
          selectClass.innerHTML = ""; // перед добавлением  удалим все Option
          for (let i = 0; i < arr.length; i++) {
            addSelectClass(false,arr[i])
          }
     //     sortetSelect(selectClass);
          Log("Key:", "Blue", str);
        }
        else   // раз нет ключей очистим все option
          selectClass.innerHTML = "";
      }

     

    }
  };

  //onclick="insertOption();"
  // при активации окна считываем с активной вкладки адрес и подставлякм в поле ввода
  chrome.tabs.query({  // запрос всех вкладок
    active: true,      // фильтруем нужные
    currentWindow: true
  }, function (tabs) {    	// получаем отфильтрованные
    if (tabs[0]) {
      
      textOptionUrl.value = getFilterUrl(tabs[0].url);// decodeURIComponent(tabs[0].url);
    }
  });

  // фильтруем строку до параметров если они есть
  function getFilterUrl(url) {
    let idx = url.indexOf("&");
    if (idx >= 0)
      url = url.substr(0, idx);
    return decodeURIComponent(url);
  }


  // добавление строки в Select
  function addSelectUrl(focus,txt) {
    txt = txt ? txt : textOptionUrl.value;
    txt = txt.toLowerCase().trim();
    
    if (!isOptionText(selectUrl, txt))// проверка на существовании в списке Select
    {
    //  console.log("111111111111111111111111");
      let opt = document.createElement("option");
      opt.innerHTML = decodeURIComponent(txt);
      selectUrl.appendChild(opt);
      sortetSelect(selectUrl, true); // true Записать
      
      if (focus == true){
        selectUrl.selectedIndex = opt.index;
        selectUrl.focus();
        CurrentSelectUrl = selectUrl.options[selectUrl.selectedIndex].value.trim();
        addrCurrentTooltip.innerHTML = CurrentSelectUrl; // вплываем
        addrCurrentSpan.innerHTML = CurrentSelectUrl;  // показываем
        isSelectedTab2(CurrentSelectUrl);
      }
      

    }
  }
  function addSelectClass(focus, txt) {
    txt = txt ? txt : textOptionClass.value;
    txt = txt.trim();
    if (!isOptionText(selectClass, txt))// проверка на существовании в списке Select
    {
      let opt = document.createElement("option");
      if (txt[0] == '.') opt.classList.add("optionClass");
      else if (txt[0] == '#') opt.classList.add("optionId");
      else opt.classList.add("optionTag");
     // opt.selected = true;
      opt.innerHTML = txt; //strip(txt);
      selectClass.appendChild(opt);
      sortetSelect(selectClass);  // save true - записать
      if (focus == true) {    // если нет focus вообще значит надо фокусировать
        selectClass.selectedIndex = opt.index;
        selectClass.focus();
      }
     // console.log("llll", opt.index);
      
    }
  }
  // TODO: надо вывести из автозапуска
  sortetSelect(selectUrl);
  // сортировка подаваемого Select объекта
  function sortetSelect(obj) {
    //  var wrapper = document.querySelector(".selectUrl"),
    nodes = obj.getElementsByTagName("OPTION"),
      len = nodes.length,
      sorted = [];
    while (nodes[0]) {
      sorted.push(new String(nodes[0].value));
      sorted[sorted.length - 1].element = nodes[0];
      obj.removeChild(nodes[0]);
    }
    sorted = sorted.sort(); // для цифр (a,b) => { return a - b;}
    for (var i = 0; i < len; i++) {
      obj.appendChild(sorted[i].element);
    }
   // saveSelectors(CurrentSelectUrl); // Запись
  }



  /** проверка на существовании txt в объекте Select  obj 
   * 
   * @param {*} obj 
   * @param {*} txt 
   */
  function isOptionText(obj, txt) {
    var i;
    
    if (obj.options.length == 0) return false;
    for (i = 0; i < obj.options.length; i++) {
// /[\W\w]*:\/\/[\W\w]*rkt[\W\w]*а[\W\w]*ов[\W\w]*/i
      regex = obj.options[i].text.toLowerCase();
      regex = regex.replace(new RegExp(/[[\^$.|?+()\/]/g), "\\$&"); // убрал звездочку
     // regex = regex.replace(/\//gi, "\\/");
      regex = regex.replace(/\*/gi, "[\\W\\w]*")+"$";
     var regex = new RegExp(regex);
      if (regex.test(txt.trim())){
        obj.selectedIndex = obj.options[i].index;
        obj.focus();

  //   if (txt.toLowerCase() == obj.options[i].text.toLowerCase() || txt.trim() == "") {
        obj.style.backgroundColor = "yellow";
        setTimeout(function () {
          obj.style.backgroundColor = "white";
        }, 50);
        return true;
      }
    }
  }
  // преобразуем список в строку с запятыми
  function getListString(List) {
    var myList = List.value.split('\n');

    // собираем строку из textArea
    var ListBuf = "";
    var index, len;
    for (index = 0, len = myList.length; index < len; ++index) {
      if (myList[index].trim() != "")
        if (ListBuf.length > 0)
          ListBuf += ',' + myList[index].trim();
        else
          ListBuf += myList[index].trim();
    }
    //testMasklist.textContent = ListBuf;
    return ListBuf;
  }

  

  // заставим перечитать данные для слушателя 
  function closePopup() {
    var bgPage = chrome.extension.getBackgroundPage();
    bgPage.delListener();
    window.close();
  }

// отправим log  в  background
  function Log(message, color, obj) {
    var bgPage = chrome.extension.getBackgroundPage();
    bgPage.Log("[popup] " + message, color, obj);
    console.log("[popup] " + message,obj);
  }
 
 // selectClass.addEventListener('onpaste', saveSelectors);
  function saveSelectors() {
    if (CurrentSelectUrl == "") return;
    bgPage.selectors[CurrentSelectUrl] = selectToStr(selectClass);
    Log("Запись:", "info", bgPage.selectors);
   }
  // преобразуем список в строку с запятыми
  function selectToStr(Select) {
    let selectStr = "";
    for (let i = 0; i < Select.options.length; i++) {
      if (i == 0) selectStr += Select.options[i].text;
      else selectStr += "," + Select.options[i].text;
    }
    return selectStr;
  }

  // добавим к String функцию byteLength
  // выдает размер в байтах взависимости от размера UNICODE
  // str.byteLength()  
  String.prototype.byteLength = function () {
    var str = this, length = str.length, count = 0, i = 0, ch = 0;
    for (i; i < length; i++) {
      ch = str.charCodeAt(i);
      if (ch <= 127) {
        count++;
      } else if (ch <= 2047) {
        count += 2;
      } else if (ch <= 65535) {
        count += 3;
      } else if (ch <= 2097151) {
        count += 4;
      } else if (ch <= 67108863) {
        count += 5;
      } else {
        count += 6;
      }
    }
    return count;
  };
} //  общий конец

  //================== Случайное  число ============
  // function getRandomId() {
  //   // Math.random should be unique because of its seeding algorithm.
  //   // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  //   // after the decimal.
  //   return '_' + Math.random().toString(36).substr(2, 9);
  // };
  //================== удалит теги путем записи HTML чтения тхт из объекта ====================
	// function strip(html) {
	// 	var tmp = document.createElement("div");
  //   tmp.innerHTML = html;
  //   let str = tmp.innerText
  //   tmp.remove();
  //   return str;
  // }
  //================== Запись в файл =====================
          // document.getElementsByTagName('a')[0].onclick = function () {
          //   var text = "text";
          //   var csvData = 'data:application/txt;charset=utf-8,' + encodeURIComponent(text);
          //   this.href = csvData;
          //   this.target = '_blank';
          //   this.download = 'txt.txt';
          // }
          //   < a href =#> записать</a >
  //================== Запись в файл  конец ===============

  //================== Чтение из файла ====================
          // function readFile(object) {
          //   var file = object.files[0]
          //   var reader = new FileReader()
          //   reader.onload = function () {
          //     document.getElementById('out').innerHTML = reader.result
          //   }
          //   reader.readAsText(file)
          // }
          // <input type="file" id="file">
          //   <button onclick="readFile(document.getElementById('file'))">Read!</button>
          //   <div id="out"></div>
  //================== Чтение из файла конец ==============
  // ================= Блокировка запросов по адресам
  // в Манифест надо  "webRequest"   и это  "webRequestBlocking"
// Блокирует запросы по маске
          // chrome.webRequest.onBeforeRequest.addListener(
          //   function (details) { return { cancel: true }; },
          //   { urls: ["*://www.evil.com/*"] },
          //   ["blocking"]);
          //   ///  или так
          // chrome.webRequest.onBeforeRequest.addListener(
          //   function (details) {
          //     return { cancel: details.url.indexOf("://www.evil.com/") != -1 };
          //   },
          //   { urls: ["<all_urls>"] },
          //   ["blocking"]);
  //=======================


