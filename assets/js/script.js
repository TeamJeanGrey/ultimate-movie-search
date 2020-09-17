var movieTitle = sessionStorage.getItem("movie-title");

$(document).ready(function () {
    $("#search-container").submit(function (event) {
        searchName = $('#movie-name').val().trim()
        event.preventDefault()
        saveInput(searchName)
        getMovies(searchName)
        getVideo();
    });
});

function getMovies(searchName) {
    axios.get('https://www.omdbapi.com?s=' + searchName + '&apikey=e8893681')
        .then((response) => {
            console.log(response)
            var movies = response.data.Search
            var output = ''
            $.each(movies, (index, movie) => {
                output += `
            
            <div class="col xl3 l4 m6 s12">
                <div class="card large" >
                    <div class="card-image">
                        <img class="responsive-img" src="${movie.Poster}">
                    </div>
                    <div class="card-content">
                        <h5>${movie.Title}</h5>
                    </div>
                    <div class="card-action center">
                        <a onclick="movieSelected('${movie.imdbID}'); setMovieSelected('${movie.Title}')" class="btn btn-primary" href="#">Movie Details</a>
                    </div>
                </div>
            </div>
            
            `;
            });

            $('#movies').html(output)
        })
        .catch((error) => {
            console.log(error)
        })
}
// save id to session storage and redirect to movie.html
function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html'
    return false
}
// set movie title for detail pages to call
function setMovieSelected(title) {
    sessionStorage.setItem('movie-title', title)
}
// save user's search into session storage
function saveInput(searchName) {
    sessionStorage.setItem("movie-name", searchName)

}
// send to movie.html page, pull user's search from session storage to show movie details
function getMovie() {
    var movieId = sessionStorage.getItem('movieId')
    axios.get('https://www.omdbapi.com?i=' + movieId + '&apikey=e8893681')
        .then((response) => {
            var movie = response.data
            console.log(response.data.Actors)
            var output = `
            <div class="row">
                <div class="col s12 m4">
                    <img src="${movie.Poster}" class="thumbnail">
                </div>
                <div class="col s12 m8">
                    <h3>${movie.Title}</h3>
                        <ul class="list-group">
                            <li class="list-group-item">Genre:${movie.Genre}</li>
                            <li class="list-group-item">Released:${movie.Released}</li>
                            <li class="list-group-item">IMDB Rating:${movie.imdbRating}</li>
                            <li class="list-group-item">Director:${movie.Director}</li>
                            <li class="list-group-item">Writer:${movie.Writer}</li>
                            <li class="list-group-item">Actors:${movie.Actors}</li>
                        </ul>
                        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class=btn btn-primary">View IMDB Page</a>
                        <a href="landing.html" class="btn btn-default">Back to Search Page</a>
                </div>
            </div>
            <div class="row">
                <div class="well">
                    <h3>Plot</h3>
                    ${movie.Plot}
                </div>
            </div>

            <div class="col s12">
            <!-- Trailer to latest movie from Youtube -->
            <h3>Trailer</h3>
            <div class="video-container">
                <iframe src="" allow="autoplay" frameborder="0"></iframe>
            </div>
            </br>
            <hr>
            </br>

        `;
            $('#movie').html(output)
        })
        .catch((error) => {
            console.log(error)
        })
}
// $("#search-container").submit(function (event) {
//     event.preventDefault();
//     var searchMovieNameEl = sessionStorage.getItem("movie-name") + " newest trailer";

//     getVideo(searchMovieNameEl);
// });


function getVideo() {
    console.log("running get video")
    var query = sessionStorage.getItem("movie-title") + " trailer";
    $.ajax({
        type: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            // key1 = AIzaSyB7jf8WLIKIDfZ5iuVWr7m3McWZMoWmYE0
            // key2 = AIzaSyAgp2vMl59orNeECqvXmizUYVk9HO4dABo
            // key3 = AIzaSyBnRzgL5l_vrUMhVvZ-uzyiPxmfuiTECJE
            // key4 = AIzaSyDy19bh4B3XhucGPbBxl22jTJDE3Ns3qpg
            key: 'AIzaSyAgp2vMl59orNeECqvXmizUYVk9HO4dABo',
            q: query,
            part: 'snippet',
            maxResults: 1,
            type: 'video',
            videoEmbeddable: true,
        },
        success: function (data) {
            console.log(data)
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
function getTop4() {
    // rapidapi_key1 = 
    var gettop4 = {
        "async": true,
        "crossDomain": true,
        "url": "https://imdb8.p.rapidapi.com/title/get-top-rated-movies",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "imdb8.p.rapidapi.com",
            "x-rapidapi-key": "59292c8b02mshd97cf9790ba265ap173581jsn980626b65383"
        }
    }

    $.ajax(gettop4).done(function (response) {
        console.log(response);
        var top4 = response.slice(0, 4);
        console.log(top4);
        var id = [];
        for (i = 0; i < top4.length; i++) {
            id[i] = top4[i].id.split("/")[2];
        }
        console.log(id);
        var top4ID = sessionStorage.setItem('top4', JSON.stringify(id))

        var top4id = [];
        top4id = JSON.parse(sessionStorage.getItem('top4'));
        for (i = 0; i < top4id.length; i++) {
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://imdb8.p.rapidapi.com/title/get-details?tconst=" + top4id[i],
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "imdb8.p.rapidapi.com",
                    "x-rapidapi-key": "59292c8b02mshd97cf9790ba265ap173581jsn980626b65383"
                }
            }

            $.ajax(settings).done(function (response) {
                console.log(response);
                var moviePoster = response.image.url;
                var movieTitle = response.title;
                console.log(moviePoster);
                var output = "";
                output += `
            <div class="col xl3 l4 m6 s12">
                <div class="card large" >
                    <div class="card-image">
                        <img class="responsive-img" src="${moviePoster}">
                    </div>
                    <div class="card-content">
                        <h5>${movieTitle}</h5>
                    <div class="card-action center">
                        <a onclick="movieSelected('${response.id.split("/")[2]}'); setMovieSelected('${movieTitle}')" class="btn btn-primary" href="#">Movie Details</a>
                    </div>
                </div>
            </div>
            
            `;
                $('#movies').append(output)
            });

        }
    });


}

getTop4();