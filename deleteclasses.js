  var logEnabled = true;
  
  //перетянем кнопку с трансляцией каналов
  try{
  var but = document.getElementsByClassName("button_broadcasting");
  if(but[0]){
  var kuda = document.getElementsByClassName("filters__title-wrapper");
  if(kuda[0])
	  kuda[0].appendChild(but[0]);
  }
}catch(e){
  Log("Ошибка. при перетягивании кнопки DOM","error",e);
}
  removeTags();
function removeTags(){
  
  var arrClass = '.super-banner,.main-controller__adv-bottom,.footer,header,.recommended-top,.grid-chunk__column-box,\
  .grid-chunk__adv-wide,.content__adv-aside,.content__adv-footer';
  var arrClass = document.querySelectorAll(arrClass);
  let listErr = "";
  for (let i = 0; i < arrClass.length;i++) {
    
    try {
      if (arrClass[i]) {
        arrClass[i].parentNode.removeChild(arrClass[i]);
        listErr += arrClass[i].className + ",";
      }
    } catch (e) {
      Log("Ошибка","error",e)
    }
  }
    
  /////////////////////////////
//   arrClass = arrClass.split(",");
//   var arr = arrClass;
//   var i, len;
//  // Log("yandex очистка старт...","success");
//   var listErr="";
//  for (i = 0, len = arr.length; i < len; ++i) {
//   var a = document.getElementsByClassName(arr[i]);
//   if(a[0]){
     
//       while(a[0]){
//       a[0].parentNode.removeChild(a[0]);
//     //  Log("yandex удаление: "+arr[i]+" yes","maroon"); 
//       listErr += arr[i]+",";
//       }
      
//     }
//   } 
  ///////////////////////////////
   var arrC = []; arrC["Clear"] = listErr? listErr.slice(0, -1).split(","):"не обнаружено";
   Log("yandex очистка выполнена.","success",arrC);  

  //  перестраиваем перетягиваем из бокса элементы и удаляем сам бокс
  try{
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
      }catch(e){
        Log("Ошибка. при перестройке DOM","error",e);
      }

// var filters =  document.getElementsByClassName("filters");  
// var items = document.getElementsByClassName("grid__item");

//    var a=5;
 //  for (var i =0;i<a;i++){
 // while (items[0]){
    // if(items)
    // if(filters[0]){
    //    var i=0;
    //    while(items[0])
    //    {
    //      if(items[0]) {
    //       Log("удалили итем.","success",items[0]);
    //       filters[0].appendChild(items[0]);
    //       //items[0].parentNode.removeChild(items[0]);
    //    //   items[0].classList.remove("grid__item");
    //      }
    //   }
    //     i++;
    //   //  if (i>3) items[0] = null;
    //   }
 //   }

  // var filters =  document.getElementsByClassName("filters");
// if(filters)
//   var mgrid =  filters[0].getElementsByClassName("grid");
//    if(mgrid) 
//     var grid_chunk = mgrid[0].getElementsByClassName("grid-chunk"); 
//      if(grid_chunk){
//        while(grid_chunk[0])
//           {
//             Log("Дgrid_chunk","success");
//             var items = grid_chunk[0].getElementsByClassName("grid__item");  
//               if(items)
//                 while (items[0]){
//                    filters[0].appendChild(items[0]);
//                    Log("Добавили итем.","success"); 
//                 }
//                if(grid_chunk[0]) grid_chunk[0].parentNode.removeChild(grid_chunk); 
//           }
                  
//         }  
}
 
setTimeout(function () {
    removeTags();
    },5000); // таймер


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