const moviesAdventures = document.querySelector(".movies_adventures")
const moviesDramas = document.querySelector(".movies_dramas")
const moviesActions = document.querySelector(".movies_actions")
const moviesBetters = document.querySelector(".movies_betters")

const previous = document.querySelector(".previous")
const next = document.querySelector(".next")
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
				for (let movie of arrayMoviesBetters){
					moviesBetters.innerHTML += `<img src="${movie.image_url}" class="img_sliderBest active">`
				}
				const img_sliderBest = document.getElementsByClassName("img_sliderBest")
				const numberImg_sliderBest = img_sliderBest.length
				console.log(img_sliderBest)
				for (let i = 4; i < numberImg_sliderBest;i++){
					img_sliderBest[i].classList.remove("active")
				}
				let posFirst = 0;
				let posLast = 4;
				next.addEventListener("click", function(){
					if (posLast == numberImg_sliderBest - 1){
						for (let i = 3; i < numberImg_sliderBest; i++){
							img_sliderBest[i].classList.remove("active")
						}
						for (let i = 0; i < 4; i++){
							img_sliderBest[i].classList.add("active")
						}
						posFirst = 0
						posLast = 4
					}
					if (img_sliderBest[posFirst].classList.contains("active")){
						img_sliderBest[posFirst].classList.remove("active")
					}
					else {
						posFirst++
						img_sliderBest[posFirst].classList.remove("active")
					}
					if (img_sliderBest[posLast].classList.contains("active")){
						posLast++
					}
					img_sliderBest[posLast].classList.add("active")
					console.log(img_sliderBest)
					
				})
				previous.addEventListener("click", function(){
					console.log(posFirst)
					console.log(posLast)
					img_sliderBest[posFirst].classList.add("active")
					img_sliderBest[posLast].classList.remove("active")
					if (img_sliderBest[posFirst].classList.contains("active")){
						posFirst--
						img_sliderBest[posFirst].classList.remove("active")
					}
					console.log(img_sliderBest)
				})
				/*
				let etape = -1
				let etape2= 3
				
				previous.addEventListener("click", function(){
					etape++
					etape2++
					console.log(img_sliderBest)
					console.log(etape, etape2)
					img_sliderBest[etape].classList.remove("active")
					img_sliderBest[etape2].classList.add("active")
					if(etape2 == numberImg_sliderBest - 1){
						console.log("fin des films")
						for (let i = 4; i < numberImg_sliderBest; i++){
							img_sliderBest[i].classList.remove("active")
						}
						for (let i = 0; i < 4;i ++){
							img_sliderBest[i].classList.add("active")
						}
						etape = -1
						etape2= 3
					}
				})
				next.addEventListener("click",  function(){
					img_sliderBest[3].classList.remove("active")

				})
				*/
				fetch(allMovies[0].url)
				.then(res => res.json())
				.then((infoMovie) => {
					const movieBetter = document.querySelector(".movie_better")
					movieBetter.innerHTML = `<p>${infoMovie.title}</p><img src="${allMovies[0].image_url}"><a class="play-btn" href="#"></a></img>
					<p class="description">${infoMovie.description}</p>`
				})

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
				const img_sliderActions = document.getElementsByClassName("img_sliderAction")
				const img_sliderDrama = document.getElementsByClassName("img_sliderDrama")
				const img_sliderAdventure = document.getElementsByClassName("img_sliderAdventure")
				for(let i = 4; i < numberImg_sliderBest; i++){
					img_sliderActions[i].classList.remove("active")
					img_sliderDrama[i].classList.remove("active")
					img_sliderAdventure[i].classList.remove("active")
				}
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
