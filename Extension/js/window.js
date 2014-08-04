Firebase.enableLogging(true);
var fBase = new Firebase('https://mememaster-group6.firebaseio.com');
var myData = {};

window.onload = saveImage();

function saveImage(){
 
   document.getElementById('save').onclick = saveImage = function()
   {
	   myData.url = window.localStorage.getItem('url');
	  
	   myData.meme_name = $('input[name="title"]').val();
	   myData.date = new Date();
	   myData.comment = $('textarea[name="comments"]').val();
	   myData.tags = $('input[name="tags"]').val();
       myData.rating= $('input[name="rating-1"]:checked').val();	  
		
       fBase.push(myData);
	   
       window.close();	
		
   }
}
