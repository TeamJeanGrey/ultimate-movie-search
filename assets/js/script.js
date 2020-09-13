var searchFormEl = document.querySelector("#search-container");
var searchInputEl = document.querySelector("#actor-name");
var actorImgEl = document.querySelector("#actor-img")
var actorBioEl = document.querySelector("#actor-bio")
// get value from input element
var name = searchInputEl.value.trim();

// api_key_1 = AIzaSyBnRzgL5l_vrUMhVvZ-uzyiPxmfuiTECJE
// api_key_2 = AIzaSyB7jf8WLIKIDfZ5iuVWr7m3McWZMoWmYE0


// Seth's OMBD API Key: e8893681
// Seth's IMDB rapidAPI key: 7caae45cdcmshfed4878de75f005p14c8bbjsnecd1e19ab576
//  var imdbURL = "https://imdb8.p.rapidapi.com/actors/get-bio?nconst=nm0001667"

$(document).ready(function () {
    $("#actor-name").click(function (e) {
        console.log($("#actor-name").val())
        e.preventDefault()
        var validate = Validate();
        $("#message").html(validate);
        if (validate.length == 0) {
            $.ajax({
                url: "http://imdb.wemakesites.net/api/search?q=" + $("#searchInput").val(),
                data: { "api_key": "9c4d2620-32a1-4f4a-abd0-c88b008f383e" },
                crossDomain: true,
                dataType: "jsonp",
                success: function (result, status, xhr) {
                    var resultHtml = $("<div class=\"resultDiv\"><p>Names</p>");
                    for (i = 0; i < result["data"]["results"]["names"].length; i++) {
                        resultHtml.append("<div class=\"result\" resourceId=\"" + result["data"]["results"]["names"][i]["id"] + "\">" + "<img src=\"" + result["data"]["results"]["names"][i]["thumbnail"] + "\" />" + "<p><a>" + result["data"]["results"]["names"][i]["title"] + "</a></p></div>")
                    }

                    resultHtml.append("<p>Titles</p>");
                    for (i = 0; i < result["data"]["results"]["titles"].length; i++) {
                        resultHtml.append("<div class=\"result\" resourceId=\"" + result["data"]["results"]["titles"][i]["id"] + "\">" + "<img src=\"" + result["data"]["results"]["titles"][i]["thumbnail"] + "\" />" + "<p><a>" + result["data"]["results"]["titles"][i]["title"] + "</a></p></div>")
                    }

                    resultHtml.append("</div>");

                    $("#message").html(resultHtml);
                },
                error: function (xhr, status, error) {
                    $("#message").html("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
                }
            });
        }
    });

    function Validate() {
        var errorMessage = "";
        if ($("#searchInput").val() == "") {
            errorMessage += "► Enter Search Text";
        }
        return errorMessage;
    }

    $(document).ajaxStart(function () {
        $(".textAlignCenter img").show();
    });

    $(document).ajaxStop(function () {
        $(".textAlignCenter img").hide();
    });

});

// var formSubmitHandler = function (event) {
//     event.preventDefault();
//     if (name) {
//         // searchInputEl.value = "";
//     } else {
//         // We're going to have to figure out how to change this to a modal, we're not allowed to use alerts. 
//         alert("Please enter an actor name.");
//     }

//     return name
// };
// var imdbActorBio = function (event) {
//     // concatinated URL link: "https://imdb8.p.rapidapi.com/actors/get-bio?=nm0001667" + name +"&rapidapi-key=7caae45cdcmshfed4878de75f005p14c8bbjsnecd1e19ab576"
//     var apiUrl = "https://imdb8.p.rapidapi.com/actors/get-bio?&nconst=nm0001667&rapidapi-key=7caae45cdcmshfed4878de75f005p14c8bbjsnecd1e19ab576"
//     fetch(apiUrl).then(function (response) {
//         if (response.ok) {
//             response.json().then(function (data) {
//                 displayBio(data, name)
//                 console.log("Actor's bio content and image will append here")
//             })
//         } else { console.log("no result") }
//     })
// }

// var imdbActorKnownFor = function(event) {
//     var apiUrl = "https://imdb8.p.rapidapi.com/actors/get-kown-for?" + name +"&rapidapi-key=7caae45cdcmshfed4878de75f005p14c8bbjsnecd1e19ab576"
//     fetch(apiUrl).then(function(response) {
//         if (response.ok) {
//             response.json().then(function(data) {
//                 displayKnownFor(data, name)
//                 console.log("Actor's info for what they're known for content will append here, assigned into the HTML cards")
//             })
//         } else {console.log("no result")}
//     })
// }

// var imdbActorAwards = function(event) {
//     var apiUrl = "https://imdb8.p.rapidapi.com/actors/get-awards?" + name +"&rapidapi-key=7caae45cdcmshfed4878de75f005p14c8bbjsnecd1e19ab576"
//     fetch(apiUrl).then(function(response) {
//         if (response.ok) {
//             response.json().then(function(data) {
//                 displayAwardList(data, name)
//                 console.log("Actor's top awards content will append here, assigned into the HTML cards")
//             })
//         } else {console.log("no result")}
//     })
// }

// var displayBio = function () {
//     // get image from IMDB API
//     var imgUrl = "https://m.media-amazon.com/images/M/MV5BMGEwYzJhOTctNjZkMy00NTZjLWE3MTctNGU2ZGRmODNiZmNiXkEyXkFqcGdeQXVyOTQyNzIyMDM@._V1_.jpg"
//     actorImgEl.setAttribute("src", imgUrl)
//     console.log(actorImgEl)
//     // get bio from IMDB API
//     var actorBio = client.miniBios[0].text
//     console.log(actorBio)

}

// var displayKnownFor = function() {

// }

// var displayAwardList = function() {

// }

function search() {
    imdbActorBio()
    // imdbActorKnownFor()
    // imdbActorAwards()
}

searchFormEl.addEventListener("submit", formSubmitHandler);



