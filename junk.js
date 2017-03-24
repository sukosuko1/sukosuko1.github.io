
$(document).ready(function() {
    $(this).on('keypress', function(event) {
        $("#bubble1").text(event.keyCode);
    });
})

