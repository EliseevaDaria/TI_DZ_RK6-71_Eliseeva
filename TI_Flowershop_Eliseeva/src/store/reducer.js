import {
	DOWNLOAD_TESTERS,
	ADD_TESTER,
	ADD_REKVEST,
	EDIT_REKVEST,
	MOVE_REKVEST_BACK,
	MOVE_REKVEST_FORWARD,
	REMOVE_REKVEST
} from './action';

const initialState = {
	flowers: []
};

export default function reducer(state = initialState, { type, payload }) {
	switch(type) {
		case DOWNLOAD_TESTERS:
			return {
				...state,
				flowers: payload
			};

		case ADD_TESTER:
			return {
				...state,
				flowers: [
					...state.flowers,
					{
						flowerName: payload,
						rekvestes: []
					}
				]
			};

		case ADD_REKVEST:
			return {
				...state,
				flowers: state.flowers.map(
					(flower, index) => index !== payload.flowerId
						? { ...flower }
						: { ...flower, rekvestes: [...flower.rekvestes, payload.rekvestName] }
				)
			};

		case EDIT_REKVEST:
			return {
				...state,
				flowers: state.flowers.map(
					(flower, index) => index !== payload.flowerId
						? { ...flower }
						: {
							...flower,
							rekvestes: flower.rekvestes.map(
								(rekvest, rekvestIndex) => rekvestIndex === payload.rekvestId
									? payload.newRekvestName
									: rekvest
							)
						}
				)
			};

		case MOVE_REKVEST_BACK:
			if (payload.flowerId === 0) return state;
			const movedBackRekvest = state.flowers[payload.flowerId].rekvestes[payload.rekvestId];
			const backRekvestes = state.flowers[payload.flowerId].rekvestes.filter(
				rekvest => rekvest !== movedBackRekvest
			);
			return {
				...state,
				flowers: state.flowers.map((flower, index) => {
					if (index === payload.flowerId - 1) {  
						return {
							...flower,
							rekvestes: [...flower.rekvestes, movedBackRekvest]
						};
					}

					if (index === payload.flowerId) {
						return {
							...flower,
							rekvestes: backRekvestes  
						};
					}

					return { ...flower };
				})
			};

		case MOVE_REKVEST_FORWARD:
			if (payload.flowerId === state.flowers.lenght - 1) return state;
			const movedForwardRekvest = state.flowers[payload.flowerId].rekvestes[payload.rekvestId];
			const forwardRekvestes = state.flowers[payload.flowerId].rekvestes.filter(
				rekvest => rekvest !== movedForwardRekvest
			);
			return {
				...state,
				flowers: state.flowers.map((flower, index) => {
					if (index === payload.flowerId + 1) {  
						return {
							...flower,
							rekvestes: [...flower.rekvestes, movedForwardRekvest]
						};
					}

					if (index === payload.flowerId) {
						return {
							...flower,
							rekvestes: forwardRekvestes
						};
					}

					return { ...flower };
				})
			};

		case REMOVE_REKVEST:
			const removedRekvest = state.flowers[payload.flowerId].rekvestes[payload.rekvestId];
			const rekvestes = state.flowers[payload.flowerId].rekvestes.filter(
				rekvest => rekvest !== removedRekvest
			);
			return {
				...state,
				flowers: state.flowers.map(
					(flower, index) => index === payload.flowerId
						? {
								...flower,
								rekvestes
						}
						: { ...flower }
				)
			};

		default:
			return state;
	}

}