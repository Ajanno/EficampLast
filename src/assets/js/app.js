//$(document).foundation();
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
	  },
	  success: function(response) {
	    console.log(response);
	  }
	});
	}





$(document).on("ready", function(){

	// funckcja 1
	$(".submit-button").on("click", function(event){
		event.preventDefault();
		var login = $(".login-name").val();
		console.log(login);


		if (login.length != 0) {
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