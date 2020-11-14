'use strict';
const path = require('path');

module.exports = function (nodecg) {
	const router = nodecg.Router();
	const teams = nodecg.Replicant('assets:logos');
	const maps = nodecg.Replicant('assets:maps');

	router.get('/teamlist', (req, res) =>{
		const data = {
			data: teams.__value.map(elem => elem.name)
		}
		res.json(data);
	});

	router.get('/team/:name/:info', (req, res) => {
		const { name, info } = req.params;

		switch(info){
			case 'logo':
				let found = teams.__value.filter(elem => elem.name === name)[0];
				res.json({
					url: found.url
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

	router.get('/:type/:name', (req, res) => {
		const {type, name} = req.params;
		res.sendFile(`${name}.ttf`,
			{root: path.join(`${__dirname}`,`../files/${type}`)})
	})

	nodecg.mount('/api', router);
};
