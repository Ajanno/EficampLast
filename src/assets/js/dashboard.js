$(document).on("ready", function() {
    var notify = [{
        notifyText: "Lorem ipsum dolor sit amet."
    }, {
        notifyText: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, et, rerum!"
    }, {
        notifyText: "Dolor sit amet, consectetur adipisicing elit. Aut quos itaque dolor! Impedit!Lorem ipsum dolor sit amet."
    }, {
        notifyText: "Dolor sit amet, consectetur adipisicing elit. Aut quos itaque dolor! Impedit!Lorem ipsum dolor sit amet."
    }, ];
    //MESSAGES
    function massageGenerator() {
        let list = "<ul>";
        $.each(notify, function() {
            $.each(this, function(name, value) {
                list += "<li>" + value + " </li>";
            });
        });
        list += "</ul>";
        return list;
    }

    //Massege notification
    if (notify.length > 0) {
        $(".dashboard-massages span").show().text(notify.length);
    } else {
        $(".dashboard-massages span").hide();
    }

    //Message tooltip
    $(".dashboard-massege-toolpip").html(massageGenerator()).hide();
    $(".dashboard-massages").on("click", function(event) {
        event.preventDefault();
        $(".dashboard-massege-toolpip").toggle("slow");
    });
    //Nav basic animation
    $(".dashboard-main-nav li").on("click", function() {
        $(this).addClass('dashboard-selected')
            .siblings().removeClass('dashboard-selected');
    });



    //Funkcja wysyła zapytanie do api o przekazuje funkcje callback
    //Dobrą praktyką jest sprawdzenie callbacka czy jest to funcja
    //If(typeof = "function"){callback};

    function efiApiEngine(endpoint, callback) {
        $.ajax({
            type: "get",
            url: "https://efigence-camp.herokuapp.com/api/" + endpoint,
            success: function(response) {

                callback(response);


            }

        });
    }

    function efiSummary(summaryKey) {
        efiApiEngine("data/summary", function(data) {
            var currency = "PLN"
            var currencyTaged = '<span class="currency">' + currency + '</span>'
            var amount = data.content[0][summaryKey].toLocaleString()
            $(".dashboard-summary-stats." + summaryKey).html(amount + ' ' + currencyTaged);

        });
    }
    efiSummary("balance");
    efiSummary("funds");
    efiSummary("payments");

    function efiHistoryData() {
        efiApiEngine("data/history", function(data) {
            return (data.content);
        });
    }

    // function historyGenerator() {
    //     let list = "<ul>";
    //     $.each(efiHistoryData(), function() {
    //         $.each(this, function(name, value) {
    //             list += "<li>" + value + " </li>";
    //         });
    //     });
    //     list += "</ul>";
    //     return list;
    // }




}); //end of document