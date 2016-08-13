
var $passField = $(".login-name");
var	$noPassBox = $(".pass-none");
var $submitButton = $(".submit-button");



function efiapi(pass){
	$.ajax({
	  type: "post",
	  data: {
	    login: "efi",
	    password: pass
	  },

	  url: "https://efigence-camp.herokuapp.com/api/login",
	  error: function(response) {
	    console.log(response.responseText);
	    $(".pass-allert").html("<p>Blędne hasło </p>");


	  },
	  success: function(response) {
	    console.log(response);

	  }

	});
	}

function is$passFieldIsempty(){
	console.log($passField.val().length!=0);
	return $passField.val().length!=0;
}
function hideOrShow$noPassBox(){
	if(is$passFieldIsempty()){
		$noPassBox.hide("slow");
		console.log("pole jest pelne");
	} else {
		$noPassBox.show("slow");
		console.log("pole jest puste");
	}
} 




$(document).on("ready", function(){
	//Chowam boxy i blokuje przycisk
	$noPassBox.hide();
	// validacja pola
	$passField.focus(function(){
		hideOrShow$noPassBox();
		console.log("funkcja focus");
	}).keyup(function(){
		hideOrShow$noPassBox();
		console.log("funkcja key up");
	})
	.keydown(function(){
		hideOrShow$noPassBox();
		console.log("funkcja key down");
	});
	



	

	$submitButton.on("click", function(event){
		event.preventDefault();
		var login = $passField.val();
		console.log(login);

		//validacja wartosci iputa
		if (login.length!=0) {
			efiapi(login);
		} else {
			alert('wprowadz hasło');
		}





	});

	//funkcja 2
	$(".login-avatar").on("click", function() {
		alert($(this).attr("src"));
		
	});

	//funkcja 3
	


});