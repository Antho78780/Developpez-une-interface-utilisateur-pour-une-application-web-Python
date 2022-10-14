const api = fetch(`http://localhost:8000/api/v1/titles/?page=1`)
api
.then(res => res.json())
.then(res => {
	for (let i of res.results){
		convertScore = parseFloat(i.imdb_score)
	}
})
