import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  View,
  Text,
  Picker
} from 'react-native';
import styles from '../styles/styles.js';
import config from '../configs/config.js';
import request from 'superagent';

let today = new Date();

export default class AddSum extends Component {
	state = {
		amount: null,
		date: [
			('0'+today.getDate()).slice(-2),
			('0'+(today.getMonth()+1)).slice(-2),
			today.getFullYear()
		].join('.'),
		category: 'food'
	}

    handleAmountChange = (text) => {
		var reg = /^-?\d+\.?\d*$/;
		if(reg.test(text)) {
			this.setState({amount: text})
		} else {
			this.setState({amount: null})
		};
    }

	handleDateChange = (text) => {
		var reg = /^-?\d*\.?\d*\.?\d*$/;
		if(!reg.test(text)) return false;
        this.setState({date: text})
    }

	handleSaveClick = () => {
		if (!this.state.amount) {
			alert('Please fill the amount');
			return;
		}
		var expense = {
			...this.state,
			currency: 'vnd',
			comment: ''
		}
		request
			.post(config.api)
			.send(expense)
			.end((err, res) => {
				if (err || !res.ok) {
					alert('Saving Error..');
				} else {
					alert('Saved');
					this.props.data.push(expense);
					this.props.navigator.pop()
				}
			});
	}

    render() {
	    return (
	    	<View style={styles.container}>
				<Text style={styles.mainLine}>Enter the amount:</Text>
	        	<TextInput
					style={styles.input}
					keyboardType = 'numeric'
					onChangeText={this.handleAmountChange}
					/>
				<Text style={styles.mainLine}>Date:</Text>
				<TextInput
					value={this.state.date}
					style={styles.input}
					keyboardType = 'numeric'
					onChangeText={this.handleDateChange}
					/>
	        	<Text style={styles.mainLine}>Category:</Text>
					<Picker
						selectedValue={this.state.category}
						onValueChange={(category) => this.setState({category})}
						style={styles.picker}
						>
						<Picker.Item label="clothes" value="clothes" />
						<Picker.Item label="health" value="health" />
						<Picker.Item label="entertainment" value="entertainment" />
						<Picker.Item label="food" value="food" />
						<Picker.Item label="motorbike" value="motorbike" />
						<Picker.Item label="learning" value="learning" />
						<Picker.Item label="gas" value="gas" />
						<Picker.Item label="taxi" value="taxi" />
						<Picker.Item label="water" value="water" />
						<Picker.Item label="other" value="other" />
					</Picker>
				<View>
					<Text
						style={styles.button}
						onPress={this.handleSaveClick}
						>
						Save
					</Text>
				</View>
	    	</View>
	    );
	}
}
