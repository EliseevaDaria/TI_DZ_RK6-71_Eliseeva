import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { addFlower, getFlowers } from '../../models/AppModel';
import {
	addFlowerAction,
	downloadFlowersAction
} from '../../store/action';
import Flower from '../Flower/Flower';
import './App.css'

class App extends PureComponent {
	state = {
		isInputShown: false,
		inputValue: ''
	};

	async componentDidMount() {
		const flowers = await getFlowers();
		this.props.downloadFlowersDispatch(flowers);
	}

	showInput = () => this.setState({ isInputShown: true });

	onInputChange = ({ target: { value } }) => this.setState({
		inputValue: value
	});

	onKeyDown = async (event) => {
		if (event.key === 'Escape') {
			this.setState({
				isInputShown: false,
				inputValue: ''
			});
			return;
		}

		if (event.key === 'Enter') {
			if (this.state.inputValue) {
				const info = await addFlower({
					flowerName: this.state.inputValue,
					rekvestes: []
				});
				console.log(info);

				this.props.addFlowerDispatch(this.state.inputValue);
			}

			this.setState({
				isInputShown: false,
				inputValue: ''
			})
		}
	};

	render() {
		const { isInputShown, inputValue } = this.state;
		const { flowers } = this.props;

		return (
			<Fragment>
				<header id="main-header">
					Менеджер
					<div id="author">
						Центральная база цветов
						<div className="avatar"></div>
					</div>
				</header>
				<main id="ra-container">
					{flowers.map((flower, index) => (
						<Flower
							flowerName = {flower.flowerName}
							flowerId = {index}
							rekvestes={flower.rekvestes}
							key = {`list${index}`}
						/>
					))}
					<div className="ra-flower">
						{!isInputShown && (
							<header 
								className="ra-flower-header"
								onClick = {this.showInput}>
								Добавить флориста
							</header>
						)}
						{isInputShown && (
							<input
								type="text"
								id="add-flower-input"
								placeholder="Имя флориста"
								value = { inputValue }
								onChange = {this.onInputChange}
								onKeyDown={this.onKeyDown}
							/>
						)}
					</div>
				</main>
			</Fragment>
		)
	}
}

const mapStateToProps = ({ flowers }) => ({ flowers });

const mapDispatchToProps = dispatch => ({ 
	addFlowerDispatch: (flowerName) => dispatch(addFlowerAction(flowerName)),
	downloadFlowersDispatch: (flowers) => dispatch(downloadFlowersAction(flowers))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
