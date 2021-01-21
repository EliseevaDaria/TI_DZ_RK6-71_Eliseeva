const express = require('express');
const app = express();
const { readData, writeData } = require('./utils');

const port = 3001;
const hostname = 'localhost';

let flowers = [];

// Middleware для разрешения CORS-запросов
app.use((request, response, next) => {
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

// Middleware для разрешения CORS-запросов
app.use((request, response, next) => {
	console.log(
		(new Date()).toISOString(),
		request.method,
		request.originalUrl
	);
	next();
});

// Middleware для правильного представления request.body
app.use(express.json());

//-------- Routes - пути, по которым идут запросы ----------

app.options('/*', (request, response) => {
	response.statusCode = 200;
	response.send('OK');
});

app.get('/flowers', async (request, response) => {
	flowers = await readData();
	response.setHeader('Content-Type', 'application/json');
	response.json(flowers);
});

app.post('/flowers', async (request, response) => {
	flowers.push(request.body);
	await writeData(flowers);

	response.setHeader('Content-Type', 'application/json');
	response.status(200).json({
		info: `Flower '${request.body.flowerName}' was successfully added`
	});
});

app.post('/flowers/:flowerId/rekvestes', async (request, response) => {
	const { rekvestName } = request.body;
	const flowerId = Number(request.params.flowerId);

	flowers[flowerId].rekvestes.push(rekvestName);
	await writeData(flowers);

	response.setHeader('Content-Type', 'application/json');
	response.status(200).json({
		info: `Rekvest '${rekvestName}' was successfully added in flower '${flowers[flowerId].flowerName}'`
	});
});

app.patch('/flowers/:flowerId/rekvestes/:rekvestId', async (request, response) => {
	const { newRekvestName } = request.body;
	const flowerId = Number(request.params.flowerId);
	const rekvestId = Number(request.params.rekvestId);

	flowers[flowerId].rekvestes[rekvestId] = newRekvestName;
	await writeData(flowers);

	response.setHeader('Content-Type', 'application/json');
	response.status(200).json({
		info: `Rekvest '${rekvestId}' in '${flowers[flowerId].flowerName}' was successfully renamed`
	});
});

app.delete('/flowers/:flowerId/rekvestes/:rekvestId', async (request, response) => {
	const flowerId = Number(request.params.flowerId);
	const rekvestId = Number(request.params.rekvestId);

	const removedRekvest = flowers[flowerId].rekvestes[rekvestId];
	flowers[flowerId].rekvestes = flowers[flowerId].rekvestes.filter(
		(rekvest, index) => index !== rekvestId
	);
	await writeData(flowers);

	response.setHeader('Content-Type', 'application/json');
	response.status(200).json({
		info: `Rekvest '${removedRekvest}' was successfully removed`
	});
});

app.patch('/flowers/:flowerId', async (request, response) => {
	const { rekvestId, destFlowerId } = request.body;
	const flowerId = Number(request.params.flowerId);

	if (destFlowerId < 0 || destFlowerId >= flowers.lenght) {
		response.setHeader('Content-Type', 'application/json');
		response.status(400).json({
			error: `Wrong destination flower ID: ${destFlowerId}`
		});
	}

	const movedRekvest = flowers[flowerId].rekvestes[rekvestId];
	flowers[flowerId].rekvestes = flowers[flowerId].rekvestes.filter(
		(rekvest, index) => index !== rekvestId
	);
	flowers[destFlowerId].rekvestes.push(movedRekvest);
	await writeData(flowers);

	response.setHeader('Content-Type', 'application/json');
	response.status(200).json({
		info: `Rekvest '${movedRekvest}' was successfully moved`
	});
});

app.listen(port, hostname, (err) => {
	if (err) {
		console.log('Error: ', err);
	}

	console.log(`Server is working on '${hostname}:${port}'`);
});