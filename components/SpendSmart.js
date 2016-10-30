import React, { Component } from 'react';
import {
	Text,
	View,
	Navigator,
	TouchableHighlight,
	AppState
} from 'react-native';
import styles from '../styles';
import config from '../configs';
import { getSortedByDate } from '../helpers/data.js';
import Main from './Main.js';
import AddSum from './AddSum.js';
import List from './List.js';
import Charts from './Charts.js';
import request from 'superagent';

export default class SpendSmart extends Component {
	state = {
		data: null,
		connectionError: false
	}

	componentDidMount() {
		AppState.addEventListener('change', this._handleAppStateChange);
		this.fetchData();
	}

	componentWillUnmount() {
		AppState.removeEventListener('change', this._handleAppStateChange);
	}

	fetchData = () => {
		this.setState({ connectionError: false });
		request
			.get(config.api)
			.end((err, res) => {
				if (err || !res.ok) {
					this.setState({ connectionError: true });
				} else {
					this.setState({ data: getSortedByDate(res.body) });
				}
			});
	}

	_handleAppStateChange = (currentAppState) => {
		if (currentAppState === 'active') {
			this.fetchData();
		}
	}

	renderScene = (route, navigator) => {
		if (route.name === 'Main') {
			return (
				<Main navigator={ navigator } { ...route.passProps } data={ this.state.data } />
			);
		}
		if (route.name === 'Add') {
			return (
				<AddSum navigator={ navigator } { ...route.passProps } data={ this.state.data } />
			);
		}
		if (route.name === 'List') {
			return (
				<List navigator={ navigator } { ...route.passProps } data={ this.state.data } />
			);
		}
		if (route.name === 'Charts') {
			return (
				<Charts navigator={ navigator } { ...route.passProps } data={ this.state.data } />
			);
		}
	}

	handleTryAgain = () => {
		this.fetchData();
	}

	render() {
		if (this.state.connectionError) {
			return (
				<View style={ styles.container }>
					<Text style={ styles.loading }>{ 'Connection Error..' }</Text>
					<Text style={ styles.loading } onPress={ this.handleTryAgain }>
						{ 'Try again' }
					</Text>
				</View>
			);
		}

		if (this.state.data === null) {
			return (
				<View style={ styles.container }>
					<Text style={ styles.loading }>{ 'Loading.. Please wait' }</Text>
				</View>
			);
		}

		const NavigationBarRouteMapper = {
			LeftButton(route, navigator, index, navState) {
				if (index > 0) {
					return (
						<View>
							<TouchableHighlight
								underlayColor="transparent"
								onPress={ () => {
									navigator.pop();
								} }
								>
								<Text style={ styles.leftNavButtonText }>{ 'Back' }</Text>
							</TouchableHighlight>
						</View>
					);
				} else if (route.name === 'Main') {
					return (
						<TouchableHighlight
							underlayColor="transparent"
							onPress={ () => {
								navigator.push({ name: 'List' });
							} }
							>
							<Text style={ styles.leftNavButtonText }>{ 'List' }</Text>
						</TouchableHighlight>
					);
				}

				return null;
			},
			RightButton(route, navigator, index, navState) {
				if (route.onPress) {
					return (
						<TouchableHighlight
							underlayColor="transparent"
							onPress={ () => route.onPress(navigator) }
							>
							<Text style={ styles.rightNavButtonText }>
								{ route.rightText || 'Right Button' }
							</Text>
						</TouchableHighlight>
					);
				}
			},
			Title(route, navigator, index, navState) {
				return (
					<Text style={ styles.navBarTitle }>{ 'SpendSmart' }</Text>
				);
			}
		};

		return (
			<Navigator
				style={ styles.navigator }
				initialRoute={{
					name: 'Main',
					rightText: 'Add',
					onPress: (navigator) => {
						navigator.push({ name: 'Add' });
					}
				}}
				renderScene={ this.renderScene }
				navigationBar={
					<Navigator.NavigationBar
						style={ styles.navbar }
						routeMapper={ NavigationBarRouteMapper }
						/>
				}
				/>
		);
	}
}
