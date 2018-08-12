//begin game program code

$(document).ready(function() {

    //array for crystal images, variables for current total, wins, losses
    var valueOptions = [ 3, 5, 7, 10 ];
    var crystals = 
        [ "./assets/images/ruby.png",
        "./assets/images/sapphire.png",
        "./assets/images/swarovski.png",
        "./assets/images/topaz.png" ];
    var currentTotal = 0;
    var wins = 0;
    var losses = 0;

    //function to shuffle array
    function shuffle (o) {
        for(let i = 0; i < o.length * 2; i++) {
          // Get a random index into o, modding to stay withing array length.
          const index = parseInt(Math.random() * o.length * 10, 10) % o.length;
          // Pull that random value out and stick it on the front of the array.
          o.unshift(o.splice(index, 1)[0])
        }
        return o;
      }

    //testing shuffle
    console.log(valueOptions);
    console.log(shuffle(valueOptions));

    //function to shuffle both value options and crystal order
    function shuffleArrays() {
        shuffle(valueOptions);
        shuffle(crystals);
    };

    //function to generate the random number the user will try to match
    function numGen () {
        targetNumber = Math.floor(20 + Math.random() * 60);
        $("#randomNum").text(targetNumber);
        currentTotal = 0;
        $("#currentTotal").text(currentTotal);
    };

    //run intial numGen function
    numGen(); 

    //function to create crystal options images with values and src tags each round
    function crystalGen() {

        //make sure content area is cleared of any previous content
        $("#crystals").empty();
        
        //run initial shuffle of arrays
        shuffleArrays();

        for (var z = 0; z < valueOptions.length; z++) {

            //for each value in the valueOptions array, create an img tag for a crystal
            var crystalImage = $("<img class='crystal-image'>");

            crystalImage.attr("data-crystalValue", 0);


            //each imageCrystal will be given a src link to the crystal image from the array
            crystalImage.attr("src", crystals[z]);

            //each crystalImage will be given a data attribute called data-crystalValue.
            //this data attribute will be set equal to the array value.
            crystalImage.attr("data-crystalValue", valueOptions[z]);

            //add each crystal into the #crystals area at the end of the last
            $("#crystals").append(crystalImage);

        }
    };

    //run initial crystal gen to display crystals assign values
    crystalGen();

    //on click function to add value to current total as gems are clicked
    $(".crystal-image").on("click", function() {

        //define value for crystal value
        var crystalValue = ($(this).attr("data-crystalValue"));
        crystalValue = parseInt(crystalValue);

        //add clicked crystal value to current total
        currentTotal += crystalValue;

        //update total in DOM
        $("#currentTotal").text(currentTotal);

        //if, else if logic for game win/lose scenarios

        //if your current total matches the target number exactly, they win the round
        if (currentTotal === targetNumber) {
            //add to win count
            wins++;
            //reflect in wins counter window
            $("#winsCount").text(wins);
            //alert the player they have won the round
            alert("You've won this round!")
            //regenerate target number
            numGen();
            crystalGen();

        //if the player's current total exceeds the target number, they lose the round
        } else if (currentTotal > targetNumber) {
            //add to losses count
            losses++;
            $("#lossesCount").text(losses);
            //alert the player they have lost
            alert("You've lost this round!");
            //regenerate target number
            numGen();
            crystalGen();
        } 

    });

    //click function for hiding instructions
    var instructions = $("#instructions");
    $(instructions).on("click", function () {
        $("p").slideToggle(1000);
    });

});