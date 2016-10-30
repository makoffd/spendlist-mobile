import React, { Component, PropTypes } from 'react';
import {
	View,
	Text
} from 'react-native';
import styles from '../styles';
import { formatNumber } from '../helpers';

export default class MainLine extends Component {
	static propTypes = {
		label: PropTypes.string,
		number: PropTypes.number
	}

	render() {
		return (
			<View style={ styles.mainLine }>
				<Text style={ styles.mainLineLabel }>
					{ this.props.label }
				</Text>
				<Text style={ styles.mainLineNumber }>
					{ formatNumber(this.props.number) }
				</Text>
			</View>
		);
	}
}
