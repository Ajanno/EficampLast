$(document).on("ready", function() {

    var $form = $("#login-form");
    var $passField = $(".login-name");
    var $passBoxes = $(".my-pass");
    var $noPassBox = $(".pass-none");
    var $wrongPassBox = $(".pass-wrong");
    var $submitButton = $(".submit-button");
    var newUrl = "dashboard.html";
    var notify = [{
            notifyText: "Lorem ipsum dolor sit amet."
        }, {
            notifyText: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, et, rerum!"
        }, {
            notifyText: "Dolor sit amet, consectetur adipisicing elit. Aut quos itaque dolor! Impedit!Lorem ipsum dolor sit amet."
        },
         {
            notifyText: "Dolor sit amet, consectetur adipisicing elit. Aut quos itaque dolor! Impedit!Lorem ipsum dolor sit amet."
        },
         {
            notifyText: "Dolor sit amet, consectetur adipisicing elit. Aut quos itaque dolor! Impedit!Lorem ipsum dolor sit amet."
        },
         {
            notifyText: "Dolor sit amet, consectetur adipisicing elit. Aut quos itaque dolor! Impedit!Lorem ipsum dolor sit amet."
        },

    ];

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
    function is$passFieldIsempty() {
        return $passField.val().length !== 0;
    } // end of is$passFieldIsEmty

    function hideOrShow$noPassBox() {
        if (is$passFieldIsempty()) {
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
        hideOrShow$noPassBox();
    }); //end of form validation

    //Login Scirpt
    $form.on("submit", function(event) {
        event.preventDefault();
        if (is$passFieldIsempty()) {
            efiapi($passField.val());
        }
    }); //end of submit	 
 //DASHBOARD PAGES SCRPITS
    //MESSAGES
     function massageGenerator(){
    	let list = "<ul>"
	    $.each(notify, function() {
	        $.each(this, function(name, value) {
	            list += "<li>" +value+" </li>"
	        });
	    });
	    list += "</ul>";
	    return list;	   	
	}

	//Massege notification
    if (notify.length > 0) {
        $(".dashboard-massages span").show().text(notify.length);
    } else {
        $(".dashboard-massages span").hide()
    }
    //Message tooltip
    $(".dashboard-massege-toolpip").html(massageGenerator()).hide();
  	$(".dashboard-massages").on("click", function(event) {
  		event.preventDefault();
  		$(".dashboard-massege-toolpip").toggle("slow");
  	});
}); //end of document