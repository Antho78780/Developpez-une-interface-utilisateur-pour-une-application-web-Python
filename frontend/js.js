const movieBetter = document.querySelector(".movie_better")
const moviesBetters = document.querySelector(".movies_betters")
const moviesAdventures = document.querySelector(".movies_adventures")
const moviesDramas = document.querySelector(".movies_dramas")
const moviesActions = document.querySelector(".movies_actions")
const clickModal = document.querySelectorAll(".clickModal")
const allMovies = []

const ArrayMoviesActions = []
const ArrayMoviesDramas = []
const ArrayMoviesAdventure = []

for (let i = 2588; i < 2590;i++){
	fetch(`http://localhost:8000/api/v1/titles/?actor=&actor_contains=&company=&company_contains=&country=&country_contains=&director=&director_contains=&genre
	=Action&genre_contains=&imdb_score=&imdb_score_max=&imdb_score_min=&lang=&lang_contains=&max_year=&min_year=&page=${i}&rating=&rating_contains=&sort_by=&title
	=&title_contains=&writer=&writer_contains=&year=`)
	.then(res => res.json())
	.then(data => {
		for (let movie of data.results){
			ArrayMoviesActions.push(movie)
		}
		if (ArrayMoviesActions.length == 10){
			ArrayMoviesActions.sort((a, b) => b.imdb_score - a.imdb_score)
			for (let i = 0; i < 4; i++){
				moviesActions.innerHTML += `<img src="${ArrayMoviesActions[i].image_url}"></img>`
			}
			const carrouselRightAction = document.querySelector(".carrouselRightAction")
			const carrouselLeftAction = document.querySelector(".carrouselLeftAction")
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
		}
	})
}
for (let i = 9420; i < 9422; i++){
	fetch(`http://localhost:8000/api/v1/titles/?actor=&actor_contains=&company=&company_contains=&country=&country_contains=&director=&director_contains=&genre
	=Drama&genre_contains=&imdb_score=&imdb_score_max=&imdb_score_min=&lang=&lang_contains=&max_year=&min_year=&page=${i}&rating=&rating_contains=&sort_by=&title
	=&title_contains=&writer=&writer_contains=&year=`)
	.then(res => res.json())
	.then(data => {
		for (let movie of data.results){
			ArrayMoviesDramas.push(movie)
		}
		if (ArrayMoviesDramas.length == 10){
			ArrayMoviesDramas.sort((a, b) => b.imdb_score - a.imdb_score)
			for (let i = 0; i < 4; i++){
				moviesDramas.innerHTML += `<img src="${ArrayMoviesDramas[i].image_url}"></img>`
			}
			const carrouselRightDrama = document.querySelector(".carrouselRightDrama")
			const carrouselLeftDrama = document.querySelector(".carrouselLeftDrama")
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
		}
	})
}
for (let i = 1516; i < 1518; i++){
	fetch(`http://localhost:8000/api/v1/titles/?actor=&actor_contains=&company=&company_contains=&country=&country_contains=&director=&director_contains=&genre
	=Adventure&genre_contains=&imdb_score=&imdb_score_max=&imdb_score_min=&lang=&lang_contains=&max_year=&min_year=&page=${i}&rating=&rating_contains=&sort_by=&title
	=&title_contains=&writer=&writer_contains=&year=`)
	.then(res => res.json())
	.then(data => {
		for (let movie of data.results){
			ArrayMoviesAdventure.push(movie)
		}
		if (ArrayMoviesAdventure.length == 10){
			ArrayMoviesAdventure.sort((a, b) => b.imdb_score - a.imdb_score)
			for (let i = 0; i < 4; i++){
				moviesAdventures.innerHTML += `<img src="${ArrayMoviesAdventure[i].image_url}"></img>`
			}
			const carrouselRightAventure = document.querySelector(".carrouselRightAdventure")
			const carrouselLeftAventure = document.querySelector(".carrouselLeftAdventure")
			carrouselRightAventure.addEventListener("click", function(){
				moviesAdventures.innerHTML = ""
				for (let i = 4; i < 7; i++){
					moviesAdventures.innerHTML += `<img src="${ArrayMoviesAdventure[i].image_url}"></img>`
				}
			})
			carrouselLeftAventure.addEventListener("click", function(){
				moviesAdventures.innerHTML = ""
				for (let i = 0; i < 4; i++){
					moviesAdventures.innerHTML += `<img src="${ArrayMoviesAdventure[i].image_url}"></img>`
				}
			})
		}
	})
}

/*
for (let i=17168;i < 17172;i++){
	fetch(`http://localhost:8000/api/v1/titles/?page=${i}`)
	.then(res => res.json())
	.then(data => {
		for (let movie of data.results){
			allMovies.push(movie)
			convertScore = parseFloat(i.imdb_score)
			i.imdb_score = convertScore
		}
		allMovies.sort((a, b) => b.imdb_score - a.imdb_score)

		if (allMovies.length == 16){
			importMovie(movieBetter, allMovies[0].image_url)
			for (let a = 0; a < 4;a++){
				importMovie(moviesBetters, allMovies[a].image_url)
			}
			const arrayDrama = []
			const arrayAction = []
			const arrayAdventure = []

			for (let movie of allMovies){
				if (movie.genres.includes("Drama")){
					arrayDrama.push(movie)
				}
				if (movie.genres.includes("Action")){
					arrayAction.push(movie)
				}
				if (movie.genres.includes("Adventure")){
					arrayAdventure.push(movie)
				}
			}
			if (arrayAction.length < 7){
				for (let i = 1; i < 3; i++){
					fetch(`http://localhost:8000/api/v1/titles/?actor=&actor_contains=&company=&company_contains=&country=&country_contains=&director=&director_contains=&genre=Action&genre_contains=&imdb_score=&imdb_score_max=&imdb_score_min=&lang=&lang_contains=&max_year=&min_year=&page=${i}&rating=&rating_contains=&sort_by=&title=&title_contains=&writer=&writer_contains=&year=`)
					.then(res => res.json())
					.then(data => {
						for (let array of data.results){
							arrayAction.push(array)
						}
					})
				}
			}
			for (let i = 0; i < 4; i++){
				if (arrayDrama[i]){
					moviesDramas.innerHTML += `<img src='${arrayDrama[i].image_url}'></img>`
				}
				if (arrayAction[i]){
					moviesActions.innerHTML += `<img src='${arrayAction[i].image_url}'></img>`
				}
				if (arrayAdventure[i]){
					moviesAdventures.innerHTML += `<img src='${arrayAdventure[i].image_url}'></img>`
				}
			}

			const carrouselRight = document.querySelector(".carrouselRight")
			const carrouselLeft = document.querySelector(".carrouselLeft")
			carrouselRight.addEventListener("click", function(){
				moviesBetters.innerHTML = ""
				for (let i=4; i < 7;i++){
					moviesBetters.innerHTML += `<img src="${allMovies[i].image_url}"></img>`
				}
			})
			carrouselLeft.addEventListener("click", function(){
				moviesBetters.innerHTML = ""
				for (let i=0; i < 4;i++){
					moviesBetters.innerHTML += `<img src="${allMovies[i].image_url}"></img>`
				}
			})
		}
	})
}
for (let clickM of clickModal){
	clickM.addEventListener("click", function(e){
		const modal = document.querySelector("#modal")
		const closeModal = document.querySelector(".close")
		const textMovie = document.querySelector(".text")
		for (let i=17168;i < 17172;i++){
			fetch(`http://localhost:8000/api/v1/titles/?page=${i}`)
			.then(res => res.json())
			.then(data => {
				for (let movie of data.results){
					if (e.target.src == movie.image_url){
						modal.style.display = "block"
						console.log(movie)
						fetch(movie.url)
						.then(res => res.json())
						.then((informationMovie => {
							textMovie.innerHTML = `Title: ${informationMovie.title}<br>Genre du film: ${informationMovie.genres}<br>Date de sortie: ${informationMovie.year}
							<br>Evaluation: ${informationMovie.rated}<br>Score imdb: ${informationMovie.imdb_score}<br>Réalisateur: ${informationMovie.writers}
							<br> Acteurs: ${informationMovie.actors}<br> Durée: ${informationMovie.duration}min<br>Pays d'origine: ${informationMovie.countries}
							<br>Résumé: ${informationMovie.description} `
						}))
					}
				}
			})
		}
		closeModal.addEventListener("click", function (){
			modal.style.display = "none"
		})
	})
}
*/
/*

const scoreUrl = `http://localhost:8000/api/v1/titles/?sort_by=-imdb_score`
const url = `http://localhost:8000/api/v1/titles/`
let scoreMinimal = 8

function collecteMovieById(id) {
	const res = fetch(url + id)
	let data = res.json()
	return data
}
function allMovies(url, page=1, genre, movies=[]) {
	const fetchAllMovies = fetch(url)
}
*/
function checkedGenre(genre, classMovie, imageMovie){
	if(genre){
			classMovie.innerHTML += `<img src='${imageMovie}'></img>`
		}
}
function importMovie(classMovie, movieIndexImage){
	classMovie.innerHTML += `<img src='${movieIndexImage}'></img>`
}
