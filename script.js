
document.getElementById('search').onsubmit = async function(event){
    event.preventDefault()
    let searchWord = event.target.elements.search.value
    const year = event.target.elements.year.value
    
    if(!searchWord){
        alert('Kereső szó kitöltése kötelező')
        return
    }else{
        search = encodeURI(search)
    }
    const url = `http://www.omdbapi.com/?s=${encodeURI(searchWord)}&y=${year}&apiKey=9606ae0f`

    let response = await fetch(url)
  
    if(!response.ok){
        alert('A kereső szó nem található')
        return
    }
    let movieResponse = await response.json()

    if(!movieResponse.Search){
        alert('Keresés sikertelen')
        return
    }

    renderMovieList(movieResponse.Search)


}

function renderMovieList(movies){
    let movieList = '';
    for(let movie of movies){
        movieList += `<li>
        <div class="poster-wrap">
          <a>
            <img src="${movie.Poster}" class="movie-poster" />
          </a>
        </div>
        <p data-imdbid="${movie.imdbID}" class="single-movie-btn">
          <span class="movie-title">
            Cím ${movie.Title}
          </span>
        </p>
        <span class="movie-year">
          Évszám ${movie.Year}
        </span>
      </li>`
    }
    
    document.getElementById('movies').innerHTML = movieList;
    
    let movieTitles = document.querySelectorAll('.single-movie-btn')
    
    
    for(let title of movieTitles){
        title.onclick = function(){
            let imdbID = title.getAttribute('data-imdbid')
            let url = `http://www.omdbapi.com/?i=${imdbID}&apiKey=9606ae0f`
            fetch(url).then(response => response.json()).then(function(singleMovie){
              document.getElementById('movie-description').innerHTML = `
              <h1>${singleMovie.Title}</h1>
              <p>${singleMovie.Plot}</p>`
            })
        }
    }
}   
