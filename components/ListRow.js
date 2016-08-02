import React, { Component, PropTypes } from 'react';
import {
	View,
	Text
} from 'react-native';
import Swipeout from 'react-native-swipeout';

import styles from '../styles/styles.js';
import { formatNumber } from '../helpers/helpers.js';

export default class ListRow extends Component {
	static propTypes = {
		_id: PropTypes.string,
		amount: PropTypes.number,
		category: PropTypes.string,
		date: PropTypes.string,
		onDelete: PropTypes.func
	}

	render() {
		const swipeBtns = [{
			text: 'Delete',
			backgroundColor: 'red',
			onPress: () => {
				this.props.onDelete(this.props._id);
			}
		}];
		const dateLength = 5;

		return (
			<Swipeout
				right={ swipeBtns }
				autoClose={ true }
				backgroundColor="transparent"
				>
				<View style={ styles.listRow }>
					<Text style={ styles.listDate }>
						{ this.props.date.slice(0, dateLength) }
					</Text>
					<Text style={ styles.listCategory }>
						{ this.props.category }
					</Text>
					<Text style={ styles.listAmount }>
						{ formatNumber(this.props.amount) }
					</Text>
				</View>
			</Swipeout>
		);
	}
}
