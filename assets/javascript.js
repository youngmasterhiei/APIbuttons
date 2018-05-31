$(document).ready(function(){

    var animalArray = [];
    var newAnimalButton;

   


$("#animalSubmit").on("click", function(){
    event.preventDefault();
    userSearch = $("#userInputText").val();
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + userSearch + "&api_key=I3LIxn3wdbBKTNOyOvfS4UCk3TvTUwrY";
     newAnimalButton = $("<button>" + userSearch + "</button>");
    newAnimalButton.addClass("animalClass");
    


$("#newButtonArea").append(newAnimalButton);
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(userSearch) {
    console.log(userSearch);
    
    console.log(userSearch.data[0].embed_url);
   
    var displayImageUrl = userSearch.data[0].embed_url;
    console.log(displayImageUrl);
    var image = $("<img>").attr("src", displayImageUrl);
    
    $("#searchResultArea").append(image);
    });
    $(newAnimalButton).on("click", function(){
        

  });

});







});

