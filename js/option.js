$(function() {

  var keyword = localStorage["keyword"];
  if(keyword == null) keyword = default_keyword;
  $("#keyword").val(keyword);
  $("#keyword").change(function() {
    localStorage["keyword"] = $(this).val();
    log("keyword put", localStorage["keyword"]);
  });

  var close = localStorage["close"];
  log("close get", close);
  if(close == null) close = default_close;
  $("#close").val(close);
  $("#close").change(function() {
    localStorage["close"] = $(this).val();
    log("close put", localStorage["close"]);
  });

});
