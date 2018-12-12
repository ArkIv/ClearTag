function startT(){
 // alert(div.innerHTML);
var countTik=0;
var sint = setInterval(function(){
	Log("check clear class  tik..."+countTik++,"info" );
  var a = document.getElementsByClassName("globalClass_ET");
if(a[0]){
    while(a[0]){
    a[0].parentNode.removeChild(a[0]);
    Log("очистка globalClass_ET yes","success"); 
    }
  }
a = document.getElementsByClassName("sendpulse-prompt");
if(a[0]){
    while(a[0]){
    a[0].parentNode.removeChild(a[0]);
    Log("очистка sendpulse-prompt yes","success"); 
    }
  }
a = document.getElementsByClassName("adtester-container");
if(a[0]){
    while(a[0]){
    a[0].parentNode.removeChild(a[0]);
    Log("очистка adtester-container yes","success"); 
    }
  }
        
   if(countTik >= 6 ){
	   clearInterval(sint);
   }
   
},1000);
}
startT();


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