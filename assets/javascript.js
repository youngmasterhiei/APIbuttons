
$(document).ready(function () {

    //needed to make a gloabl variable to avoid error at start. this is where the images and ratings are placed
    var animalDiv = $("<div>");
    var animalArray = ["dog", "cat", "bear", "snake", "deer", "duck", "cow", "bull"];








    for (var j = 0; j < animalArray.length; j++) {
        var animalButton = $("<button>" + animalArray[j] + "</button>");
        animalButton.addClass("animalClass");
        $("#newButtonArea").append(animalButton);

    };

    $(".animalClass").on("click", function () {
        var buttonSearch = $(this).text();
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + buttonSearch + "&api_key=I3LIxn3wdbBKTNOyOvfS4UCk3TvTUwrY";
        console.log(buttonSearch);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            animalDiv.empty();
            for (var i = 0; i < 25; i++) {
                var displayStillImageUrl = response.data[i].images.fixed_height_small_still.url;
                var displayGifImageUrl = response.data[i].images.fixed_height_small.url;
                var rating = response.data[i].rating;
                var image = $("<img>");
                image.attr({ "src": displayStillImageUrl, "gif": displayGifImageUrl, "still": displayStillImageUrl });
                //used to switch between still and gif image
                image.addClass("still");
                image.addClass("animalImageClass");
                //switches between still image and gif
                $(image).on("click", function () {

                    if ($(this).hasClass("still")) {

                        $(this).attr("src", $(this).attr("gif"));
                        $(this).removeClass("still");

                    }
                    else {
                        $(this).attr("src", $(this).attr("still"));
                        $(this).addClass("still");
                    }

                });
                // puts the div and images inside of an html div
                $("#searchResultArea").append(animalDiv);
                animalDiv.append("Rating:" + rating);
                animalDiv.append(image);


            };
        });
    });




    //on click function
    $("#animalSubmit").on("click", function () {
        //checks if the user entered anything, if not alerts user, does not make button.
        if ($("#userInputText").val() === '') {
            event.preventDefault();
            alert("Not a valid submission");
        }
        else {
            event.preventDefault();
            //takes the user's search and names the button 
            userSearch = $("#userInputText").val();
            // api querurl
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + userSearch + "&api_key=I3LIxn3wdbBKTNOyOvfS4UCk3TvTUwrY";
            // makes the new button
            newAnimalButton = $("<button>" + userSearch + "</button>");
            newAnimalButton.addClass("animalClass");
            $("#newButtonArea").append(newAnimalButton);
            // resets the user input box to blank after submit
            $("#userInputText").val('');


        }


        // on click function for the created animal buttons
        $(newAnimalButton).on("click", function () {


            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                //clears the div when clicking another button 
                animalDiv.empty();
                //loop for all the 25 images to display
                for (var i = 0; i < 25; i++) {
                    var displayStillImageUrl = response.data[i].images.fixed_height_small_still.url;
                    var displayGifImageUrl = response.data[i].images.fixed_height_small.url;
                    var rating = response.data[i].rating;
                    var image = $("<img>");
                    image.attr({ "src": displayStillImageUrl, "gif": displayGifImageUrl, "still": displayStillImageUrl });
                    //used to switch between still and gif image
                    image.addClass("still");
                    image.addClass("animalImageClass");
                    //switches between still image and gif
                    $(image).on("click", function () {

                        if ($(this).hasClass("still")) {

                            $(this).attr("src", $(this).attr("gif"));
                            $(this).removeClass("still");

                        }
                        else {
                            $(this).attr("src", $(this).attr("still"));
                            $(this).addClass("still");
                        }

                    });
                    // puts the div and images inside of an html div
                    $("#searchResultArea").append(animalDiv);
                    animalDiv.append("Rating:" + rating);
                    animalDiv.append(image);


                };

            });


        });

    });


});





