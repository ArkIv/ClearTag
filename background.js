var logEnabled = true;
var allFrames = false;
// selectors - здесь будут храниться все данные между чтением и записью в базу
// работать через  var bgPage = chrome.extension.getBackgroundPage();
var selectors = {};

// читать базу после загрузки дерева и скрипта для базы соответственно
function readBase() {
  localforage.getItem('ClearClassId_Lists').then(function (value) {
    // This code runs once the value has been loaded
    // from the offline store.
    if (!value) {
      createBase();
    }
    else {
      selectors = value;
      console.log("Прочитано из базы", value);
    }
  }).catch(function (err) {
    // This code runs if there were any errors
    console.log("При чтениииз базы", err);
  });
}
function createBase() {
  selectors["!_____all_url_____!"] = ".content__adv-footer,.globalClass_ETedddddddddddddddddddwsxxxxxxzzz";
  localforage.setItem('ClearClassId_Lists', selectors/* listAll*/).then(function (value) {
    // здесь все получено дальнейшие дествия.
    Log("Создана база", "info", value);
  }).catch(function (err) {
    // Произошла ошибка
    Log("Ошибка создания базы", "error", err);
  });
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
}, { urls: ['*://tv.yandex.ru/*period*'] }, ['responseHeaders']);

// старт загрузка background
document.addEventListener('DOMContentLoaded', () => {
  Log("есть DOMContentLoaded", "info", "test");
  readBase();
  startBackground();
});

// старт и перезагрузка прослушивателя
function startBackground() {

  localforage.getItem('ClearClassId_Lists').then(function (value) {
    Log("Загрузили из базы:", "info", value);
    startBackground2();
  }).catch(function (err) {
    // This code runs if there were any errors
    console.log(err);
  });
}
function startBackground2(){
  // вызов функции чтения записанных данных масок адресов (savedList - callback функция)
  getList("maskList", (savedList) => {
    var urlList = "";
    if (savedList) {
      var arr = savedList.split(',');
      //var arrC = []; arrC["Adresses"] = arr? arr:"нет адресов";// listErr? listErr.slice(0, -1).split(","):"не обнаружено";
      Log("Загрузили адреса прослушки:", "info", arr);//savedList);
      var urlfind = "<all_urls>";
      if (savedList) urlfind = arr;
      if (savedList == "urlfind") urlfind = "<all_urls>";
      //chrome.webRequest.onSendHeaders.addListener(urlListener, {urls: urlfind},['requestHeaders']);
      // Запуск прослушивателя после загрузки масок адресов
      chrome.webRequest.onCompleted.addListener(urlListener, { urls: urlfind }, ['responseHeaders']);
      // адреса подставлены и при совпадении будет вызываться  urlListener
      // запуск в текущей вкладке
      urlListener();
    }
  });
} // end startBackground
//--------------------------------
// чтение записанных данных callback
function getList(key, callback) {
  chrome.storage.sync.get(key, (items) => {
    // callback(chrome.runtime.lastError ? null : items[key]);
    callback(items[key]);
  });
}

// чтение из хранилища
function loadListClasses(key, callback) {
  chrome.storage.sync.get(key, (items) => {
    // callback(chrome.runtime.lastError ? null : items[key]);
    callback(items[key]);
  });
}
// это вызовется при совпадении маски адреса в прослушивателе
function urlListener(details) {

  chrome.tabs.query({  // запрос всех вкладок
    active: true,      // фильтруем нужные
    currentWindow: true
  }, function (tabs) {    	// получаем отфильтрованные
    if (tabs[0]) {      // поскольку фильтр по Active то вероятно вкладка одна
      var currenttab = tabs[0].url; // текущая активная-открытая вкладка
      if (!details || details.url == currenttab) {  // если запрос от текущей страницы активной вкладки, details.url - адрес текущей загрузки
        loadListClasses("classList", (savedList) => {   // читаем из хранилища
          // получили список из хранилища
          //  var classBufer = 'var divClassList = document.createElement("div");divClassList.id="ClearClassesId";divClassList.innerHTML="' + savedList + '";';
          var classBuffer = 'var ClearClassBuffer = "' + savedList + '";';

          loadListClasses("idList", (savedList) => {
            //  var idBuffer ='var divIdList = document.createElement("div");divIdList.id="ClearClassesIdList";divIdList.innerHTML="' + savedList + '";';
            var idBuffer = 'var ClearIdBuffer = "' + savedList + '";';
            // получили список из хранилища
            uploadElement(tabs[0], classBuffer + idBuffer);
          });
          // if (savedList) {
          //   uploadElement(details, savedList);   
          // }
          // else
          //   uploadElement(details, "");

        });
      }
    }
  });
}




// Создаем и загружаем элемент с данными
function uploadElement(Tab, savedList) {
  setTimeout(function () {
    chrome.tabs.executeScript(Tab.id, {
      //  code: 'var divClasses = document.createElement("div");divClasses.id="ClearClassesId";divClasses.innerHTML="' + savedList + '";'
      code: savedList, allFrames: allFrames
    },
      () => {
        if (chrome.runtime.lastError) {
          Log("не загрузить списки", "error", chrome.runtime.lastError);
        } else {
          Log("Списки загружены-3", "success","инициатор: "+Tab.url);
         // Log("url (на что среагировал):" + details.url, "success");
          uploadScript(Tab);
        }
      }

    );

  }, 5000); // таймер дадим время загрузиться скриптам - если успеют
}


// старт загрузки файла скрипта после установки переменных т.е. создания дива
function uploadScript(Tab) {
  chrome.tabs.executeScript(Tab.id, { file: "deletetimer.js", allFrames: allFrames},
    () => {
      if (chrome.runtime.lastError) {
        Log("error: не загрузился скрипт \"deletetimer\"", "error", chrome.runtime.lastError);
      } else {
        Log("скрипт \"deletetimer\" загружен", "success");
      }
    }
  );
}


function catchLastError() {
  if (chrome.runtime.lastError) {
    Log("error: ", "error", chrome.runtime.lastError);
  } else {
    Log("отключить это", "success");
  }
}

//--------------------------------
function delListener() {
  chrome.webRequest.onCompleted.removeListener(urlListener);
  startBackground();
}

// Должен ловить закрытие popup.html
// в popup.js  строка  var port = chrome.runtime.connect()
chrome.runtime.onConnect.addListener(function (externalPort) {
  externalPort.onDisconnect.addListener(function () {
    console.log("Отключились от Popup.js  окно закрылось.")
    // Do stuff that should happen when popup window closes here
        // https://localforage.github.io/localForage/#data-api-setitem
    localforage.setItem('ClearClassId_Lists', selectors/* listAll*/ ).then(function (value) {
      // здесь все получено дальнейшие дествия.
      Log("Сохранено в базу при закрытии","info",value);
    }).catch(function (err) {
      // Произошла ошибка
      Log("Ошибка записи в базу","error",err);
    });
  })

  console.log("Есть связь с popup.js...")
})


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
function Log(message, color, obj) {
  // chrome-devtools:  chrome-extension:
  if (logEnabled == false) return;

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
    case "err":
      color = "Red";
      break;
    case "warning":
      color = "Orange";
      break;
    default:
      color = color;
  }

  if (obj) {
    var objmess = JSON.stringify(obj);//obj.message;
     console.log("%cClearClassId : %c" + message, 'color: blue;font-weight: bold', "color:" + color, obj);
    // objmess = objmess.replace(/['"]+/g, '');
    chrome.tabs.executeScript({
      code: "console.log('%cClearClassId : %c" +"12 "+ message + "','color: blue;font-weight: bold', 'color: " + color + "'," + objmess + ");",
      allFrames: allFrames
      //    code: "var obja = JSON.parse('"+objmess+"'); console.log(obja);"
    }, catchLastErrorLog);
  }
  else {
    console.log("%cClearClassId : %c" + message, 'color: blue;font-weight: bold', "color:" + color);
    chrome.tabs.executeScript({
      code: "console.log('%cClearClassId : %c" + message + "','color: blue;font-weight: bold','color: " + color + "');",
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


