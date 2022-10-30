const movieBetter = document.querySelector(".movie_better")
const moviesBetters = document.querySelector(".movies_betters")
const moviesAdventures = document.querySelector(".movies_adventures")
const moviesDramas = document.querySelector(".movies_dramas")
const moviesActions = document.querySelector(".movies_actions")
const clickModal = document.querySelectorAll(".clickModal")
const allMovies = []


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
			console.log(allMovies)
			importMovie(movieBetter, allMovies[0].image_url)
			for (let a = 0; a < 4;a++){
				importMovie(moviesBetters, allMovies[a].image_url)
			}
			for (let movie of allMovies){
				checkedGenre(movie.genres.includes("Drama"), moviesDramas, movie.image_url)
				checkedGenre(movie.genres.includes("Adventure"), moviesAdventures, movie.image_url)
				checkedGenre(movie.genres.includes("Action"), moviesActions, movie.image_url)
			}
			const carrouselRight = document.querySelector(".carrouselRight")
			const carrouselLeft = document.querySelector(".carrouselLeft")
			carrouselRight.addEventListener("click", function(e){
				for (let i = 4; i < 7; i++){
					moviesBetters.innerHTML += `<img src='${allMovies[i].image_url}'></img>`
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
function checkedGenre(genre, classMovie, imageMovie, test){
	if(genre){
			classMovie.innerHTML += `<img src='${imageMovie}'></img>`
		}
}
function importMovie(classMovie, movieIndexImage){
	classMovie.innerHTML += `<img src='${movieIndexImage}'></img>`
}
