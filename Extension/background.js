function onClickHandler(info){
   var details = {}
   details.title = info.selectionText;
   details.url = info.srcUrl;
   details.comments= info.selectionText;
   details.tags= info.selectionText;
   details.rating= info.selectionText;

   chrome.windows.create({url: "../window.html", type: "popup", width: 370, height: 360}, function() {
      chrome.runtime.sendMessage({details: details}, function(response){});
   });
}



//Create context menu that shows up for images
chrome.contextMenus.create({
   "title": "Save to MemeMaster", 
   "type" : "normal",
   "contexts":["image"],
   "onclick": onClickHandler

});
