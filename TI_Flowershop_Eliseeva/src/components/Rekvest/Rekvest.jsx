import React, { memo } from 'react';
import { connect } from 'react-redux';
import {
	editRekvest as editRekvestServer,
	moveRekvest as moveRekvestServer,
	removeRekvest as removeRekvestServer
} from '../../models/AppModel';
import {
	editRekvestAction,
	moveRekvestBackAction,
	moveRekvestForwardAction,
	removeRekvestAction
} from '../../store/action';

const Rekvest = ({
	rekvestName,
	rekvestId,
	flowerId,
	editRekvestDispatch,
	moveRekvestBackDispatch,
	moveRekvestForwardDispatch,
	removeRekvestDispatch
}) => {
	const editRekvest = async () => {
		let newRekvestName = prompt('Редактировать заказ', rekvestName);

		if (!newRekvestName) return;

		newRekvestName = newRekvestName.trim();

		if (!newRekvestName || newRekvestName === rekvestName) return;

		const info = await editRekvestServer({ flowerId, rekvestId, newRekvestName });
		console.log(info);

		editRekvestDispatch({ flowerId, rekvestId, newRekvestName });
	};

	const removeRekvest = async () => {
		if (window.confirm(`Заказ '${rekvestName}' будет удален. Продолжить?`)) {
			const info = await removeRekvestServer({ flowerId, rekvestId });
			console.log(info);

			removeRekvestDispatch({ flowerId, rekvestId });
		}
	};

	const moveRekvestBack = async () => {
		try {
			const info = await moveRekvestServer({
				flowerId,
				rekvestId,
				destFlowerId: flowerId - 1
			});
			console.log(info);

			moveRekvestBackDispatch({ flowerId, rekvestId });
		} catch (error) {
			console.log(error);
		}
	};

	const moveRekvestForward = async () => {
		try {
			const info = await moveRekvestServer({
				flowerId,
				rekvestId,
				destFlowerId: flowerId + 1
			});
			console.log(info);

			moveRekvestForwardDispatch({ flowerId, rekvestId });
		} catch (error) {
			console.log(error);
		}
	};

	return(
		<div className="ra-flower-rekvest">
			<div className="ra-flower-rekvest-text">
				{rekvestName}
			</div>
			<div className="ra-flower-rekvest-controls">
				<div className="ra-flower-rekvest-controls-row">
					<div 
						className="ra-flower-rekvest-controls-icon left-arrow-icon"
						onClick = {moveRekvestBack}
					></div>
					<div
						className="ra-flower-rekvest-controls-icon right-arrow-icon"
						onClick = {moveRekvestForward}
					></div>
				</div>
				<div className="ra-flower-rekvest-controls-row">
					<div
						className="ra-flower-rekvest-controls-icon edit-icon"
						onClick = {editRekvest}
					></div>
					<div
						className="ra-flower-rekvest-controls-icon delete-icon"
						onClick = {removeRekvest}
					></div>
				</div>
			</div>
		</div>
	);
};

const mapDispatchToProps = dispatch => ({
	editRekvestDispatch: ({ flowerId, rekvestId, newRekvestName }) =>
		dispatch(editRekvestAction({ flowerId, rekvestId, newRekvestName })),
	moveRekvestBackDispatch: ({ flowerId, rekvestId}) =>
		dispatch(moveRekvestBackAction({ flowerId, rekvestId})),
	moveRekvestForwardDispatch: ({ flowerId, rekvestId}) =>
		dispatch(moveRekvestForwardAction({ flowerId, rekvestId})),
	removeRekvestDispatch: ({ flowerId, rekvestId}) =>
		dispatch(removeRekvestAction({ flowerId, rekvestId}))
});

export default connect(
	null,
	mapDispatchToProps
)(memo(Rekvest))
