$(document).on("ready", function() {

    var $form = $("#login-form");
    var $passField = $(".login-name");
    var $passBoxes = $(".my-pass");
    var $noPassBox = $(".pass-none");
    var $wrongPassBox = $(".pass-wrong");
    var newUrl = "dashboard.html";

    //Login Page Scrips
    //Core of login page API-Engine
    function efiapi(pass) {
        $.ajax({
            type: "post",
            data: {
                login: "efi",
                password: pass
            },

            url: "https://efigence-camp.herokuapp.com/api/login",
            error: function(response) {
                var badresp = $.parseJSON(response.responseText);
                $(".pass-wrong p").text(badresp.message);
                $wrongPassBox.show('slow').attr('aria-hidden', false)
                    .delay(1000)
                    .hide('slow').attr('aria-hidden', true);
            },
            success: function(response) {

                $(location).attr('href', newUrl);
            }

        });
    } //End of efiapi
    //Login field validation
    function isPassFieldIsempty() {
        return $passField.val().length !== 0;
    } // end of is$passFieldIsEmty

    function hideOrShownoPassBox() {
        if (isPassFieldIsempty()) {
            $noPassBox.hide("slow").attr('aria-hidden', true);
            $passField.attr('aria-invalid', false);

        } else {
            $noPassBox.show("slow").attr('aria-hidden', false);
            $passField.attr('aria-invalid', true);

        }
    } //end of hideOrShow

    //Login Page Animations
    $passBoxes.hide().attr('aria-hidden', true);

    $passField.on("focus keyup keydown", function() {
        hideOrShownoPassBox();
    }); //end of form validation

    //Login Scirpt
    $form.on("submit", function(event) {
        event.preventDefault();
        if (isPassFieldIsempty()) {
            efiapi($passField.val());
        }
    }); //end of submit	 

}); //end of document