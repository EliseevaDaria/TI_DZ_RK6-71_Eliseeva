const DOWNLOAD_TESTERS = 'DOWNLOAD_TESTERS';
const ADD_TESTER = 'ADD_TESTER';
const ADD_REKVEST = 'ADD_REKVEST';
const EDIT_REKVEST = 'EDIT_REKVEST';
const MOVE_REKVEST_BACK = 'MOVE_REKVEST_BACK';
const MOVE_REKVEST_FORWARD = 'MOVE_REKVEST_FORWARD';
const REMOVE_REKVEST = 'REMOVE_REKVEST';

const downloadFlowersAction = (flowers) => ({
	type: DOWNLOAD_TESTERS,
	payload: flowers
});

const addFlowerAction = (flowerName) => ({
	type: ADD_TESTER,
	payload: flowerName
});

const addRekvestAction = ({ rekvestName, flowerId }) => ({
	type: ADD_REKVEST,
	payload: {
		flowerId,
		rekvestName
	}
});

const editRekvestAction = ({ flowerId, rekvestId, newRekvestName }) => ({
	type: EDIT_REKVEST,
	payload: {
		flowerId,
		rekvestId,
		newRekvestName
	}
});

const moveRekvestBackAction = ({ flowerId, rekvestId}) => ({
	type: MOVE_REKVEST_BACK,
	payload: {
		flowerId,
		rekvestId,
	}
});

const moveRekvestForwardAction = ({ flowerId, rekvestId}) => ({
	type: MOVE_REKVEST_FORWARD,
	payload: {
		flowerId,
		rekvestId,
	}
});

const removeRekvestAction = ({ flowerId, rekvestId}) => ({
	type: REMOVE_REKVEST,
	payload: {
		flowerId,
		rekvestId,
	}
});

export {
	DOWNLOAD_TESTERS,
	ADD_TESTER,
	ADD_REKVEST,
	EDIT_REKVEST,
	MOVE_REKVEST_BACK,
	MOVE_REKVEST_FORWARD,
	REMOVE_REKVEST,
	downloadFlowersAction,
	addFlowerAction,
	addRekvestAction,
	editRekvestAction,
	moveRekvestBackAction,
	moveRekvestForwardAction,
	removeRekvestAction
};