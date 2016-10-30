import React, { Component, PropTypes } from 'react';
import {
	View,
	Text
} from 'react-native';
import MainLine from './MainLine.js';
import styles from '../styles';
import * as data from '../helpers/data.js';

export default class Main extends Component {
	static propTypes = {
		data: PropTypes.array,
		navigator: PropTypes.object
	}

	handleAddClick = () => {
		this.props.navigator.push({ name: 'Add' });
	}

	handleChartsClick = () => {
		this.props.navigator.push({ name: 'Charts' });
	}

	render() {
		return (
			<View style={ styles.container }>
				<View style={ styles.mainInfo }>
					<MainLine
						label="This week amount:"
						number={ data.getThisWeekAmount(this.props.data) }
						/>
					<MainLine
						label="This week food:"
						number={ data.getThisWeekFoodAmount(this.props.data) }
						/>
					<MainLine
						label="Previous week amount:"
						number={ data.getPreviousWeekAmount(this.props.data) }
						/>
					<MainLine
						label="Previous week food:"
						number={ data.getPreviousWeekFoodAmount(this.props.data) }
						/>
					<MainLine
						label="This month amount:"
						number={ data.getThisMonthAmount(this.props.data) }
						/>
					<MainLine
						label="This month food:"
						number={ data.getThisMonthFoodAmount(this.props.data) }
						/>
				</View>

				<View style={ styles.buttonWrap }>
					<Text style={ styles.button } onPress={ this.handleAddClick }>
						{ 'Add' }
					</Text>
				</View>

				{/* <View style={ styles.buttonWrap }>
					<Text style={ styles.button } onPress={ this.handleChartsClick }>
						{ '\nCharts' }
					</Text>
				</View> */}
			</View>
		);
	}
}
