import React from 'react';
import { Picker, View } from 'react-native';
import styles from '../styles';

const itemsList = [
	'clothes', 'health', 'entertainment', 'food', 'motorbike', 'learning',
	'utilities', 'beauty', 'gas', 'water', 'taxi', 'travel', 'other'
];

const CategorySelect = props => {
	return (
		<View style={ styles.pickerWrap }>
			<Picker
				selectedValue={ props.category }
				onValueChange={ props.onPickerValueChange }
				style={ styles.picker }
				>
				{ itemsList.map(item =>
					<Picker.Item key= { item } label={ item } value={ item } />
				) }
			</Picker>
		</View>
	);
};

export default CategorySelect;
