
var $form = $("#login-form");
var $passField = $(".login-name");
var $passBoxes = $(".my-pass");
var	$noPassBox = $(".pass-none");
var $wrongPassBox = $(".pass-wrong");
var $submitButton = $(".submit-button");
var newUrl = "http://google.com"



function efiapi(pass){
	$.ajax({
	  type: "post",
	  data: {
	    login: "efi",
	    password: pass
	  },

	  url: "https://efigence-camp.herokuapp.com/api/login",
	  error: function(response) {
	  	var badresp = $.parseJSON(response.responseText);
	    console.log($.parseJSON(response.responseText));
	    // alert(badresp.message);
	    $(".pass-wrong p").text(badresp.message);
	    $wrongPassBox.show('slow').attr('aria-hidden', false)
	    			.delay(1000)
	    			.hide('slow').attr('aria-hidden', true);


	  },
	  success: function(response) {
	    console.log(response);
	    $(location).attr('href',newUrl);


	  }

	});
	}

function is$passFieldIsempty(){
	console.log($passField.val().length!=0);
	return $passField.val().length!=0;
}

function hideOrShow$noPassBox(){
	if(is$passFieldIsempty()){
		$noPassBox.hide("slow").attr('aria-hidden', true);
		$passField.attr('aria-invalid', false);
		
	} else {
		$noPassBox.show("slow").attr('aria-hidden', false);
		$passField.attr('aria-invalid', true);
		
	}
} 




$(document).on("ready", function(){

	

	//Chowam boxy 
	$passBoxes.hide().attr('aria-hidden', true);
	// validacja pola
	$passField.focus(function(){
		hideOrShow$noPassBox();
		
	}).keyup(function(){
		hideOrShow$noPassBox();
		
	})
	.keydown(function(){
		hideOrShow$noPassBox();
		
	});
	
	//zmieniam zachowanie formularza
	$form.on("submit", function(evt){
		evt.preventDefault();
		var login = $passField.val();
		if (login.length!=0) {
			efiapi(login);
		} 
	});

	//funkcja 2
	$(".login-avatar").on("click", function() {
		alert($(this).attr("src"));
		
	});

	//funkcja 3
	


});