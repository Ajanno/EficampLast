$(document).on("ready", function() {
	 //DASHBOARD PAGES SCRPIT

	 //Funkcja wysyła zapytanie do api o przekazuje funkcje callback  
	 function efiApiEngine( endpoint , callback){
	 	$.ajax({
            type: "get",
      
            url: "https://efigence-camp.herokuapp.com/api/"+endpoint,
            success: function(response) {

            	callback( response );

                
            }

        });
	 }


	  efiApiEngine( "data/summary" , function(data) {
	  	console.log(data.content[0]);
	  	$(".dashboard-summary-balance").text(data.content[0].balance);
	  	$(".dashboard-summary-funds").text(data.content[0].funds);
	  	$(".dashboard-summary-payments").text(data.content[0].payments);

	  });









  
}); //end of document