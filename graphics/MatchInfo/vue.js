const vue = new Vue({
	el: '#container',
	data: {
		team1: "", team2: "",
		casters: "",
		stage: "",
		team1URL: "", team2URL:""
	},
	methods: {
		getLogo: function(team, side) {
			fetch(`/api/team/${team}/logo`)
				.then(res => {return res.json()})
				.then(res => {
					side === 'a' ? this.team1URL = res.url : this.team2URL = res.url
				});
		},
	}
});

nodecg.listenFor('MatchInfo', (data) => {
	for (let key of Object.keys(data)){
		vue[key] = data[key];
	}

	//Here I check if the data transfers got to vue object.
	//console.table(Object.values(vue.$data));
});

//TODO: Сверстать HTML со стилями!
