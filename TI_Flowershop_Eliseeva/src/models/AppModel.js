const getFlowers = async () => {
	const response = await fetch('http://localhost:3001/flowers');
	const flowers = await response.json();

	return flowers;
}

const addFlower = async (flower) => {
	const response = await fetch('http://localhost:3001/flowers', {
		method: 'POST',
		body: JSON.stringify(flower),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const { info } = await response.json();

	return info;
};

const addRekvest = async ({ flowerId, rekvestName }) => {
	const response = await fetch(`http://localhost:3001/flowers/${flowerId}/rekvestes`, {
		method: 'POST',
		body: JSON.stringify({ rekvestName }),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const { info } = await response.json();

	return info;
};

const editRekvest = async ({ flowerId, rekvestId, newRekvestName }) => {
	const response = await fetch(`http://localhost:3001/flowers/${flowerId}/rekvestes/${rekvestId}`, {
		method: 'PATCH',
		body: JSON.stringify({ newRekvestName }),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const { info } = await response.json();

	return info;
};

const removeRekvest = async ({ flowerId, rekvestId }) => {
	const response = await fetch(`http://localhost:3001/flowers/${flowerId}/rekvestes/${rekvestId}`, {
		method: 'DELETE',
	});

	const { info } = await response.json();

	return info;
};

const moveRekvest = async ({ flowerId, rekvestId, destFlowerId }) => {
	const response = await fetch(`http://localhost:3001/flowers/${flowerId}`, {
		method: 'PATCH',
		body: JSON.stringify({ rekvestId, destFlowerId }),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (response.status !== 200) {
		const { error } = await response.json();
		return Promise.reject(error);
	}

	const { info } = await response.json();

	return info;
};

export {
	getFlowers,
	addFlower,
	addRekvest,
	editRekvest,
	removeRekvest,
	moveRekvest
};