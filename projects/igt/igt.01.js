var totalcash = 2000, //cash in the cash pile
        deckoneclicks = 0, //clicks for deck one
        decktwoclicks = 0, //clicks for deck two
        deckthreeclicks = 0, //clicks for deck three
        deckfourclicks = 0, //clicks for deck four
        totalclicks = 0, //total clicks. if == to MAXGAMES stop playing.  
        penalty = 0,   //penalty
        netgain = 0,   //netgain
        email_address = '',
        mail_attachment = '',
        GAME_VERSION = "0.13",
        DECKA_WIN = 100,
        DECKB_WIN = 100,
        DECKC_WIN = 50,
        DECKD_WIN = 50,
	    CASHMAX = 6000, //Maximum amount of cash that can be won.	
	    MAXGAMES = 10; //maxium amount of plays

var DECKA_PENALTY = [0, 0, -150, 0, -300, 0, -200, 0, -250, -350, 0, -350, 0, -250, -200, 0, -300, -150, 0, 0, 0, -300, 0, -350, 0, -200, -250, -150, 0, 0, -350, -200, -250, 0, 0, 0, -150, -300, 0, 0];
var DECKB_PENALTY = [0, 0, 0, 0, 0, 0, 0, 0, -1250, 0, 0, 0, 0, -1250, 0, 0, 0, 0, 0, 0, -1250, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1250, 0, 0, 0, 0, 0, 0, 0, 0];
var DECKC_PENALTY = [0, 0, -50, 0, -50, 0, -50, 0, -50, -50, 0, -25, -75, 0, 0, 0, -25, -75, 0, -50, 0, 0, 0, -50, -25, -50, 0, 0, -75, -50, 0, 0, 0, -25, -25, 0, -75, 0, -50, -75];
var DECKD_PENALTY = [0, 0, 0, 0, 0, 0, 0, 0, 0, -250, 0, 0, 0, 0, 0, 0, 0, 0, 0, -250, 0, 0, 0, 0, 0, 0, 0, 0, -250, 0, 0, 0, 0, 0, -250, 0, 0, 0, 0, 0];
var selectedCards = [];


//rewards preprogramed pentalties are higher for deck A & B.
$(function () {
    $("#testresults").hide();
    $(".spinner").hide();

    $('#modal-splash').modal('show'); //show the modal on first load

    $("#emailBtn").click(function () {
        email_address = $("#emailResultsTo").val();

        if (email_address.length && mail_attachment.length) {
            $.ajax({
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                url: 'http://margevici.us/mailsvc/mailsvc.asmx/SendMail',
                data: "{ to:" + email_address + ", attachdata: " + mail_attachment + "}",
                dataType: "json",
                success: function (xml, status, jqxhr) {
                    $(".spinner").hide();
                    $("#emailBtn").prop("disabled", false);
                    $("#emailresultstxt").html("Success!");
                },
                error: function (xhr, textStatus, errorThrown) {
                    $("#emailresultstxt").html("Error.");
                    $("#emailBtn").prop("disabled", false);
                    $(".spinner").hide();
                    console.error(xhr, textStatus);
                },
                beforeSend: function (xhr, settings) {
                    $("#emailresultstxt").html("Waiting..");
                    $("#emailBtn").prop("disabled", true);
                    $(".spinner").show();                    
                }
            });
        }
        else {
            console.error("Email address is blank, or there are no test results to send.");
        }
    });

    $("#viewresultsbtn").click(function () {
        if ($("#testresults").is(":hidden")) {
            $("#testresults").fadeIn(function () { $("#viewresultsbtn").html("Hide results."); });
        }
        else { 
            $("#testresults").fadeOut(function () { $("#viewresultsbtn").html("View results?"); });
        }
    });

    $(".card").click(function () {
        if (totalclicks < MAXGAMES - 1) { //total clicks is 0 based ;) 
            var clicked = $(this).attr("id");
            switch (clicked) {
                case "card-one":
                    if (deckoneclicks === DECKA_PENALTY.length) deckoneclicks = 0; //if we are at the end of the array reset our position back to the beginning.
                    penalty = DECKA_PENALTY[deckoneclicks]; //get the penalty value
                    netgain = DECKA_WIN + penalty;          //get the net gain
                    totalcash += netgain;                   //add into our total cash
                    deckoneclicks++;                        //increment our position
                    totalclicks++;                          //increment the game counter.
                    //output our win loss
                    $("#winamt").html(DECKA_WIN);
                    $("#penaltyamt").html(penalty.toString());
                    $("#netgains").html(netgain.toString());
                    //$("#deck-one-clicks").html(deckoneclicks); 
                    selectedCards.push("A");
                    break;
                case "card-two":
                    if (decktwoclicks === DECKB_PENALTY.length) decktwoclicks = 0;
                    penalty = DECKB_PENALTY[decktwoclicks];
                    netgain = DECKB_WIN + penalty;
                    totalcash += netgain;
                    decktwoclicks++;
                    totalclicks++;
                    //output our win loss
                    $("#winamt").html(DECKB_WIN);
                    $("#penaltyamt").html(penalty.toString());
                    $("#netgains").html(netgain.toString());
                    //$("#deck-two-clicks").html(decktwoclicks);
                    selectedCards.push("B");
                    break;
                case "card-three":
                    if (deckthreeclicks === DECKC_PENALTY.length) deckthreeclicks = 0;
                    penalty = DECKC_PENALTY[deckthreeclicks];
                    netgain = DECKC_WIN + penalty;
                    totalcash += netgain;
                    deckthreeclicks++;
                    totalclicks++;
                    $("#winamt").html(DECKC_WIN);
                    $("#penaltyamt").html(penalty.toString());
                    $("#netgains").html(netgain.toString());
                    //$("#deck-three-clicks").html(deckthreeclicks);
                    selectedCards.push("C");
                    break;
                case "card-four":
                    if (deckfourclicks === DECKD_PENALTY.length) deckfourclicks = 0;
                    penalty = DECKD_PENALTY[deckfourclicks];
                    netgain = DECKD_WIN + penalty;
                    totalcash += netgain;
                    deckfourclicks++;
                    totalclicks++;
                    $("#winamt").html(DECKD_WIN);
                    $("#penaltyamt").html(penalty.toString());
                    $("#netgains").html(netgain.toString());
                    //$("#deck-four-clicks").html(deckfourclicks);
                    selectedCards.push("D");
                    break;
            }
            //change the color of the font if we win or lose
            if (netgain <= 0)
                $(".outputtext").css("color", "red");
            else
                $(".outputtext").css("color", "blue");

            if (totalcash < 0) totalcash = 0; //if total cash is negative make it 0.			               
            $("#totalmoney").html("$" + totalcash.toString());
            //calculate our cash bar and display
            var cashpilebarvalue = 100 * totalcash / CASHMAX;
            $("#cashpilebar").css("width", cashpilebarvalue.toString() + "%");
            $("#cashpileamt").html("$" + totalcash);


        }
        else //game over 
        {
            $("#modal-gameend").modal('show'); //close the modal  
            mail_attachment = selectedCards.join(", ");
            $("#testresults").html(mail_attachment);
        }
    });
});