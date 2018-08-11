//begin homework instructions for crystal collector game

//4 buttons displayed as crystals

//player shown a random number at beginning of game

//when the player clicks on a crystal, it will add a specific amount of points to the player's total score. 

//hide each crystal point value until the player clicks a crystal

//when they do click a crystal, increase the player's total score counter

//player wins only if their total score exactly matches the random number from the beginning of the game

//the player loses if their score goes above the random number

//game restarts, total score resets to 0, when the player wins or loses, but keeps count of wins and losses

//game begins again, player sees a new random number, and all crystals have new hidden values.

//begin game program code

$(document).ready(function() {

    //define variables for crystal value options, current total, wins, losses, and individual crystal values

    var valueOptions = [3, 5, 7, 10];
    var crystals = ["./assets/images/ruby.png", "./assets/images/sapphire.png", "./assets/images/swarovski.png", "./assets/images/topaz.png"];
    var currentTotal = 0;
    var wins = 0;
    var losses = 0;

    //generate the random number the user will try to match

    var numGen = function () {
        targetNumber = Math.floor(10 + Math.random() * 60);
        console.log(targetNumber);
        $("#randomNum").text(targetNumber);
        currentTotal = 0;
        $("#currentTotal").text(currentTotal);
    }

    //run numGen function

    numGen();    
    //set variables to the appropriate areas in the html

    //for each value in the valueOptions array, create an img tag for a crystal

    for (var i = 0; i < valueOptions.length; i++) {
        var crystalImage = $("<img>");

        //add style class to all img tags
        crystalImage.addClass("crystal-image");

        // Each imageCrystal will be given a src link to the crystal image from the 
        crystalImage.attr("src", crystals[i]);

        // Each crystalImage will be given a data attribute called data-crystalValue.
        // This data attribute will be set equal to the array value.
        crystalImage.attr("data-crystalvalue", valueOptions[i]);

        //add each crystal into the #crystals area at the end of the last
        $("#crystals").append(crystalImage);
    }

    //on click function to add value to currentTotal
    $(".crystal-image").on("click", function() {

        var crystalValue = ($(this).attr("data-crystalvalue"));

        crystalValue = parseInt(crystalValue);

        currentTotal += crystalValue;

        $("#currentTotal").text(currentTotal);

        //if, else if for game win/lose logic
        //if your current total matches the target number exactly, they win the round
        if (currentTotal === targetNumber) {
            //alert the player they have won
            alert("You Win!");
            //add to win count
            wins++;
            $("#winsCount").text(wins);
            numGen();

        //if the player's current total exceeds the target number, they lose the round
        } else if (currentTotal > targetNumber) {
            //alert the player they have lost
            alert("You Lose!");
            //add to losses count
            losses++;
            $("#lossesCount").text(losses);
            numGen();
        }

    });

});