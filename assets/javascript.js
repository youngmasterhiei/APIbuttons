$(document).ready(function () {


    var animalDiv = $("<div>");



    $("#animalSubmit").on("click", function () {
        if ($("#userInputText").val() === '') {
            event.preventDefault();
            alert("Not a valid submission");
        }
        else {
            event.preventDefault();
            userSearch = $("#userInputText").val();

            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + userSearch + "&api_key=I3LIxn3wdbBKTNOyOvfS4UCk3TvTUwrY";
            newAnimalButton = $("<button>" + userSearch + "</button>");
            newAnimalButton.addClass("animalClass");
            $("#newButtonArea").append(newAnimalButton);
            $("#userInputText").val('');

        }



        $(newAnimalButton).on("click", function () {


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
                    image.addClass("still");
                    image.addClass("animalImageClass");
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
                    $("#searchResultArea").append(animalDiv);
                    animalDiv.append(rating);
                    animalDiv.append(image);

                };

            });


        });

    });


});

