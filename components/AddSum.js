import React, { Component, PropTypes } from 'react';
import {
	TextInput,
	View,
	Text
} from 'react-native';
import DismissKeyboard from 'dismissKeyboard';
import Popup from 'react-native-popup';
import Spinner from 'react-native-loading-spinner-overlay';

import request from 'superagent';
import styles from '../styles';
import config from '../configs';
import { formatNumber, getTodayFormatedDate } from '../helpers';
import CategorySelect from './CategorySelect';
import DateSelect from './DateSelect';

export default class AddSum extends Component {
	static propTypes = {
		data: PropTypes.array,
		navigator: PropTypes.object
	}

	state = {
		amount: null,
		date: getTodayFormatedDate(),
		category: 'food',
		loading: false
	}

	handleAmountChange = (input) => {
		const reg = /^-?\d+\.?\d*$/;
		const num = Number(input.replace(/\s/g, ''));

		if (reg.test(num)) {
			this.setState({ amount: num });
		}
	}

	onDateChange = ({ date }) => {
		this.setState({ date });
	}

	handleSaveClick = () => {
		DismissKeyboard();
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
			<View style={{ ...styles.container, ...styles.addsum }}>
				<View style={ styles.inputWrap }>
					<TextInput
						keyboardType="numeric"
						style={ styles.input }
						value={ this.state.amount ? formatNumber(this.state.amount) : '' }
						onChangeText={ this.handleAmountChange }
						placeholder={ 'Amount' }
						/>
				</View>
				<DateSelect
					date={ this.state.date }
					handleDateChange={ this.onDateChange }
					/>
				<CategorySelect
					category = { this.state.category }
					onPickerValueChange = { this.handlePickerValueChange }
					/>
				<View style={ styles.buttonWrap }>
					<Text style={ styles.button } onPress={ this.handleSaveClick }>
						{ 'Save' }
					</Text>
				</View>

				<Popup
					ref={ popup => {
						this.popup = popup;
					} }
					/>
				<Spinner visible={ this.state.loading } />
			</View>
		);
	}
}
