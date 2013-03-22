//http://blog.monoweb.info/blog/2012/11/08/chrome-event-pages/

var keyword = localStorage["keyword"];
var close = localStorage["close"];
function getSetting() {
  keyword = localStorage["keyword"];
  if(keyword == null) {
    keyword = default_keyword;
    localStorage["keyword"] = keyword;
  }
  close = localStorage["close"];
  if(close == null) {
    close = default_close;
    localStorage["close"] = close;
  }
  close = parseInt(close) * 1000;
}
$(function() {
  getSetting();
  log("keyword", keyword);
  log("close", close);
});

chrome.runtime.onInstalled.addListener(function() {
//  chrome.alarms.create('ayase', { periodInMinutes: 1 });
  chrome.alarms.create('ayase', { periodInMinutes: 0.1 });
});

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm) {
    if (alarm.name == 'ayase') {
      console.log("alerm in")
      chrome.runtime.getBackgroundPage(getImage);
    }
  }
});

function getImage() {
  getSetting();
  log("-> keyword", keyword);
  log("-> close", close);
  if (close == 0) return;
  $.ajax({
    url: "http://image.search.yahoo.co.jp/search?p=" + encodeURI(keyword) + "&aq=0&ei=UTF-8",
    type: 'GET',
  }).then(
    function(res){
      var imgs = $(res).find("#ISm .tb img");
      if (imgs.length == 0) {
        localStorage["keyword"] = "アントニオ猪木";
        getImage();
      }
      var idx = Math.floor(Math.random() * imgs.length);
      var img = imgs[idx];
      var notification = window.webkitNotifications.createHTMLNotification(
        chrome.extension.getURL("test.html?url=" + $(img).attr("src"))
      );
      notification.ondisplay = function(){
        setTimeout(function(){notification.cancel();}, close);
      }
      notification.show();
    },
    function(res){
      console.log(res)
    }
  );
}

