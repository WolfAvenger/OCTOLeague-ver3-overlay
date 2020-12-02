'use strict';
const path = require('path');
const fs = require('fs');

module.exports = function (nodecg) {
	const router = nodecg.Router();
	const teams = nodecg.Replicant('assets:logos');
	const maps = nodecg.Replicant('assets:maps');
	const colors = nodecg.Replicant('assets:teamColors');
	const videos = nodecg.Replicant('assets:backgroundVideos');
	let localStorage = {};

	//region ROUTER

	router.get('/teamlist', (req, res) =>{
		const data = {
			data: teams.__value.map(elem => elem.name)
		}
		res.json(data);
	});

	router.get('/team/:name/:info', (req, res) => {
		const { name, info } = req.params;
		let found;
		switch(info){
			case 'logo':
				found = teams.__value.filter(elem => elem.name === name)[0];
				res.json({
					url: found.url
				});
				break;
			case 'color':
				found = fs.readFileSync(`${path.join(__dirname, `../../../${colors.__value[0].url}`)}`).toString();
				found = JSON.parse(found)
				res.json({
					primary: found[name].primary,
					secondary: found[name].secondary
				});
				break;
			case 'roster':
				//TODO: send back team roster data
				break;
			default:
				break;
		}
	});

	router.get('/map/:name', (req, res) => {
		const { name } = req.params;
		const found = maps.filter(elem => elem.name === name);
		res.json({
			url: found.url
		});
	});

	router.get('/bg', (req, res) => {
		videos.__value.forEach(elem => console.log(elem.name))
		const url = videos.__value[0];
		console.log(url);
		res.sendFile(url.url, {root: path.join(__dirname, '../../../')});
	})

	router.get('/:type/:name', (req, res) => {
		const {type, name} = req.params;
		const types = {
			'font': 'ttf',
			'js': 'js',
			'style': 'css',
		}
		res.sendFile(`${name}.${types[type]}`,
			{root: path.join(`${__dirname}`,`../files/${type}`)})
	})

	router.get('/localstorage', (req, res) => {
		res.json(localStorage);
	})

	//endregion

	//region LocalStorage

	nodecg.listenFor('MatchInfo', data => {
		for (let key of Object.keys(data)){
			console.log(key, data)
			localStorage[key] = data[key];
		}
	})

	//endregion

	nodecg.mount('/api', router);
};
