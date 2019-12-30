$(function() {
    var socket = io();
    $(":input").on("input", function () {
      var type = $(this).attr('class');
      var idname = $(this).attr('id');
      var val = $(this).val();
      socket.emit("change:interval", type, val, idname);
      // console.log('Message from ' + idname, " With value: " + val); 
    });
});