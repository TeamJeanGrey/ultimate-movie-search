function getMovies(searchName) {
    axios.get('https://www.omdbapi.com?s=' + searchName + '&apikey=e8893681')
    .then((response) => {
        console.log(response)
        var movies = response.data.Search
        var output = ''
        $.each(movies, (index, movie) => {
            output += `
            
            <div class="col s3">
                <div class="well text-center">
                    <img src="${movie.Poster}">
                    <h5>${movie.Title}</h5>
                    <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                </div>
            </div>
            
            `;
        });

        $('#movies').html(output)
    })
    .catch((error)=> {
        console.log(error)
    })
}
// put user's text input request value in session storage
function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html'
    return false
}
// save user's input to session storage
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
        // create dynamic html items from omdb api
        var output = `
            <div class="row">
                <div class="col s4">
                    <img src="${movie.Poster}" class="thumbnail">
                </div>
                <div class="col s8">
                    <h2>${movie.Title}</h2>
                        <ul class="list-group">
                            <li class="list-group-item">Genre:${movie.Genre}</li>
                            <li class="list-group-item">Released:${movie.Released}</li>
                            <li class="list-group-item">IMDB Rating:${movie.imdbRating}</li>
                            <li class="list-group-item">Director:${movie.Director}</li>
                            <li class="list-group-item">Writer:${movie.Writer}</li>
                            <li class="list-group-item">Actors:${movie.Actors}</li>
                        </ul>
                </div>
            </div>
            <div class="row">
                <div class="well">
                    <h3>Plot</h3>
                    ${movie.Plot}
                    <hr>
                    <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class=btn btn-primary">View IMDB Page</a>
                    <a href="landing.html" class="btn btn-default">Back to Search Page</a>
                </div>
            </div>
        `;
        $('#movie').html(output)
    })
    .catch((error)=> {
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
    var query = sessionStorage.getItem("movie-name") + " newest trailer";
    $.ajax({
        type: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            key: 'AIzaSyBnRzgL5l_vrUMhVvZ-uzyiPxmfuiTECJE',
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


