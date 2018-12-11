function startT(){
var countTik=0;
var sint = setInterval(function(){
	console.log("check clear class  tik..."+countTik++ );
  var a = document.getElementsByClassName("globalClass_ET");
   if(a[0]){
       while(a[0]){
       a[0].parentNode.removeChild(a[0]);
       console.log("очистка globalClass_ET yes"); 
      }
    }
      a = document.getElementsByClassName("sendpulse-prompt");
      if(a[0]){
          while(a[0]){
          a[0].parentNode.removeChild(a[0]);
          console.log("очистка sendpulse-prompt yes"); 
         }
        }
	   
  	
   if(countTik >= 6 ){
	   clearInterval(sint);
   }
   
},1000);
}
startT();
