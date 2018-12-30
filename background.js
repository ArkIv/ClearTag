
var logEnabled = true;
var allFrames = false;
// selectors - здесь будут храниться все данные между чтением и записью в базу
// работать через  var bgPage = chrome.extension.getBackgroundPage();
var selectors = {"elements":"","script":"","noscripts":""};
//var selectors2 = {urls:{}};
//===================== слушаем порт
// chrome.runtime.onConnect.addListener(function (port) {
//   //console.assert(port.name == "knockknock");
//   //if (!port.name) return;

//   port.onMessage.addListener(function (msg,port) {
//     console.log(msg , port.sender.tab.id);
//   //   if (msg.joke == "Knock knock")
//   //     port.postMessage({ question: "Who's there?" });
//   //   else if (msg.answer == "Madame")
//   //     port.postMessage({ question: "Madame who?" });
//   //   else if (msg.answer == "Madame... Bovary")
//   //     port.postMessage({ question: "I don't get it." });
//    });
// });
//=============================================================

// читать базу после загрузки дерева и скрипта для базы соответственно
function readBase() {
  localforage.getItem('ClearClassId_Lists').then(function (value) {
    //Загрузили из базы
    if (!value) {
      createBase(); // если нифига нет создадим новую
    }
    else {
      selectors = value;
      Log("Прочитано из базы","info", value);
    }
  }).catch(function (err) {
    Log("Ошибка при чтениииз базы","error", err);
  });
}
// Создание базы
function createBase() {
  if (!selectors["!_____all_url_____!"]) selectors["!_____all_url_____!"] = { "elements": ".content__adv-footer,.globalClass_ET" };

  localforage.setItem('ClearClassId_Lists', selectors).then(function (value) {
    // здесь все получено дальнейшие дествия.
    Log("Создана база", "info", value);
  }).catch(function (err) {
    // Произошла ошибка
    Log("Ошибка создания базы", "error", err);
  });
}
let test = false;   // для подсчета tik
chrome.tabs.onUpdated.addListener(updateTab);

function updateTab(tabId, changeInfo,tab) {
  let timer = setTimeout((tab) => {
    if (changeInfo.status == "complete") {
      Log("Загрузили.....","info", tab.url);
      checkUrl2(tab.url, tabId);             // проверять двойной вызов
      // может вызывать только функцию коль она там уже есть ??
      test = true;
      clearTimeout(timer);
    }
  }, 1000,tab);
}

// Блоеируем загрузку страниц скриптов и тд
chrome.webRequest.onBeforeRequest.addListener(
            function (details) { return { cancel: true }; },
  {
    urls: ["https://yandex.ru/clck/click/*", "https://mc.yandex.ru/clmap/*",
      "https://files.cointraffic.io/js/pnd/script.js", "https://mc.yandex.ru/watch/*",
      "http://api.solvemedia.com/papi/_puzzle.js",
    "http://mell,owads.com/js/*"]
  },
  ["blocking"]);
            




// Прослушиваем все http b https
// chrome.webRequest.onCompleted.addListener(function (Details) { 
//  //  checkUrl2(Details.url.toLowerCase(),Details.tabId);
// }, { urls: ['http://*/*', 'https://*/*'] }, ['responseHeaders']);

// поиск соответствия урл-вкладки с нашим списком урл.
// если найдено в списке запустим функцию
function checkUrl2(url,tabId) {
  if (selectors)
  for(var k in selectors) // перебираем ключи с URLs
  {
    k = k + "";

    regex = k;
    regex = regex.replace(new RegExp(/[[\^$.|?+()\/]/g), "\\$&"); // убрал звездочку  экранируем управляющие символы кроме звездочки
    regex = regex.replace(/\*/gi, "[\\W\\w]*") + "$"; //создаем regexp на основе оставшихся звездочек
    var regex = new RegExp(regex);
    if (regex.test(url.trim())) {
 //   if (url.indexOf(k) >= 0) {
      setTimeout((regex, url,tabId) => { // адрес есть в списке
        Log("url:", "error", url, tabId);
        Log("regex:", "error", regex.toString(), tabId);
        Log("селекторы", "error", selectors[k].elements, tabId);
        if (arrayPorts[tabId]) {
          // arrayPorts[tabId].postMessage({ setClassListCommon: selectors["!_____all_url_____!"] }); // установка переменной
          // arrayPorts[tabId].postMessage({ func: "removeElementCommon" }); // запуск функции
          arrayPorts[tabId].postMessage({ setClassList: selectors[k].elements }); // установка переменной
          arrayPorts[tabId].postMessage({ func: "removeElement" }); // запуск функции
        }
      }, 1000, regex, url,tabId);
    }

    }
      // все равно кто запускаем общие классы
      setTimeout((tabId) => {
      if (arrayPorts[tabId]) {
        arrayPorts[tabId].postMessage({ setClassListCommon: selectors["!_____all_url_____!"].elements }); // установка переменной
        arrayPorts[tabId].postMessage({ func: "removeElementCommon" }); // запуск функции
      }
    }, 1000, tabId);
}

var tik = [];
// function checkUrl(Details) {
//   console.log(Details);
//   chrome.tabs.query({  // запрос всех вкладок
//     active: true,      // фильтруем нужные
//    currentWindow: true  // при переходе на отладчик - это мешает, меняется иекущее окно.
//   }, function (tabs) {    	// получаем отфильтрованные
//       if (tabs[0]) {      // поскольку фильтр по Active то вероятно вкладка одна
//         var currentUrl = tabs[0].url.toLowerCase();
//         if (test){
//           tik.push(Details.url);
//           timerWait(currentUrl, tabs[0].id);
//          // console.log("tik: " + currentUrl, Details.url);
//       }
//         else console.log("tik: " + currentUrl);// + "  Ж  " + Details.url);
//       //timerWait(currentUrl, tabs[0].id);
//     }
//   });
// }

// приходит адрес вкладки на котором было событие
// при этом загружается куча файлов, на этой вкладке
// ждем секунду или... от последнего и срабатываем
let timerWaitId = null;  
function timerWait(currentUrl,tabId)
{
    clearTimeout(timerWaitId);
  timerWaitId = setTimeout(function () {
    let t = [];
    t[0] = tik;
   // var ttt = JSON.parse(JSON.stringify(tik));
  //  Log("url:","info", currentUrl);
    Log("Загрузка:", 'info', t, tabId);
    
   // var tt = JSON.stringify(tik);
   // console.log(ttt);
    tik = []; t = [];
       // console.log("ark: " + currentUrl);   // вероятно загрузили все если интервал был меньше таймера
                                             // ну иначе просто повторно запустим скрипт ??
  }, 1000, tabId, currentUrl);                              
}




// это только для яндекса
chrome.webRequest.onCompleted.addListener(function (details) {
  console.log(details);
  chrome.tabs.executeScript(details.tabId, { file: "deleteclasses.js", allFrames: allFrames },
    () => {
      if (chrome.runtime.lastError) {
        Log("error: не загрузился скрипт \"deleteclasses\"", "error", chrome.runtime.lastError);
      } else {
        Log("скрипт \"deleteclasses\" загружен", "success");
        Log("url (на что среагировал):" + details.url, "success");
      }
    }
  );
}, { urls: ['*://tv.yandex.ru/*date*'] }, ['responseHeaders']);

// старт загрузка background
document.addEventListener('DOMContentLoaded', () => {
  Log("есть DOMContentLoaded", "info", "test");
  readBase();
  //startBackground();
});

// старт и перезагрузка прослушивателя
// function startBackground() {

//   localforage.getItem('ClearClassId_Lists').then(function (value) {
//     Log("Загрузили из базы:", "info", value);
//     startBackground2();
//   }).catch(function (err) {
//     // This code runs if there were any errors
//     console.log(err);
//   });
// }
// function startBackground2(){
//   // вызов функции чтения записанных данных масок адресов (savedList - callback функция)
//   getList("maskList", (savedList) => {
//     var urlList = "";
//     if (savedList) {
//       var arr = savedList.split(',');
//       //var arrC = []; arrC["Adresses"] = arr? arr:"нет адресов";// listErr? listErr.slice(0, -1).split(","):"не обнаружено";
//       Log("Загрузили адреса прослушки:", "info", arr);//savedList);
//       var urlfind = "<all_urls>";
//       if (savedList) urlfind = arr;
//       if (savedList == "urlfind") urlfind = "<all_urls>";
//       //chrome.webRequest.onSendHeaders.addListener(urlListener, {urls: urlfind},['requestHeaders']);
//       // Запуск прослушивателя после загрузки масок адресов
//       chrome.webRequest.onCompleted.addListener(urlListener, { urls: urlfind }, ['responseHeaders']);
//       // адреса подставлены и при совпадении будет вызываться  urlListener
//       // запуск в текущей вкладке
//       urlListener();
//     }
//   });
// } // end startBackground
//--------------------------------
// чтение записанных данных callback
// function getList(key, callback) {
//   chrome.storage.sync.get(key, (items) => {
//     // callback(chrome.runtime.lastError ? null : items[key]);
//     callback(items[key]);
//   });
// }

// чтение из хранилища
// function loadListClasses(key, callback) {
//   chrome.storage.sync.get(key, (items) => {
//     // callback(chrome.runtime.lastError ? null : items[key]);
//     callback(items[key]);
//   });
// }
// это вызовется при совпадении маски адреса в прослушивателе
// function urlListener(details) {

//   chrome.tabs.query({  // запрос всех вкладок
//     active: true,      // фильтруем нужные
//     currentWindow: true
//   }, function (tabs) {    	// получаем отфильтрованные
//     if (tabs[0]) {      // поскольку фильтр по Active то вероятно вкладка одна
//       var currenttab = tabs[0].url; // текущая активная-открытая вкладка
//       if (!details || details.url == currenttab) {  // если запрос от текущей страницы активной вкладки, details.url - адрес текущей загрузки
//         loadListClasses("classList", (savedList) => {   // читаем из хранилища
//           // получили список из хранилища
//           //  var classBufer = 'var divClassList = document.createElement("div");divClassList.id="ClearClassesId";divClassList.innerHTML="' + savedList + '";';
//           var classBuffer = 'var ClearClassBuffer = "' + savedList + '";';

//           loadListClasses("idList", (savedList) => {
//             //  var idBuffer ='var divIdList = document.createElement("div");divIdList.id="ClearClassesIdList";divIdList.innerHTML="' + savedList + '";';
//             var idBuffer = 'var ClearIdBuffer = "' + savedList + '";';
//             // получили список из хранилища
//             uploadElement(tabs[0], classBuffer + idBuffer);
//           });
//           // if (savedList) {
//           //   uploadElement(details, savedList);   
//           // }
//           // else
//           //   uploadElement(details, "");

//         });
//       }
//     }
//   });
// }




// Создаем и загружаем элемент с данными
// function uploadElement(Tab, savedList) {
//   setTimeout(function () {
//     chrome.tabs.executeScript(Tab.id, {
//       //  code: 'var divClasses = document.createElement("div");divClasses.id="ClearClassesId";divClasses.innerHTML="' + savedList + '";'
//       code: savedList, allFrames: allFrames
//     },
//       () => {
//         if (chrome.runtime.lastError) {
//           Log("не загрузить списки", "error", chrome.runtime.lastError);
//         } else {
//           Log("Списки загружены-3", "success","инициатор: "+Tab.url);
//          // Log("url (на что среагировал):" + details.url, "success");
//           uploadScript(Tab);
//         }
//       }

//     );

//   }, 5000); // таймер дадим время загрузиться скриптам - если успеют
// }


// старт загрузки файла скрипта после установки переменных т.е. создания дива
// function uploadScript(Tab) {
//   chrome.tabs.executeScript(Tab.id, { file: "deletetimer.js", allFrames: allFrames},
//     () => {
//       if (chrome.runtime.lastError) {
//         Log("error: не загрузился скрипт \"deletetimer\"", "error", chrome.runtime.lastError);
//       } else {
//         Log("скрипт \"deletetimer\" загружен", "success");
//       }
//     }
//   );
// }


function catchLastError() {
  if (chrome.runtime.lastError) {
    Log("error: ", "error", chrome.runtime.lastError);
  } else {
    Log("отключить это", "success");
  }
}

//--------------------------------
// function delListener() {
//   chrome.webRequest.onCompleted.removeListener(urlListener);
//   startBackground();
// }

// Должен ловить закрытие popup.html
// в popup.js  строка  var port = chrome.runtime.connect()
let portPopup; // это порт от popup окна - нафиг он мне?
let arrayPorts = {};
chrome.runtime.onConnect.addListener(function (extPort) {
  /**
   * Ктото подключился сюда в background
   * ставим порт на прослушку
   */
  extPort.onMessage.addListener(function (msg, port) { 
    // если это был коонект от popup-окна, ставим прослушку на закрытие его
    if (port.name == "popupConnectFlag") {  // порт от окна
      if (msg.event == "OpenAndConnect") {  // сообщение чтоб включить ожидание disconnect (Закрытия)
        portPopup = port;
        port.onDisconnect.addListener(disconnectPort); // слушаем порт только от Popup
        Log("Есть связь с popup.js...", "info")
        console.log("Открыт popup", msg, port);
      }
    }
    else if (port.name == "Content Script") {
      if (msg.msg == "newTab") {
        if (port)
          if (port.sender)
            if (port.sender.tab)
              if (port.sender.tab.id) {
                port.onDisconnect.addListener(disPort);
                arrayPorts[port.sender.tab.id] = port;
                Log("Поорт таб", "info", port.sender.tab.id);
              //  checkUrl2(port.sender.url, port.sender.tab.id);  // проверять двойной вызов этот без обновления
                // может вызывать только функцию коль она там уже есть ??
              }
        Log("Порты", "info", arrayPorts);
      }
    }
    
  });
     Log("что то прилетело в back ","info", extPort);
  // также после коннекта имеем порт для передачи сообщений в background
  // if (extPort)
  //   if (extPort.sender)
  //     if (extPort.sender.tab)
  //       if (extPort.sender.tab.id)
  //       {
    
  //   extPort.onDisconnect.addListener(disPort);
  //        // arrayPorts["p" + extPort.sender.tab.id] = extPort;
  //         arrayPorts[extPort.sender.tab.id] = extPort;
  //         Log("Поорт таб", "info", extPort.sender.tab.id);
  //         checkUrl2(extPort.sender.url, extPort.sender.tab.id);
  //          }
  // Log("Порты", "info", arrayPorts);
   
})

function disPort(extPort) {
  Log("Поорт таб disconnect: ", "info", extPort.sender.tab.id);
  if (arrayPorts[extPort.sender.tab.id]) {
    delete arrayPorts[extPort.sender.tab.id];
  }
  Log("Порты делете", "info", arrayPorts);
}

function disconnectPort(port) {
  if (port.name != "popupConnectFlag") return;
  Log("Отключились от Popup.js  окно закрылось.","info")
  // Do stuff that should happen when popup window closes here
  // https://localforage.github.io/localForage/#data-api-setitem
  localforage.setItem('ClearClassId_Lists', selectors).then(function (value) {
    // здесь все получено дальнейшие дествия.
    Log("Сохранено в базу при закрытии", "info", value)// port);
    console.log("Sender:", "info", port);
  }).catch(function (err) {
    // Произошла ошибка
    Log("Ошибка записи в базу", "error", err);
  });
}


//---------------------- создает окно  туда вписать локальный файл из расширения
// chrome.runtime.onMessage.addListener(function(request) {
//   if (request.type === 'request_password') {
//       chrome.tabs.create({
//           url: 'https://yandex.ru',// chrome.extension.getURL('xxx.html'),
//           active: false
//       }, function(tab) {
//           // After the tab has been created, open a window to inject the tab
//           chrome.windows.create({
//               tabId: tab.id,
//               type: 'popup',
//               focused: true,
//               width: 300,
//               height: 300,
//               top: 100,
//               left: 100
//               // incognito, top, left, ...
//           });
//       });
//   }
// });
////////////// а это вызовет его например из popup.html
////////////// chrome.runtime.sendMessage({type:'request_password'});

//-----------------------
function Log(message, color, obj = undefined,tabId = undefined) {
  // chrome-devtools:  chrome-extension:
  if (logEnabled == false) return;

  color = color || "black";
  switch (color) {
    case "success": color = "Green"; break;
    case "ok": color = "Green"; break;
    case "info": color = "DodgerBlue"; break;
    case "error": color = "Red"; break;
    case "err": color = "Red"; break;
    case "warning": color = "Orange"; break;
    default: color = color;
  }

  if (obj) {
    var objmess = JSON.stringify(obj);//obj.message;
    console.log("%cClearClassId : %c" + "[Bg]:" + message, 'color: blue;font-weight: bold', "color:" + color, obj);
    // objmess = objmess.replace(/['"]+/g, '');
    chrome.tabs.executeScript(tabId,{
      code: "console.log('%cClearClassId : %c" +"[Bg]:"+ message + "','color: blue;font-weight: bold', 'color: " + color + "'," + objmess + ");",
      allFrames: allFrames
      //    code: "var obja = JSON.parse('"+objmess+"'); console.log(obja);"
    }, catchLastErrorLog);
  }
  else {
    console.log("%cClearClassId : %c" + "[Bg]:" + message, 'color: blue;font-weight: bold', "color:" + color);
    chrome.tabs.executeScript(tabId,{
      code: "console.log('%cClearClassId : %c" + "[Bg]:" + message + "','color: blue;font-weight: bold','color: " + color + "');",
      allFrames: allFrames
    }, catchLastErrorLog);
  }
}
// для фиксирования ошибок при отправке логов они не должны зациклиться
// поэтому отдельный обработчик
function catchLastErrorLog() {
  if (chrome.runtime.lastError) {
    //console.log("error: ","error", chrome.runtime.lastError);
    var obj = chrome.runtime.lastError;
    var err = obj.messsage;
    console.log("%cClearClassId : %cError:", 'color: blue;font-weight: bold', "color: red", obj);
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


