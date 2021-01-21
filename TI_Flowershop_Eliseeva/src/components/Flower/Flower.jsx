import React, { memo } from 'react';
import { connect } from 'react-redux';
import { addRekvest as addRekvestServer } from '../../models/AppModel';
import {
	addRekvestAction
} from '../../store/action';
import Rekvest from '../Rekvest/Rekvest';

const Flower = ({
	flowerName,
	flowerId,
	rekvestes,
	addRekvestDispatch
}) => {
	const addRekvest = async () => {
		let rekvestName = prompt('Введите Фамилию заказчика и информацию о заказе');

		if (!rekvestName) return;

		rekvestName = rekvestName.trim();

		if (!rekvestName) return;

    const info = addRekvestServer({ flowerId, rekvestName });
    console.log(info);
		addRekvestDispatch({ rekvestName, flowerId });
	};

	return(<div className="ra-flower">
      <header className="ra-flower-header">
        {flowerName}
      </header>
      <div className="ra-flower-rekvestes">
      	{rekvestes.map((rekvest, index) => (
      		<Rekvest
      			rekvestName = {rekvest}
      			rekvestId = {index}
      			flowerId = {flowerId}
      			key = {`list${flowerId}-rekvest${index}`}
      		/>
      	))}
      </div>
      <footer
      	className="ra-flower-add-rekvest"
      	onClick = {addRekvest}>
        Добавить заказ
      </footer>
    </div>);
};

const mapDispatchToProps = dispatch => ({
	addRekvestDispatch: ({ flowerId, rekvestName }) => 
		dispatch(addRekvestAction({ rekvestName, flowerId }))
})

export default connect(
	null,
	mapDispatchToProps
)(memo(Flower));
