// Copyright (c) 2018 The ANI Software Authors. All rights reserved.

var port = chrome.runtime.connect();
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

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, (tabs) => {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

document.addEventListener('DOMContentLoaded', () => {
  startTab();

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
function startTab() {
  var maskList = document.getElementById("maskList");
  var classList = document.getElementById("classList");
  var idList = document.getElementById("idList");

  // вызов функции чтения записанных данных  (savedList - callback функция)
  getSavedUrlListEvent("maskList", (savedList) => {  // UrlListEvents интересно осталось или нет
    if (savedList) {
      var arr = savedList.split(',');
      var index, len;
      for (index = 0, len = arr.length; index < len; ++index) {
        maskList.value += arr[index].trim() + "\n";//.slice(1, -1)+"\n";
      }
    }
  });
  getSavedClassesList("classList", (savedList) => {
    if (savedList) {
      var arr = savedList.split(',');
      var index, len;
      for (index = 0, len = arr.length; index < len; ++index) {
        classList.value += arr[index].trim() + "\n";//.slice(1, -1)+"\n";
      }
    }
  });
  getSavedIdList("idList", (savedList) => {
    if (savedList) {
      var arr = savedList.split(',');
      var index, len;
      for (index = 0, len = arr.length; index < len; ++index) {
        idList.value += arr[index].trim() + "\n";//.slice(1, -1)+"\n";
      }
    }
  });



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

  // Tab2 - 
  var jsTriggers2 = document.querySelectorAll('.js-tab-trigger2');
  jsTriggers2.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var id = this.getAttribute('data-tab'),
        content = document.querySelector('.js-tab-content2[data-tab="' + id + '"]'),
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
  var buttonInsertId = document.querySelector(".buttonInsertId");
  buttonInsertUrl.addEventListener('click', () => {
    addSelectUrl();
  });
  buttonInsertClass.addEventListener('click', () => {
    addSelectClass();
  });
  buttonInsertId.addEventListener('click', () => {
    addSelectId();
  });

  var selectUrl = document.querySelector(".selectUrl");
  var selectClass = document.querySelector(".selectClass");
  var selectId = document.querySelector(".selectId");

  var addrCurrent = document.querySelector(".addrCurrent");
  var tabHeader_1_4 = document.getElementById("tabHeader_1_4");
  var tab2 = document.getElementById("tab-2");
  tab2.style.visibility = "hidden";
  var tab3 = document.getElementById("tab-3");
  tab3.style.visibility = "hidden";
  tabHeader_1_4.addEventListener("click", () => {
    isSelectedTab2();
  });
  // удаление из списка при дваойном клике  
  // двойной клик удаляем текст из поля выбранного URL
  let textOptionUrl = document.querySelector(".textOptionUrl");
  let textOptionClass = document.querySelector(".textOptionClass");
  let textOptionId = document.querySelector(".textOptionId");
  selectUrl.addEventListener('dblclick', removeOptionUrl);
  selectClass.addEventListener('dblclick', removeOptionClass);
  selectId.addEventListener('dblclick', removeOptionId);

  function removeOptionUrl(e) {
    if (e.target.nodeName.toLowerCase() == "option") {
      addrCurrent.innerHTML = "";
      textOptionUrl.value = e.target.value;
      e.target.remove();
      isSelectedTab2();
    }
  }
  function removeOptionClass(e) {
    if (e.target.nodeName.toLowerCase() == "option") {
      textOptionClass.value = e.target.value;
      e.target.remove();
      //isSelectedTab2();
    }
  }
  function removeOptionId(e) {
    if (e.target.nodeName.toLowerCase() == "option") {
      textOptionId.value = e.target.value;
      e.target.remove();
      // isSelectedTab2();
    }
  }
  // выделение  и определение адреса при выборе из списка
  selectUrl.addEventListener('change', () => {
    addrCurrent.innerHTML = selectUrl.options[selectUrl.selectedIndex].value;
    isSelectedTab2();
  });
  // проверка что в поле выбора URL чтото есть и включим остальные вкладки
  function isSelectedTab2() {
    if (addrCurrent.innerHTML.trim() == "") {
      tab2.style.visibility = "hidden";
      tab3.style.visibility = "hidden";
    } else {
      tab2.style.visibility = "visible";
      tab3.style.visibility = "visible";
    }
  };

  //onclick="insertOption();"
  // при активации окна считываем с активной вкладки адрес и подставлякм в поле ввода
  chrome.tabs.query({  // запрос всех вкладок
    active: true,      // фильтруем нужные
    currentWindow: true
  }, function (tabs) {    	// получаем отфильтрованные
    if (tabs[0]) {
      var textOptionUrl = document.querySelector(".textOptionUrl"); // поле ввода
      textOptionUrl.value = tabs[0].url;
    }
  });
  // добавление строки в Select
  function addSelectUrl(txt) {
    txt = txt ? txt : textOptionUrl.value;
    if (!isOptionText(selectUrl, txt))// проверка на существовании в списке Select
    {
      let opt = document.createElement("option");
      opt.innerHTML = txt;
      selectUrl.appendChild(opt);
      sortetSelect(selectUrl);
    }
  }
  function addSelectClass(txt) {
    txt = txt ? txt : textOptionClass.value;
    if (!isOptionText(selectClass, txt))// проверка на существовании в списке Select
    {
      let opt = document.createElement("option");
      opt.innerHTML = txt;
      selectClass.appendChild(opt);
      sortetSelect(selectClass);
    }
  }
  function addSelectId(txt) {
    txt = txt ? txt : textOptionId.value;
    if (!isOptionText(selectId, txt))// проверка на существовании в списке Select
    {
      let opt = document.createElement("option");
      opt.innerHTML = txt;
      selectId.appendChild(opt);
      sortetSelect(selectId);
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
    sorted = sorted.sort();
    for (var i = 0; i < len; i++) {
      obj.appendChild(sorted[i].element);
    }
  }
  function getRandomId() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  };
  /** проверка на существовании txt в объекте Select  obj 
   * 
   * @param {*} obj 
   * @param {*} txt 
   */
  function isOptionText(obj, txt) {
    var i;
    for (i = 0; i < obj.options.length; i++) {
      if (txt.toLowerCase() == obj.options[i].text.toLowerCase() || txt.trim() == "") {
        obj.style.backgroundColor = "yellow";
        setTimeout(function () {
          obj.style.backgroundColor = "white";
        }, 50);
        return true;
      }
    }
  }
  // end tabs
  var buttonDelListener = document.getElementById('buttonDelListener');
  buttonDelListener.addEventListener('click', () => {
    clickSaveRestart();
  });


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

  // Запись данных и перезагрузка слушателя
  function clickSaveRestart() {
    // Записываем данные из textArea
    var maskSaveList = {};
    var maskList = document.getElementById("maskList");
    maskSaveList["maskList"] = getListString(maskList);
    if (maskSaveList["maskList"] == "")
      maskSaveList["maskList"] = "http://test.com/test.html"

    chrome.storage.sync.set(maskSaveList, function () {
      if (chrome.runtime.lastError) {
        Log("error: ", "error", chrome.runtime.lastError);
      } else {
        Log("Сохранили адреса...", "success");
        saveClassList();

      }
    });
  }

  function saveClassList() {
    // Записываем данные из textArea
    var maskSaveList = {};
    var maskList = document.getElementById("classList");
    maskSaveList["classList"] = getListString(maskList);
    if (maskSaveList["classList"] == "")
      maskSaveList["classList"] = "globalClass_ET";
    chrome.storage.sync.set(maskSaveList, function () {
      if (chrome.runtime.lastError) {
        Log("Ошибка записи списка классов", "error", chrome.runtime.lastError);
      } else {
        Log("Сохранили classList...", "success");
        saveIdList();
      }
    });
  }
  function saveIdList() {
    // Записываем данные из textArea
    var maskSaveList = {};
    var maskList = document.getElementById("idList");
    maskSaveList["idList"] = getListString(maskList);
    if (maskSaveList["idList"] == "")
      maskSaveList["idList"] = "";
    chrome.storage.sync.set(maskSaveList, function () {
      if (chrome.runtime.lastError) {
        Log("Ошибка записи списка ID", "error", chrome.runtime.lastError);
      } else {
        Log("Сохранили idList...", "success");
        closePopup();
      }
    });
  }





  // заставим перечитать данные для слушателя 
  function closePopup() {
    var bgPage = chrome.extension.getBackgroundPage();
    bgPage.delListener();
    window.close();
  }


  function onkeyupClass(e) {
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

  function Log(message, color, obj) {
    var bgPage = chrome.extension.getBackgroundPage();
    bgPage.Log("[popup] " + message, color, obj);
    console.log(message);
  }
  function catchLastError() {
    if (chrome.runtime.lastError) {
      Log("error: ", "error", chrome.runtime.lastError);
    } else {
      Log("Скрипт загружен...", "success");

    }
  }
  var saveAllLists = document.querySelector('.saveAllLists');
  saveAllLists.addEventListener('click', () => {
    SaveLists();
  });
  function SaveLists() {
    // Записываем данные из textArea
    let listAll = {};
    var saveList = {};
    var maskList = document.querySelector(".selectUrl");
    saveList["listUrl"] = getListString(maskList);
    if (saveList["listUrl"] == "")
        saveList["listUrl"] = "http://test.com/test.html"
    
    listAll["привет всем"] = saveList;
    console.log(listAll);
    console.log(saveList);
    chrome.storage.sync.set(listAll, function () {
      if (chrome.runtime.lastError) {
        Log("error: ", "error", chrome.runtime.lastError);
      } else {
        Log("Сохранили адреса...2", "success");
        // saveClassList();

      }
    });
  }

}