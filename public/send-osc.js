$(function() {
    var socket = io();
    $(":input").on("input", function () {
      var idname = $(this).attr('id');
      var val = $(this).val();
      socket.emit("change:interval", val, idname);
      // console.log('Message from ' + idname, " With value: " + val); 
    });
});