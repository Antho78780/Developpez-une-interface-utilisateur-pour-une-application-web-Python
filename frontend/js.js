const moviesAdventures = document.querySelector(".movies_adventures")
const moviesDramas = document.querySelector(".movies_dramas")
const moviesActions = document.querySelector(".movies_actions")
const moviesBetters = document.querySelector(".movies_betters")

const previous = document.querySelectorAll(".previous")
const next = document.querySelectorAll(".next")
const arrayGenre = ["Action", "Drama", "Adventure"]
const allMovies = []
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
				allMovies.splice(4, 1)
				const arrayMoviesBetters = []
				for (let movie of allMovies){
					if (arrayMoviesBetters.length < 7){
						arrayMoviesBetters.push(movie)
					}
				}
				fetch(allMovies[0].url)
				.then(res => res.json())
				.then((infoMovie) => {
					const movieBetter = document.querySelector(".movie_better")
					movieBetter.innerHTML = `<img src="${allMovies[0].image_url}"class='img_movie'></img><div class="block_description">
					<h2 class="description">${infoMovie.title}</h2><p class="description">${infoMovie.description}</p><button type="button" class="btn btn-primary">
					<i class="fas fa-sharp fa-solid fa-play"></i>
					Play</button></div>`
				})
				for (let movie of arrayMoviesBetters){
					moviesBetters.innerHTML += `<img src="${movie.image_url}" class="img_sliderBest active">`
				}
				let cache = {}
				const filterAllMovies = allMovies.filter((el) => cache[el.id]?0:cache[el.id]=1)
				const ArrayMoviesActions = []
				const ArrayMoviesDramas = []
				const ArrayMoviesAdventure = []
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
				for (let movie of ArrayMoviesActions){
					moviesActions.innerHTML += `<img src="${movie.image_url}" class="img_sliderAction active">`
				}
				for (let movie of ArrayMoviesDramas){
					moviesDramas.innerHTML += `<img src="${movie.image_url}" class="img_sliderDrama active">`
				}
				for (let movie of ArrayMoviesAdventure){
					moviesAdventures.innerHTML += `<img src="${movie.image_url}" class="img_sliderAdventure active">`
				}
				const img_sliderBest = document.getElementsByClassName("img_sliderBest")
				const img_sliderActions = document.getElementsByClassName("img_sliderAction")
				const img_sliderDrama = document.getElementsByClassName("img_sliderDrama")
				const img_sliderAdventure = document.getElementsByClassName("img_sliderAdventure")
				const numberMovie = img_sliderBest.length
				for(let i = 4; i < numberMovie; i++){
					img_sliderBest[i].classList.remove("active")
					img_sliderActions[i].classList.remove("active")
					img_sliderDrama[i].classList.remove("active")
					img_sliderAdventure[i].classList.remove("active")
				}
				carrouselMovie(next[0],previous[0], img_sliderBest, numberMovie)
				carrouselMovie(next[1],previous[1], img_sliderActions, numberMovie)
				carrouselMovie(next[2],previous[2], img_sliderDrama, numberMovie)
				carrouselMovie(next[3],previous[3], img_sliderAdventure, numberMovie)
				const clickModal = document.querySelectorAll(".clickModal")
				const textMovie = document.querySelector(".text")
				const modal = document.querySelector("#modal")
				const closeModal = document.querySelector(".close")
				for (clickM of clickModal){
					clickM.addEventListener("click", function(e){
						for (let movie of filterAllMovies){
							if (e.target.src == movie.image_url){
								modal.style.display = "block"
								fetch(movie.url)
								.then(res => res.json())
								.then(informationMovie => {
									textMovie.innerHTML = `<img src="${informationMovie.image_url}" class="imgModal"><h1>Titre: ${informationMovie.title}</h1>
									<p>Genre: ${informationMovie.genres}</p><p>Date de sortie: ${informationMovie.date_published}</p><p>Ratio: ${informationMovie.rated}</p>
									<p>Score imdb: ${informationMovie.imdb_score}</p><p>Réalisateur: ${informationMovie.writers}</p><p>Acteurs: ${informationMovie.actors}</p>
									<p>Durée du film: Durée: ${informationMovie.duration}min</p><p>Pays d'origine: ${informationMovie.countries}</p>
									<p>Résultat au box office: ${informationMovie.worldwide_gross_income}$</p><p>Résumé du film: ${informationMovie.description}</p>`
								})
							}
						}
						closeModal.addEventListener("click", function(){
							modal.style.display = "none"
						})
					})
				}
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
let posFirst = 0;
let posLast = 4;

function carrouselMovie(indexButtonNext, indexButtonPrevious, classMovie, numberMovie){
	indexButtonNext.addEventListener("click", function(){
		console.log(classMovie)
		if (posLast == numberMovie - 1){
			for (let i = 3; i < numberMovie; i++){
				classMovie[i].classList.remove("active")
			}
			for (let i = 0; i < 4; i++){
				classMovie[i].classList.add("active")
	
			}
			return posFirst = 0, posLast = 4
		}
		if (classMovie[posFirst].classList.contains("active")){
			classMovie[posFirst].classList.remove("active")
		}
		else {
			posFirst++
			classMovie[posFirst].classList.remove("active")
		}
		if (classMovie[posLast].classList.contains("active")){
			posLast++
		}
		classMovie[posLast].classList.add("active")
	})
	indexButtonPrevious.addEventListener("click", function(){
		console.log(classMovie)
		if (classMovie[posFirst].classList.contains("active") && posFirst != 0){
			posFirst--
			posLast--
			classMovie[posFirst].classList.add("active")
			classMovie[posLast].classList.remove("active")
		}
		else {
			classMovie[posLast].classList.remove("active")
			classMovie[posFirst].classList.add("active")
		}
	})
}