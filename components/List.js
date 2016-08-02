import React, { Component, PropTypes } from 'react';
import {
	View,
	ListView
} from 'react-native';
import ListRow from './ListRow.js';
import Popup from 'react-native-popup';

import request from 'superagent';
import styles from '../styles/styles.js';
import config from '../configs/config.js';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class List extends Component {
	static propTypes = {
		data: PropTypes.array
	}

	state = {
		dataSource: ds.cloneWithRows(this.props.data)
	}

	handleDeleteClick = (id) => {
		const data = this.props.data;

		this.popup.confirm({
			title: 'Are you sure?',
			ok: {
				text: 'Yes',
				callback: () => {
					request
						.delete(config.api + '/' + id)
						.end((err, res) => {
							if (err || !res.ok) {
								this.popup.alert('Delete Error..');
							} else {
								this.popup.alert('Item has been removed');
								for (let i = data.length - 1; i >= 0; i--) {
									if (data[i]._id === id) {
										data.splice(i, 1);
										this.setState({
											dataSource: ds.cloneWithRows(data)
										});
									}
								}
							}
						});
				}
			},
			cancel: {
				text: 'No'
			}
		});
	}

	render() {
		return (
			<View shouldRasterizeIOS={ true } style={ styles.container }>
				<ListView
					dataSource={ this.state.dataSource }
					renderRow={
						rowData => <ListRow onDelete={ this.handleDeleteClick } { ...rowData }/>
					}
					/>
				<Popup ref={ (popup) => {
					this.popup = popup;
				} }/>
			</View>
		);
	}
}
