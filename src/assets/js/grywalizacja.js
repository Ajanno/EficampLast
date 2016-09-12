$(document).on("ready", function() {
    //funkcja filtrujaca
    $(".grywalizacja-button").on("click", function(event) {
        event.preventDefault();
        $(this).removeClass("non-active").siblings(".grywalizacja-button").addClass('non-active');

        if ($(this).hasClass("not-done")) {
            $(".account-achievments.done").hide();

        } else {
            $(".account-achievments").show();
        }
    });
}); //Ready End