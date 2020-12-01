const vue = new Vue({
	el: '#container',
	data: {
		team1: "", team2: "", teams: [],
		casters: "",
		stage: "",
		team1URL: "", team2URL:""
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
		getLogo: function(team, side) {
			fetch(`/api/team/${team}/logo`)
				.then(res => {return res.json()})
				.then(res => {
					side === 'a' ? this.team1URL = res.url : this.team2URL = res.url
				});
			fetch(`/api/team/${team}/color`)
				.then(res => {return res.json()})
				.then(res => {
					let DOM = document.querySelector(`select#team-${side}-select`);
					DOM.style.backgroundColor = res.primary;
					DOM.style.color = res.secondary;
				});
		},
	}
});

vue.getTeams();

function send(){
	const {team1, team2, stage, casters} = vue
	const data = {
		team1: team1,
		team2: team2,
		stage: stage,
		casters: casters.trim().split(' '),
		team1URL: vue.team1URL,
		team2URL: vue.team2URL
	}

	nodecg.sendMessage('MatchInfo', data)
		.then(res => {})

	const DOM = document.querySelector('button.send');
	DOM.classList.add('sent');
	DOM.classList.remove('send')
	DOM.innerHTML = 'Отправлено'
	DOM.disabled = true;
	setTimeout(() => {
		DOM.classList.remove('sent');
		DOM.classList.add('send')
		DOM.innerHTML = 'Отправить'
		DOM.disabled = false;
	}, 2000)
}


