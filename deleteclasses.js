  var but = document.getElementsByClassName("button_broadcasting");
  if(but[0]){
  var kuda = document.getElementsByClassName("filters__title-wrapper");
  if(kuda[0])
	  kuda[0].appendChild(but[0]);
  }
  removeTags();
function removeTags(){
	var u = document.getElementsByClassName("super-banner");
  if(u[0])u[0].remove();
  u = document.getElementsByClassName("main-controller__adv-bottom");
  if(u[0])u[0].remove();
    u = document.getElementsByClassName("footer");
  if(u[0])u[0].remove();
    u = document.getElementsByClassName("header");
  if(u[0])u[0].remove();
  u = document.getElementsByClassName("recommended-top");
  if(u[0])u[0].remove();
    u = document.getElementsByClassName("grid-chunk__column-box");
  if(u[0])u[0].remove();
    u = document.getElementsByClassName("grid-chunk__adv-wide");
  while(u[0]){
		 u[0].parentNode.removeChild(u[0]);
	   }
  
  
  console.log("очистка яндекс tv");

  // перестраиваем
  var combo = document.getElementsByClassName('grid-chunk__combo-container'); //это будем удалять
  if(combo[0]){
  
   var divs = document.getElementsByClassName('grid-chunk__row-box'); // 
   if(divs[0]){
   var items =divs[0].getElementsByClassName("grid__item");
   if(items[0]){
      var chunk = document.getElementsByClassName("grid-chunk");
        if(chunk[0]){
           for(x = 0; x < items.length; x++) {
           chunk[0].insertBefore(items[x],combo[0]);
          }
		  combo[0].style.display = 'none';
		 //setTimeout(function(){ combo[0].remove()},1000);
	  }
    }
   }
  }
  // конец перестраиваем
  
 // u = document.getElementsByClassName("button_program-type_films");
 //  if(u[0])u[0].classList.add("button_selected");
    
}
  setTimeout(function(){
	removeTags();
    },1500); // таймер