export function receiveLocalStorage(){
	fetch('/api/localStorage')
		.then(res => {return res.json()})
		.then(res => {
			console.log(res)
			for (let key of Object.keys(res)){
				if (Array.isArray(res[key])){
					res[key] = res[key].join(' ')
				}
				vue[key] = res[key];
			}
		});
	setTimeout(() => {
		vue.getLogo(vue.team1, 'a')
		vue.getLogo(vue.team2, 'b')
	}, 1000)
}
