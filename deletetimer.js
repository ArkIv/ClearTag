function startT(){
 // var arrClasses = ClearClassBuffer;
  // эти переменные уже объявлены ранее в предзагрузке скрипта
  ClearClassBuffer = ClearClassBuffer.split(",");
  ClearIdBuffer = ClearIdBuffer.split(",");
  var arrC = []; arrC["Class List"] = ClearClassBuffer? ClearClassBuffer:"Нет списка";
   Log("Получили список классов: ","info",arrC);
  var arrC = []; arrC["ID List"] = ClearIdBuffer? ClearIdBuffer:"Нет списка";
   Log("Получили список ID: ","info",arrC);
 //  var arrIdClass = divIdList.innerHTML.split(",");
 //  Log("Читаем с Div список классов: ","info",arrIdClass);
var countTik=0;
var countMaxTik=6;
var sint = setInterval(function(){
  // if(countTik == 0)
  //  Log("Поиск классов для очистки, старт...","info" );
    var arr = ClearClassBuffer;
    var i, len;
    var listErr="";
   for (i = 0, len = arr.length; i < len; ++i) {
    var a = document.getElementsByClassName(arr[i]);
    if(a[0]){
        while(a[0]){
        a[0].parentNode.removeChild(a[0]);
   //     Log("очистка "+arr[i]+" yes","success"); 
        listErr += "Cl: "+arr[i]+",";
        }
      }
   }    
   var arr = ClearIdBuffer;
   var i, len;
  for (i = 0, len = arr.length; i < len; ++i) {
   var a = document.getElementById(arr[i]);
   if(a){
       a.parentNode.removeChild(a);
       listErr += "Id: "+arr[i]+",";
   //    Log("очистка Id:"+arr[i]+" yes","success"); 
       }
  }     
    
   if(countTik >= countMaxTik ){
     clearInterval(sint);
     if(listErr.length>0)
      {
        var arrC = []; arrC["Clear"] = listErr? listErr.slice(0, -1).split(","):"не обнаружено";
      Log("Очистка окончена: ","info" ,listErr);
      } 
      else
      Log("Очистка окончена: ","info" ,"Не найдено");
   }
    else{
      if(listErr.length>0)
      {
        var arrC = []; arrC["Clear"] = listErr? listErr.slice(0, -1).split(","):"не обнаружено";
        Log("Очистка ("+(countMaxTik - countTik)+"): ","info" ,arrC);
      }

    }
 countTik++;     
},1000);
}
startT();
mutationEnable();
// ============== Mutation ===============  ловим изменения DOM ===============
function mutationEnable(){
  // выбираем целевой элемент
//  var target = document.getElementById('some-id');
  var target = document; // весь документ
  // создаём экземпляр MutationObserver
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
   // Log("mutation: ","warning",mutation);
  });    
});
 // конфигурация нашего observer:
// childList - добавление изменение элементов
// var config = { subtree: true,  attributes: true, characterData: true, childList: true };
// Обязательно установить одно из этих (childList, attributes, characterData)иначе ошибка
var config = { subtree: true, childList: true };
// передаём в качестве аргументов целевой элемент и его конфигурацию
observer.observe(target, config);
 // позже можно остановить наблюдение
//observer.disconnect();
}

//   Это для логов  ============================================================
function Log(message, color,obj) {
  //if(logEnabled == false) return;
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
   }
   else{
     console.log("%cClearClassId : %c"+message,'color: blue;font-weight: bold', "color:" + color);
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