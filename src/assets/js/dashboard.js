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
    var apiUrl = "https://efigence-camp.herokuapp.com/api/"
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

    function efiApiEngine(endpoint, callback) {
        $.ajax({
            type: "get",
            url: apiUrl + endpoint,
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

    function efiProductsData() {
        efiApiEngine("data/products", function(data) {
            let productsData = data.content,
                productsContainer = '';
            $.each(productsData, function(index) {
                let productsType = productsData[index].type,
                    productsElement = productsData[index].elements,
                    productsAmount = productsData[index].amount.toFixed(2).toLocaleString(),
                    productsCurrency = productsData[index].currency;

                if (!productsElement == 0) {
                    productsContainer += '<div class="' + productsType + ' ' + 'columns products-button">' +
                        '<a href="#"><span>' + productsType + ' [' + productsElement + ']' + '<br>' +
                        productsAmount + ' ' +
                        productsCurrency +
                        '</span></a>';

                } else {

                    productsContainer += '<div class="columns products-button">' +
                        '<a href="#"><span>' + productsType + '<br>' +
                        productsAmount + ' ' +
                        productsCurrency +
                        '</span></a>';
                }
                productsContainer += '</div>';
            });
            $(".products-container").html(productsContainer);


        });
    }
    efiProductsData();

    function dateFormating(data) {
        let dateData = new Date(data)
        let dateDays = dateData.getDate();
        let dateMonth = dateData.getMonth() + 1;
        return dateDays + "." + dateMonth;

    }


    function efiHistoryData() {
        efiApiEngine("data/history", function(data) {
            let historyData = data.content,
                list = "<ul>";


            $.each(historyData, function(index) {

                if (historyData[index].status === "income") {
                    list += '<li class="income">';
                } else {
                    list += '<li>';
                }
                let dateData = dateFormating(historyData[index].date),
                    descriptionData = historyData[index].description,
                    catergoryData = historyData[index].category,
                    amountData = historyData[index].amount.toFixed(2).toLocaleString(),
                    currencyData = historyData[index].currency;



                list += '<div class="history-column"><span class="history-date">' + dateData + '</span>' +

                    '</div><div class="history-column">' +
                    '<span class="history-description">' + descriptionData + '</span><br>' +
                    '<span class="history-category">' + catergoryData + '</span>' +
                    '</div><div class="history-column">' +

                    '<span class="history-amount">' + amountData + '</span>' +
                    '<span class="history-currency">' + currencyData + '</span></div>' +
                    '</li>';
            });
            list += "</ul>"
            $(".history").html(list);

        });
    }
    efiHistoryData();
}); //end of document