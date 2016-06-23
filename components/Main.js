import React, { Component } from 'react';
import {
	View,
	Text
} from 'react-native';
import styles from '../styles/styles.js';
import {
	getThisWeekAmount,
	getThisWeekFoodAmount
 } from '../helpers/data.js';

export default class Main extends Component {
	handleAddClick = () => {
		this.props.navigator.push({ name: 'Add' });
	}

    render() {
	    return (
		    <View style={styles.container}>
				<View style={styles.mainInfo}>
					<Text style={styles.mainLine}>
						This week amount: { getThisWeekAmount(this.props.data) }
					</Text>
					<Text style={styles.mainLine}>
						This week food: { getThisWeekFoodAmount(this.props.data) }
					</Text>
					<Text style={styles.mainLine}>
						Previous week amount:
					</Text>
					<Text style={styles.mainLine}>
						Previous week food:
					</Text>
				</View>
				<View>
					<Text style={styles.button} onPress={this.handleAddClick}>
						Add
					</Text>
				</View>
			</View>
	    );
	}
}
