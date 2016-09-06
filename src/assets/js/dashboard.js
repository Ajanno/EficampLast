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
    function dateFormating(data) {
        let dateData = new Date(data)
        let dateDays = dateData.getDate();
        let dateMonth = dateData.getMonth()+1;
        return dateDays +"."+ dateMonth;

     }
    function efiHistoryData() {
        efiApiEngine("data/history", function(data) {
            let historyData = data.content;
            let list = "<ul>";
           
            $.each(historyData, function(index) {
                list += "<li>";
                //stworzyc spany
                //formatowanie daty
                    // zaprasowac dane  
                    // pobrac dni i pobrac miesce
                    // stworzyc string dd.mm
                let dateData = dateFormating(historyData[index].date),
                    descriptionData = historyData[index].description,
                    catergoryData = historyData[index].category,
                    amountData = historyData[index].amount,
                    currencyData = historyData[index].currency;



                list += '<div class="history-column"><span class="history-date">' + dateData + '</span>' +

                    '</div><div class="history-column">'+
                    '<span class="history-description">' + descriptionData + '</span><br>' +
                    '<span class="history-category">' + catergoryData + '</span>' +
                    '</div><div class="history-column">'+

                    '<span class="history-amount">' + amountData + '</span>' +
                    '<span class="history-currency">' + currencyData + '</span></div>' +
                    '</li>';
            });
            list+="</ul>"
            $(".history").html(list);
         
        });
    }
    efiHistoryData();
    //Pobieram dane z  serwera
    //wyciagam 1 obiekt
    // twoerze pentle ktora bedzie generowala html z pierwszego obiektu
    // zapentlam dane

    // for (i=0, i<historyData.length, i+=1h )

    // function historyGenerator() {
    //     let list = "<ul>";
    //        let dsds =efiHistoryData()
    //     $.each(dsds, function() {
    //         $.each(this, function(name, value) {
    //             list += "<li>" + value + " </li>";
    //         });
    //     });
    //     list += "</ul>";
    //     return list;
    // }




}); //end of document