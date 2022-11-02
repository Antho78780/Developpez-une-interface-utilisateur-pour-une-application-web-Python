const movieBetter = document.querySelector(".movie_better")
const moviesBetters = document.querySelector(".movies_betters")
const moviesAdventures = document.querySelector(".movies_adventures")
const moviesDramas = document.querySelector(".movies_dramas")
const moviesActions = document.querySelector(".movies_actions")

const clickModal = document.querySelectorAll(".clickModal")
const textMovie = document.querySelector(".text")
const modal = document.querySelector("#modal")
const closeModal = document.querySelector(".close")

const allMovies = []
const ArrayMoviesActions = []
const ArrayMoviesDramas = []
const ArrayMoviesAdventure = []
const arrayGenre = ["Action", "Drama", "Adventure"]

const carousselRightBest = document.querySelector(".carrouselRightBest")
const carousselLeftBest = document.querySelector(".carrouselLeftBest")
const carrouselLeftAction = document.querySelector(".carrouselLeftAction")
const carrouselRightAction = document.querySelector(".carrouselRightAction")
const carrouselLeftDrama = document.querySelector(".carrouselLeftDrama")
const carrouselRightDrama = document.querySelector(".carrouselRightDrama")
const carrouselLeftAdventure = document.querySelector(".carrouselLeftAdventure")
const carrouselRightAdventure = document.querySelector(".carrouselRightAdventure")

for (let numPage =1; numPage < 3;numPage++){
	for (let genre of arrayGenre){
		fetch(`http://localhost:8000/api/v1/titles/?actor=&actor_contains=&company=&company_contains=&country=&country_contains=&director=&director_contains=&genre
		=${genre}&genre_contains=&imdb_score=&imdb_score_max=&imdb_score_min=&lang=&lang_contains=&max_year=&min_year=&page=${numPage}&rating=&rating_contains=&sort_by=&title
		=&title_contains=&writer=&writer_contains=&year=2020`)
		.then(res => res.json())
		.then(data => {
			for (let movie of data.results){
				convertScore = parseFloat(movie.imdb_score)
				movie.imdb_score = convertScore
				allMovies.push(movie)
			}
			allMovies.sort((a, b) => b.imdb_score - a.imdb_score)
			if (allMovies.length == 30){
				for (let i = 0; i < 4; i++){
					moviesBetters.innerHTML += `<img src="${allMovies[i].image_url}"></img>`
				}
				console.log(allMovies[0])
				fetch(allMovies[0].url)
				.then(res => res.json())
				.then((infoMovie) => {
					movieBetter.innerHTML = `<p>${infoMovie.title}</p><img src="${allMovies[0].image_url}"><a class="play-btn" href="#"></a></img>
					<p class="description">${infoMovie.description}</p>`
				})
				carousselRightBest.addEventListener("click", function(){
					moviesBetters.innerHTML = ""
					for (let i = 5; i < 8; i++){
						moviesBetters.innerHTML += `<img src="${allMovies[i].image_url}"></img>`
					}
				})
				carousselLeftBest.addEventListener("click", function(){
					moviesBetters.innerHTML = ""
					for (let i = 0; i < 4; i++){
						moviesBetters.innerHTML += `<img src="${allMovies[i].image_url}"></img>`
					}
				})
				allMovies.splice(4, 1)
				let cache = {}
				const filterAllMovies = allMovies.filter((el) => cache[el.id]?0:cache[el.id]=1)
			
				for (let movie of filterAllMovies){
					if (movie.genres.includes("Action") && ArrayMoviesActions.length <7){
						ArrayMoviesActions.push(movie)
					}
					if (movie.genres.includes("Drama") && ArrayMoviesDramas.length < 7){
						ArrayMoviesDramas.push(movie)
					}
					if (movie.genres.includes("Adventure") && ArrayMoviesAdventure.length < 7){
						ArrayMoviesAdventure.push(movie)
					}
				}

				for (let i = 0; i < 4; i++){
					moviesActions.innerHTML += `<img src="${ArrayMoviesActions[i].image_url}"></img>`
					moviesDramas.innerHTML += `<img src="${ArrayMoviesDramas[i].image_url}"></img>`
					moviesAdventures.innerHTML += `<img src="${ArrayMoviesAdventure[i].image_url}"></img>`
				}
				carrouselRightAction.addEventListener("click", function(){
					moviesActions.innerHTML = ""
					for (let i = 4; i < 7; i++){
						moviesActions.innerHTML += `<img src="${ArrayMoviesActions[i].image_url}"></img>`
					}
				})
				carrouselLeftAction.addEventListener("click", function(){
					moviesActions.innerHTML = ""
					for (let i = 0; i < 4; i++){
						moviesActions.innerHTML += `<img src="${ArrayMoviesActions[i].image_url}"></img>`
					}
				})
				carrouselRightDrama.addEventListener("click", function(){
					moviesDramas.innerHTML = ""
					for (let i = 4; i < 7; i++){
						moviesDramas.innerHTML += `<img src="${ArrayMoviesDramas[i].image_url}"></img>`
					}
				})
				carrouselLeftDrama.addEventListener("click", function(){
					moviesDramas.innerHTML = ""
					for (let i = 0; i < 4; i++){
						moviesDramas.innerHTML += `<img src="${ArrayMoviesDramas[i].image_url}"></img>`
					}
				})
				carrouselRightAdventure.addEventListener("click", function(){
					moviesAdventures.innerHTML = ""
					for (let i = 4; i < 7; i++){
						moviesAdventures.innerHTML += `<img src="${ArrayMoviesAdventure[i].image_url}"></img>`
					}
				})
				carrouselLeftAdventure.addEventListener("click", function(){
					moviesAdventures.innerHTML = ""
					for (let i = 0; i < 4; i++){
						moviesAdventures.innerHTML += `<img src="${ArrayMoviesAdventure[i].image_url}"></img>`
					}
				})
				for (clickM of clickModal){
					clickM.addEventListener("click", function(e){
						for (let movie of filterAllMovies){
							if (e.target.src == movie.image_url){
								modal.style.display = "block"
								fetch(movie.url)
								.then(res => res.json())
								.then(informationMovie => {
									textMovie.innerHTML = `Title: ${informationMovie.title}<br>Genre du film: ${informationMovie.genres}<br>Date de sortie: ${informationMovie.year}
									<br>Evaluation: ${informationMovie.rated}<br>Score imdb: ${informationMovie.imdb_score}<br>Réalisateur: ${informationMovie.writers}
									<br> Acteurs: ${informationMovie.actors}<br> Durée: ${informationMovie.duration}min<br>Pays d'origine: ${informationMovie.countries}
									<br>Résumé: ${informationMovie.description} `
								})
							}
						}
					})
				}
				closeModal.addEventListener("click", function(e){
					modal.style.display = "none"
				})
			}

		})
	}
}
function checkedGenre(genre, classMovie, imageMovie){
	if(genre){
			classMovie.innerHTML += `<img src='${imageMovie}'></img>`
		}
}
function importMovie(classMovie, movieIndexImage){
	classMovie.innerHTML += `<img src='${movieIndexImage}'></img>`
}
