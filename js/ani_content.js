anicontent();
function anicontent() {

    let logEnabled = true;
    window.onload = function () {
        Log("Загружен контент скрипт");
        var body = document.body || document.getElementsByTagName('body')[0];
        let div = document.createElement('div');
        div.id = "ClearClassId";
    
        var img = document.createElement("img");
        img.setAttribute("src", chrome.extension.getURL("/icon/clear_20.png"));
        img.setAttribute("height", "20");
        img.setAttribute("width", "20");
        //img.setAttribute("alt", "Flower");
        div.appendChild(img);
        body.appendChild(div);
    }

    let сlassList = "";
    function removeElements() {
        let arrClass = document.querySelectorAll(сlassList);
        let listErr = "";
        for (let i = 0; i < arrClass.length; i++) {

            try {
                if (arrClass[i]) {
                    arrClass[i].parentNode.removeChild(arrClass[i]);
                    listErr += arrClass[i].className + ",";
                }
            } catch (e) {
                Log("Ошибка", "error", e)
            }
        }
        let arrC = []; arrC["Clear"] = listErr ? listErr.slice(0, -1).split(",") : "не обнаружено";
        Log("Очистка выполнена.", "success", arrC);
    }



    // chrome.extension.onConnect.addListener(function (port) {
    //     port.onMessage.addListener(factory);
    // });
    // function factory(obj){
    //     console.log("ПОРТ:",obj);
    // }
    //===================  отправка одноразового сообщения в расширение ===================
    // chrome.runtime.sendMessage({ greeting: "hello" }, function (response) {
    //     console.log(response.farewell);
    // });
    //==============================================================
    //===================  отправка сообщения  content script-у =============
    // указывается вкладка Id
    // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //     chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" }, function (response) {
    //         console.log(response.farewell);
    //     });
    // });
    //===========================================================

    //=================== использование порта на стороне script content
    var port = chrome.runtime.connect({ name: "Content Script" });
    port.postMessage({ msg: "newTab" });

    port.onMessage.addListener(function (msg) {
        if (msg.setClassList) {
            сlassList = msg.setClassList;
        }
            
        if (msg.func == "removeElement") {
            Log("Принял на функциюсигнал", "info");
            removeElements();
        }

    });

    //================  ловим сообщение - одинаково и для content script и для расширения
    // chrome.runtime.onMessage.addListener(
    //     function (request, sender, sendResponse) {
    //         console.log(sender.tab ?
    //             "from a content script:" + sender.tab.url :
    //             "from the extension");
    //         // if (request.greeting == "hello")
    //         //     sendResponse({ farewell: "goodbye" });  // отправляется только первому кто вызвал sendresponse // читать...
    //     });
    //====================================================    

    //=====================  перехват message и отправка в расширение
    // content script  получит то что послала обычная страница
    // вот этим  -  window.postMessage({ type: "FROM_PAGE", text: "Hello from the webpage!" }, "*");
    // а этим пошлет в расширение port.postMessage(event.data.text); 


    // var port = chrome.runtime.connect();

    // window.addEventListener("message", function (event) {
    //     // We only accept messages from ourselves
    //     if (event.source != window)
    //         return;

    //     if (event.data.type && (event.data.type == "FROM_PAGE")) {
    //         console.log("Content script received: " + event.data.text);
    //         port.postMessage(event.data.text); //  а этим пошлет в расширение..
    //     }
    // }, false);
    //==============================




    // chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    //     if (request.greeting === "GetURL") {
    //         var tabURL = "Not set yet";
    //         chrome.tabs.create({ url: 'http://google.de' }, function (tab) {  //create tab
    //             chrome.tabs.executeScript(tab.id, { file: 'content.js' }, function () {  //inject content script
    //                 chrome.tabs.sendMessage(tab.id, { greeting: "hello" });  //send message to content script
    //             });
    //         });
    //     }
    // });
    //   Это для логов  ============================================================
    function Log(message, color, obj) {
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
            case "warning":
                color = "Orange";
                break;
            default:
                color = color;
        }

        if (obj) {
            var objmess = JSON.stringify(obj);//obj.message;
            console.log("%cClearClassId : %c" + message, 'color: blue;font-weight: bold', "color:" + color, obj);
        }
        else {
            console.log("%cClearClassId : %c" + message, 'color: blue;font-weight: bold', "color:" + color);
        }
    }


}