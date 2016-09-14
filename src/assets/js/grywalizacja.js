$(document).on("ready", function() {
    //funkcja filtrujaca
    $(".grywalizacja-button").on("click", function(event) {
        event.preventDefault();
        $(this).removeClass("non-active").siblings(".grywalizacja-button").addClass('non-active');

        if($(this).hasClass("not-done")){
        $(".thumbnail-container .column").hide();
        $(".thumbnail-container .column.thumbnail-checked").show();
}else {
    $(".thumbnail-container .column").show();
}
       
    });
    //funkcja checked
    // $(".account-achievments").children('.checked').toggle();
    // $(".account-achievments").on("click", function(){
    //     $(this).children('.progres').toggle();
    //     $(this).children('.checked').toggle();

    // });
    $(".thumbnail-container .column").on("click", function(){
        if($(this).hasClass("thumbnail-checked")){
            $(this).removeClass("thumbnail-checked"); 
        } else{
        $(this).addClass("thumbnail-checked");
     }
    });

}); //Ready End