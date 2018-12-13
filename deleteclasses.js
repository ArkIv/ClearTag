  var logEnabled = false;
  
  //перетянем кнопку с трансляцией каналов
  var but = document.getElementsByClassName("button_broadcasting");
  if(but[0]){
  var kuda = document.getElementsByClassName("filters__title-wrapper");
  if(kuda[0])
	  kuda[0].appendChild(but[0]);
  }
   removeTags();
function removeTags(){
  
  var arrClass = 'super-banner,main-controller__adv-bottom,footer,header,recommended-top,grid-chunk__column-box,\
  grid-chunk__adv-wide,content__adv-aside,content__adv-footer';
  arrClass = arrClass.split(",");
  var arr = arrClass;
  var i, len;
 for (i = 0, len = arr.length; i < len; ++i) {
  var a = document.getElementsByClassName(arr[i]);
  if(a[0]){
      while(a[0]){
      a[0].parentNode.removeChild(a[0]);
      Log("yandex очистка: "+arr[i]+" yes","maroon"); 
      }
    }
   }   

  //  перестраиваем перетягиваем из бокса элементы и удаляем сам бокс
var chunk = document.getElementsByClassName("grid-chunk"); // Здесь должны быть все каналы
if(chunk[0]) // если в нем есть контейнер запомним его
  var combo = chunk[0].getElementsByClassName('grid-chunk__combo-container'); //это будем удалять
  if(combo)
   if(combo[0]) // если есть такой то в нем должны быть итемы
      var rowbox = combo[0].getElementsByClassName('grid-chunk__row-box');
      if(rowbox)
       if(rowbox[0])
        var items =rowbox[0].getElementsByClassName("grid__item");
         if(items)
           if(items[0])
            {
            while(items[0]) // если есть каналы то преносим их каналы и перед контейнером
              chunk[0].insertBefore(items[0],combo[0]);
            if(combo[0]) combo[0].parentNode.removeChild(combo[0]); 
            }
   
}
  setTimeout(function(){
	removeTags();
    },1500); // таймер


    //   Это для логов  ============================================================
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