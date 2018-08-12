//begin game program code

$(document).ready(function() {
    //array for crystal images, variables for current total, wins, losses
    var valueOptions = [3, 5, 7, 10];
    var crystals = ["./assets/images/ruby.png", "./assets/images/sapphire.png", "./assets/images/swarovski.png", "./assets/images/topaz.png"];
    var currentTotal = 0;
    var wins = 0;
    var losses = 0;
    //shuffle valueOptions
    function shuffle (o) {
        for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }
    //function to generate the random number the user will try to match
    var numGen = function () {
        targetNumber = Math.floor(20 + Math.random() * 60);
        console.log(targetNumber);
        $("#randomNum").text(targetNumber);
        currentTotal = 0;
        $("#currentTotal").text(currentTotal);
    }
    //run intial numGen function
    numGen(); 
    //shuffle value options and crystal order
    shuffle(valueOptions);
    shuffle(crystals);
    //set variables to the appropriate areas in the html
    for (var i = 0; i < valueOptions.length; i++) {
        //for each value in the valueOptions array, create an img tag for a crystal
        var crystalImage = $("<img>");
        //add style class to all img tags
        crystalImage.addClass("crystal-image");
        //each imageCrystal will be given a src link to the crystal image from the 
        crystalImage.attr("src", crystals[i]);
        //each crystalImage will be given a data attribute called data-crystalValue.
        //this data attribute will be set equal to the array value.
        crystalImage.attr("data-crystalvalue", valueOptions[i]);
        //add each crystal into the #crystals area at the end of the last
        $("#crystals").append(crystalImage);
    }
    //on click function to add value to currentTotal
    $(".crystal-image").on("click", function() {
        //define value for crystal value
        var crystalValue = ($(this).attr("data-crystalvalue"));
        crystalValue = parseInt(crystalValue);
        //add clicked crystal value to current total
        currentTotal += crystalValue;
        //update total in DOM
        $("#currentTotal").text(currentTotal);
        //if, else if for game win/lose logic
        //if your current total matches the target number exactly, they win the round
        if (currentTotal === targetNumber) {
            wins++;
            //add to win count
            $("#winsCount").text(wins);
            //alert the player they have won
            alert("You've won this round!")
            //reshuffle value options
            shuffle(valueOptions);
            //reshuffle crystals
            shuffle(crystals);
            //regenerate target number
            numGen();
        //if the player's current total exceeds the target number, they lose the round
        } else if (currentTotal > targetNumber) {
            //add to losses count
            losses++;
            $("#lossesCount").text(losses);
            //alert the player they have lost
            alert("You've lost this round!");
            //reshuffle value options
            shuffle(valueOptions);
            //reshuffle crystals
            shuffle(crystals);
            //regenerate target number
            numGen();
        }
    });
    //click function for hiding instructions
    var instructions = $("#instructions");
    $(instructions).on("click", function () {
        $("p").slideToggle(1000);
    })
});