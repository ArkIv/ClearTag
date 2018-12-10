function startT(){
var countTik=0;
var sint = setInterval(function(){
	console.log("check Global ET tik..."+countTik++ );
  var a = document.getElementsByClassName("globalClass_ET");
   if(a[0]){
	   clearInterval(sint);
       while(a[0]){
       a[0].parentNode.removeChild(a[0]);
      }
	  console.log("очистка Global ET yes");  

   }	
   if(countTik >= 6 ){
	   clearInterval(sint);
   }
   
},1000);
}
startT();
