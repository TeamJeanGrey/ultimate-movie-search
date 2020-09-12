var searchFormEl = document.querySelector("#search-container");
var searchInputEl = document.querySelector("#actor-name");

// api_key_1 = AIzaSyBnRzgL5l_vrUMhVvZ-uzyiPxmfuiTECJE
// api_key_2 = AIzaSyB7jf8WLIKIDfZ5iuVWr7m3McWZMoWmYE0

var formSubmitHandler = function (event) {
    event.preventDefault();
    // get value from input element
    var name = searchInputEl.value.trim();

    if (name) {
        // searchInputEl.value = "";
    } else {
        alert("Please enter an actor name.");
    }

    return name
};

// OMDB API Key = 8db38eaf9dmsh0f91b07783026d4p1d126fjsn14a66fa92fcd
//  var imdbURL = "https://imdb8.p.rapidapi.com/actors/get-bio?nconst=nm0001667"

// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}
// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyBnRzgL5l_vrUMhVvZ-uzyiPxmfuiTECJE');
}

// Called when the search button is clicked in the html code
function search() {
    var query = document.getElementById('actor-name').value + "newest trailer";
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: query
    });
    // Send the request to the API server, call the onSearchResponse function when the data is returned
    request.execute(onSearchResponse);
}
// Triggered by this line: request.execute(onSearchResponse);
var videoID = {};
function onSearchResponse(response) {
    var responseString = JSON.stringify(response);
    var responseObject = JSON.parse(responseString);
    videoID.id = responseObject.items[0].id.videoId;

    console.log(videoID)

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
