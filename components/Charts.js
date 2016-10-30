import React, { Component, PropTypes } from 'react';
import {
	View
} from 'react-native';
import Chart from 'react-native-chart';
import styles from '../styles';


const data = [
	[ 0, 1 ],
	[ 1, 3 ],
	[ 3, 7 ],
	[ 4, 9 ],
];

export default class Charts extends Component {
	static propTypes = {
		data: PropTypes.array,
		navigator: PropTypes.object
	}

	render() {
		return (
			<View style={ styles.container }>
				<Chart
					style={ styles.chart }
					data={ data }
					verticalGridStep={ 5 }
					type="line"
				 />
			</View>
		);
	}
}
