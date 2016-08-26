$(document).on("ready", function() {
    var notify = [{
            notifyText: "Lorem ipsum dolor sit amet."
        }, {
            notifyText: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, et, rerum!"
        }, {
            notifyText: "Dolor sit amet, consectetur adipisicing elit. Aut quos itaque dolor! Impedit!Lorem ipsum dolor sit amet."
        }, {
            notifyText: "Dolor sit amet, consectetur adipisicing elit. Aut quos itaque dolor! Impedit!Lorem ipsum dolor sit amet."
        },


    ];
    //MESSAGES
    function massageGenerator() {
        let list = "<ul>"
        $.each(notify, function() {
            $.each(this, function(name, value) {
                list += "<li>" + value + " </li>"
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



    //Funkcja wysyła zapytanie do api o przekazuje funkcje callback  
    function efiApiEngine(endpoint, callback) {
        $.ajax({
            type: "get",
            url: "https://efigence-camp.herokuapp.com/api/" + endpoint,
            success: function(response) {

                callback(response);


            }

        });
    }


    efiApiEngine("data/summary", function(data) {
        console.log(data.content[0]);
        $(".dashboard-summary-balance").text(data.content[0].balance);
        $(".dashboard-summary-funds").text(data.content[0].funds);
        $(".dashboard-summary-payments").text(data.content[0].payments);

    });









}); //end of document