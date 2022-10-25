const movieBetter = document.querySelector(".movie_better")
const moviesBetters = document.querySelector(".movies_betters")
const moviesAdventures = document.querySelector(".movies_adventures")
const moviesDramas = document.querySelector(".movies_dramas")
const moviesBiography = document.querySelector(".movies_biography")
const allMovies = []

for (let i=1;i < 3;i++){
	const api = fetch(`http://localhost:8000/api/v1/titles/?page=${i}`)
	api
	.then(res => res.json())
	.then(res => {
		for (let movie of res.results){
			allMovies.push(movie)
			convertScore = parseFloat(i.imdb_score)
			i.imdb_score = convertScore
		}
		allMovies.sort((a, b) => b.imdb_score - a.imdb_score)
		if (allMovies.length == 10){
			movieBetter.innerHTML = `<img src='${allMovies[0].image_url}'></img>`
			for (let a = 0; a < 7;a++){
				moviesBetters.innerHTML += `<img src='${allMovies[a].image_url}'></img>`
			}
			console.log(allMovies)
			for (let movie of allMovies){
				checkedGenre(movie.genres.includes("Adventure"), moviesAdventures, movie.image_url)
				checkedGenre(movie.genres.includes("Drama"), moviesDramas, movie.image_url)
				checkedGenre(movie.genres.includes("Biography"), moviesBiography, movie.image_url)
			}
	
		}

	})
}
moviesBetters.addEventListener("click", function(e) {
	const modal = document.getElementById("modal")
	const closeModal = document.querySelector(".close")
	const textMovie = document.querySelector(".text")
	for (let i=1;i < 3;i++){
		fetch(`http://localhost:8000/api/v1/titles/?page=${i}`)
		.then(res => res.json())
		.then(res => {
			for (let movie of res.results){
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
