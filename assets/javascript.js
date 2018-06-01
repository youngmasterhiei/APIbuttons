$(document).ready(function () {

    
    
  
    var animalDiv = $("<div>");



    $("#animalSubmit").on("click", function () {
        event.preventDefault();
        userSearch = $("#userInputText").val();
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + userSearch + "&api_key=I3LIxn3wdbBKTNOyOvfS4UCk3TvTUwrY";
        newAnimalButton = $("<button>" + userSearch + "</button>");
        newAnimalButton.addClass("animalClass");
        $("#newButtonArea").append(newAnimalButton);


        $(newAnimalButton).on("click", function () {

          
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    console.log(response);
                    animalDiv.empty();
                    for (var i = 0; i < 25; i++) {
                        var displayImageUrl = response.data[i].images.fixed_height_small.url;
                        console.log(displayImageUrl);
                        var image = $("<img>");
                        image.attr("src", displayImageUrl);

                        

                        $("#searchResultArea").append(animalDiv);
                        animalDiv.append(image);
                        
                    };

                });
            
           
    });

    });


});

