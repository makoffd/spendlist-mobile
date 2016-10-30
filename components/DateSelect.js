import React, { Component } from 'react';
import { TextInput, View, Platform, DatePickerAndroid } from 'react-native';
import styles from '../styles';
import { getFormatedDate } from '../helpers';
import DismissKeyboard from 'dismissKeyboard';

export default class DateSelect extends Component {

	static propTypes = {
		date: React.PropTypes.string,
		handleDateChange: React.PropTypes.func
	}

	handleDateChange = (input) => {
		const reg = /^-?\d*\.?\d*\.?\d*$/;

		if (reg.test(input)) {
			this.props.handleDateChange({ date: input });
		}

		return false;
	}

	handleDateFocus = async (event) => {
		if (Platform.OS !== 'android') {
			return null;
		}
		DismissKeyboard();
		try {
			const { action, year, month, day } = await DatePickerAndroid.open({
				date: new Date()
			});

			if (action !== DatePickerAndroid.dismissedAction) {
				this.props.handleDateChange({
					date: getFormatedDate(new Date(year, month, day))
				});
			}
		} catch ({ code, message }) {
			console.warn('Cannot open date picker', message);
		}
	}

	render() {
		return (
			<View style={ styles.inputWrap }>
				<TextInput
					onFocus={ this.handleDateFocus }
					value={ this.props.date }
					style={ styles.input }
					onChangeText={ this.handleDateChange }
					placeholder={ 'Date' }
					/>
			</View>
		);
	}
}
