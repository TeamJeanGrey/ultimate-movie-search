var actorName;

$("#search-container").submit(function (event) {
    event.preventDefault();
    actorName = $('#actor-name').val();

    var query = actorName + " newest trailer";

    getVideo(query);
});

function getVideo(query) {
    $.ajax({
        type: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            key: 'AIzaSyB7jf8WLIKIDfZ5iuVWr7m3McWZMoWmYE0',
            q: query,
            part: 'snippet',
            maxResults: 1,
            type: 'video',
            videoEmbeddable: true,
        },
        success: function (data) {
            embedVideo(data)
        },
        error: function (response) {
            console.log("Request Failed");
        }
    });
}

function embedVideo(data) {
    $('iframe').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId + "?autoplay=1&;enablejsapi=1")
}
