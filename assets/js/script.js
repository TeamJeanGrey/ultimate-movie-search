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

var formSubmitHandler = function (event) {
    event.preventDefault();
    if (name) {
        // searchInputEl.value = "";
    } else {
        // We're going to have to figure out how to change this to a modal, we're not allowed to use alerts. 
        alert("Please enter an actor name.");
    }

    return name
};
var imdbActorBio = function (event) {
    // concatinated URL link: "https://imdb8.p.rapidapi.com/actors/get-bio?=nm0001667" + name +"&rapidapi-key=7caae45cdcmshfed4878de75f005p14c8bbjsnecd1e19ab576"
    var apiUrl = "https://imdb8.p.rapidapi.com/actors/get-bio?&nconst=nm0001667&rapidapi-key=7caae45cdcmshfed4878de75f005p14c8bbjsnecd1e19ab576"
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayBio(data, name)
                console.log("Actor's bio content and image will append here")
            })
        } else { console.log("no result") }
    })
}

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

var displayBio = function () {
    // get image from IMDB API
    var imgUrl = "https://m.media-amazon.com/images/M/MV5BMGEwYzJhOTctNjZkMy00NTZjLWE3MTctNGU2ZGRmODNiZmNiXkEyXkFqcGdeQXVyOTQyNzIyMDM@._V1_.jpg"
    actorImgEl.setAttribute("src", imgUrl)
    console.log(actorImgEl)
    // get bio from IMDB API
    var actorBio = client.miniBios[0].text
    console.log(actorBio)

}

// var displayKnownFor = function() {

// }

// var displayAwardList = function() {

// }

function search() {
    execute()
    imdbActorBio()
    // imdbActorKnownFor()
    // imdbActorAwards()
}

searchFormEl.addEventListener("submit", formSubmitHandler);



