var textArea = document.querySelector("#text-area")

$(document).ready(function () {
    //Youtube API Key = AIzaSyBnRzgL5l_vrUMhVvZ-uzyiPxmfuiTECJE
    // Seth's YT API = AIzaSyAoXr7-PmcQGq0Mh_vrEVkxiHjQrsKc_NI

    // YChanged from youtibne to wiki page link
    var youtubeURL = "https://www.googleapis.com/youtube/v3/search?q="+ textArea +"+trailer&key=AIzaSyAoXr7-PmcQGq0Mh_vrEVkxiHjQrsKc_NI"

    console.log(youtubeURL)
    // OMDB API Key = 8db38eaf9dmsh0f91b07783026d4p1d126fjsn14a66fa92fcd
    //

    var imdbURL = "https://imdb8.p.rapidapi.com/actors/get-bio?nconst=nm0001667"
})
