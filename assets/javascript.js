
$(document).ready(function () {

    
    var pageHeader = $("<h1> Animal Gifs! Enter a new animal on the right to see the images.");
    $("<body>").prepend(pageHeader);
    //append inside of container div on html
    var rowDiv = $("<div>").addClass("row");
    //append maincolumndiv and search div to row div
    var mainColumnDiv = $("<div id='mainArea'></div>").addClass("col-lg-8");
    //append rowtitlediv to mainColumndiv
    var mainRowTitleDiv = $("<div id='title'></div>").addClass("row");
    //append buttonRowDiv to mainColumnDiv
    var buttonRowDiv = $("<div id='buttonArea'></div>");

    //append maincolumndiv and search div to row div
    var searchColumnDiv = $("<div id='searchArea'></div>").addClass("col-lg-4");
    var animalDiv = $("<div>").addClass("row imageDivStyle");

    var animalArray = ["dog", "cat", "bear", "snake", "deer", "duck", "cow", "bull"];

    //append to searchColumnDiv

    var searchButton = $("<input type='text' id='userInputText' placeholder='Enter an animal'>");
    var submitButton = $("<input type='submit' value='enter' id='animalSubmit'>");

    document.onkeyup = function (event) {

        if (event.keyCode === 13) {
            // Trigger the button element with a click
            $("#animalSubmit").click();
        }
    };


    $("#wholePageDiv").append(rowDiv);
    rowDiv.append(mainColumnDiv);
    rowDiv.append(searchColumnDiv);
    mainColumnDiv.append(mainRowTitleDiv);
    mainColumnDiv.append(buttonRowDiv);
    mainColumnDiv.append(animalDiv);
    searchColumnDiv.append(searchButton, submitButton);





    for (var j = 0; j < animalArray.length; j++) {
        var animalButton = $("<button>" + animalArray[j] + "</button>");
        animalButton.addClass("animalClassBtn");


        buttonRowDiv.append(animalButton);


    };

    $(document).on("click", ".animalClassBtn", function () {
        var buttonSearch = $(this).text();
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + buttonSearch + "&api_key=I3LIxn3wdbBKTNOyOvfS4UCk3TvTUwrY";
        $.ajax({
            url: queryURL,
            method: "GET",
            success: function (response) {
                console.log(response);
                animalDiv.empty();
                for (var i = 0; i < response.data.length; i++) {
                    
                    //grabs the still image from api
                    var displayStillImageUrl = response.data[i].images.fixed_height_small_still.url;
                    //grabs the gif image from api
                    var displayGifImageUrl = response.data[i].images.fixed_height_small.url;
                    var downloadGif =  response.data[i].images.fixed_height_small.url;
                    // straight up borrowed the i class styling from someone on wc3 school, liked the styling and it saved me time.
                    var downloadButton = $("<a download='"+ downloadGif +"' href='" + downloadGif +"'><button class='btn downloadBtn'><i class='fa fa-download'></i> Download </button></a>");
                        
                   // downloadButton.attr("href", downloadGif );
                    //grabs the rating from api
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
                    var eachImageDiv = $("<div>");
                    eachImageDiv.append("Rating:" + rating);
                    eachImageDiv.append(image);
                    eachImageDiv.append(downloadButton);
                    $("#searchResultArea").append(animalDiv);
                    eachImageDiv.addClass("card imageDivStyle ");
                    animalDiv.append(eachImageDiv);



                };

            }, error: function () {
                alert("Were going to give it to you straight forward, something went wrong with the api, were not sure what, but i promise a giphy programmer is working hard to figure it out, please try again later. ");
            }
        });
    });




    //on click function
    $("#animalSubmit").on("click", function () {
        //checks if the user entered anything, if not alerts user, does not make button.
        if ($("#userInputText").val() === '') {
            event.preventDefault();

            alert("Not a valid submission");
            $("#userInputText").val('');
        }
        else if (jQuery.inArray($("#userInputText").val(), animalArray) !== -1) {
            var word = $("#userInputText").val();
            alert("There is already a " + word + " button");
            $("#userInputText").val('');
        }
        else {
            event.preventDefault();
            //takes the user's search and names the button 
            userSearch = $("#userInputText").val();
            animalArray.push(userSearch);
            // api querurl
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + userSearch + "&api_key=I3LIxn3wdbBKTNOyOvfS4UCk3TvTUwrY";
            // makes the new button
            newAnimalButton = $("<button>" + userSearch + "</button>");
            newAnimalButton.addClass("animalClassBtn");
            buttonRowDiv.append(newAnimalButton);
            // resets the user input box to blank after submit
            $("#userInputText").val('');


        }


    });
/*
$(document).on("click", ".downloadBtn", function(){
    
    event.preventDefault();

    window.location.href = $(this).attr();

});
*/

});





