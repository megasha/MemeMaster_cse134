function onClickHandler(info){
   var details = {}
   details.url = info.srcUrl;
   
   window.localStorage.setItem('url', details.url);
   chrome.windows.create({url: "../window.html", type: "popup", width: 370, height: 400}, function() {
   });
}



//Create context menu that shows up for images
chrome.contextMenus.create({
   "title": "Save to MemeMaster", 
   "type" : "normal",
   "contexts":["image"],
   "onclick": onClickHandler

});
