var searchFormEl = document.querySelector("#search-container");
var searchInputEl = document.querySelector("#actor-name");
    // get value from input element
var name = searchInputEl.value.trim();

// api_key_1 = AIzaSyBnRzgL5l_vrUMhVvZ-uzyiPxmfuiTECJE
// api_key_2 = AIzaSyB7jf8WLIKIDfZ5iuVWr7m3McWZMoWmYE0

// OMDB API Key = 8db38eaf9dmsh0f91b07783026d4p1d126fjsn14a66fa92fcd
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
var imdbActorBio = function(event) {
    var apiUrl = "https://imdb8.p.rapidapi.com/actors/get-bio?" + name +"&rapidapi-key=7caae45cdcmshfed4878de75f005p14c8bbjsnecd1e19ab576"
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayBio(data, name)
                console.log("Actor's bio content and image will append here")
            })
        } else {console.log("no result")}
    })
}

var imdbActorKnownFor = function(event) {
    var apiUrl = "https://imdb8.p.rapidapi.com/actors/get-kown-for?" + name +"&rapidapi-key=7caae45cdcmshfed4878de75f005p14c8bbjsnecd1e19ab576"
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayBio(data, name)
                console.log("Actor's info for what they're known for content will append here, assigned into the HTML cards")
            })
        } else {console.log("no result")}
    })
}

var imdbActorAwards = function(event) {
    var apiUrl = "https://imdb8.p.rapidapi.com/actors/get-awards?" + name +"&rapidapi-key=7caae45cdcmshfed4878de75f005p14c8bbjsnecd1e19ab576"
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayBio(data, name)
                console.log("Actor's top awards content will append here, assigned into the HTML cards")
            })
        } else {console.log("no result")}
    })
}



// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad());
}
// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyBnRzgL5l_vrUMhVvZ-uzyiPxmfuiTECJE');
}
// called automatically onClientLoad()

// Called when the search button is clicked in the html code
function searchYoutubeApi() {
    var query = document.getElementById('actor-name').value + "newest trailer";
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: query
    });
    // Send the request to the API server, call the onSearchResponse function when the data is returned
    request.execute(onSearchResponse);
};


// Triggered by this line: request.execute(onSearchResponse);
var videoID = {};
function onSearchResponse(response) {
    var responseString = JSON.stringify(response);
    var responseObject = JSON.parse(responseString);
    videoID.id = responseObject.items[0].id.videoId;

    console.log(videoID)

}

function search() {
    searchYoutubeApi()
    imdbActorBio()
    imdbActorKnownFor()
    imdbActorAwards()
}

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    videoID.id = "4sKZB03VvRY",
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: videoID.id,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo() {
    player.stopVideo();
}

searchFormEl.addEventListener("submit", formSubmitHandler);



