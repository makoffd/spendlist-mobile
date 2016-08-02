import React, { Component, PropTypes } from 'react';
import {
	TextInput,
	View,
	Text,
	Picker
} from 'react-native';
import Popup from 'react-native-popup';
import Spinner from 'react-native-loading-spinner-overlay';

import request from 'superagent';
import styles from '../styles/styles.js';
import config from '../configs/config.js';
import { formatNumber } from '../helpers/helpers.js';

export default class AddSum extends Component {
	static propTypes = {
		data: PropTypes.array,
		navigator: PropTypes.object
	}

	state = {
		amount: null,
		date: this.getTodayFormatedDate(),
		category: 'food',
		loading: false
	}

	componentDidMount = () => {
		this.setState({ date: this.getTodayFormatedDate() });
	}

	getTodayFormatedDate() {
		const today = new Date();
		const charNum = 2;

		return [
			('0' + today.getDate()).slice(-charNum),
			('0' + (today.getMonth() + 1)).slice(-charNum),
			today.getFullYear()
		].join('.');
	}


	handleAmountChange = (input) => {
		const reg = /^-?\d+\.?\d*$/;
		const num = Number(input.replace(/\s/g, ''));

		if (reg.test(num)) {
			this.setState({ amount: num });
		}
	}

	handleDateChange = (input) => {
		const reg = /^-?\d*\.?\d*\.?\d*$/;

		if (reg.test(input)) {
			this.setState({ date: input });
		}

		return false;
	}

	handleSaveClick = () => {
		if (this.state.amount) {
			const expense = {
				...this.state,
				currency: 'vnd',
				comment: ''
			};

			this.setState({ loading: true });

			request
				.post(config.api)
				.send(expense)
				.end((err, res) => {
					if (err || !res.ok) {
						this.popup.alert('Saving Error..');
					} else {
						this.setState({ loading: false });
						this.popup.tip({
							title: 'Saved',
							btn: {
								text: 'OK',
								callback: () => {
									this.props.data.unshift(expense);
									this.props.navigator.pop();
								}
							}
						});
					}
				});
		} else {
			this.popup.tip({ title: 'Please fill the amount' });
		}
	}

	handlePickerValueChange = (category) => this.setState({ category })

	render() {
		return (
			<View style={ styles.container }>
				<View style={ styles.inputWrap }>
					<TextInput
						style={ styles.input }
						value={ this.state.amount ? formatNumber(this.state.amount) : '' }
						onChangeText={ this.handleAmountChange }
						placeholder={ 'Amount' }
						/>
				</View>
				<View style={ styles.inputWrap }>
					<TextInput
						value={ this.state.date }
						style={ styles.input }
						onChangeText={ this.handleDateChange }
						placeholder={ 'Date' }
						/>
				</View>
				<View style={ styles.pickerWrap }>
					<Picker
						selectedValue={ this.state.category }
						onValueChange={ this.handlePickerValueChange }
						style={ styles.picker }
						>
						<Picker.Item label="clothes" value="clothes" />
						<Picker.Item label="health" value="health" />
						<Picker.Item label="entertainment" value="entertainment" />
						<Picker.Item label="food" value="food" />
						<Picker.Item label="motorbike" value="motorbike" />
						<Picker.Item label="learning" value="learning" />
						<Picker.Item label="utilities" value="utilities" />
						<Picker.Item label="beauty" value="beauty" />
						<Picker.Item label="gas" value="gas" />
						<Picker.Item label="water" value="water" />
						<Picker.Item label="taxi" value="taxi" />
						<Picker.Item label="travel" value="travel" />
						<Picker.Item label="other" value="other" />
					</Picker>
				</View>
				<View style={ styles.buttonWrap }>
					<Text style={ styles.button } onPress={ this.handleSaveClick }>
						{ '\nSave' }
					</Text>
				</View>
				<Popup ref={ (popup) => {
					this.popup = popup;
				} }/>
				<Spinner visible={ this.state.loading } />
			</View>
		);
	}
}
