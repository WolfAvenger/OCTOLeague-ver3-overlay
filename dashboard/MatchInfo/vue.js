const vue = new Vue({
	el: '#container',
	data: {
		team1: "",
		team2: "",
		teams: []
	},
	methods: {
		getTeams: function() {
			fetch('/api/teamlist')
				.then(res => {
					return res.json()
				})
				.then(res => {
					this.teams = res.data.sort()
				});
		},
		getLogo: function(team) {
			let url;
			fetch(`/api/team/${team}/logo`)
				.then(res => {return res.json()})
				.then(res => url = res.url);
			return url;
		}
	}
});

//vue.getTeams();
