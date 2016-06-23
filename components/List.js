import React, { Component } from 'react';
import {
	TextInput,
	View,
	ListView,
	Text
} from 'react-native';
import styles from '../styles/styles.js';
import {
	getSortedByDate
 } from '../helpers/data.js';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class List extends Component {
	state = {
		dataSource: ds.cloneWithRows(getSortedByDate(this.props.data))
	}

    render() {
	    return (
		    <View style={styles.container}>
				<Text>Expenses list</Text>
					<ListView
				    	dataSource={this.state.dataSource}
				    	renderRow={
							(rowData) =>
							<Text>{
								`${rowData.date} ${rowData.category} ${rowData.amount}`
							}</Text>
						}
				    />
			</View>
	    );
	}
}
