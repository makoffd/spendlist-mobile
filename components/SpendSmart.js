import React, { Component } from 'react';
import {
	Text,
	View,
	Navigator,
	TouchableHighlight
} from 'react-native';
import styles from '../styles/styles.js';
import config from '../configs/config.js';
import Main from './Main.js';
import AddSum from './AddSum.js';
import List from './List.js';
import request from 'superagent';

export default class SpendSmart extends Component {
	state = {
		data: null,
		connectionError: false
	}

	fetchData = () =>  {
		this.setState({ connectionError: false });
		request
			.get(config.api)
			.end((err, res) => {
				if (err || !res.ok) {
					console.log(err);
					this.setState({ connectionError: true });
				} else {
					this.setState({ data: res.body });
				}
			});
	}

	componentDidMount() {
		this.fetchData()
	}

	renderScene = (route, navigator) => {
		if (route.name == 'Main') {
			return <Main navigator={ navigator } { ...route.passProps } data={ this.state.data } />
		}
		if (route.name == 'Add') {
			return <AddSum navigator={ navigator } { ...route.passProps } data={ this.state.data }  />
		}
		if (route.name == 'List') {
			return <List navigator={ navigator } { ...route.passProps } data={ this.state.data }  />
		}
	}

	render() {
		if (this.state.connectionError) return (
			<View style={styles.container}>
				<Text style={styles.loading}>Connection Error..</Text>
				<Text style={styles.loading} onPress={this.fetchData}>Try again</Text>
			</View>
		)

		if (this.state.data === null) return (
			<View style={styles.container}>
				<Text style={styles.loading}>Loading.. Please wait</Text>
			</View>
		)

		var NavigationBarRouteMapper = {
			LeftButton(route, navigator, index, navState) {
		    	if (index > 0) {
			      return (
			        <TouchableHighlight
			        	underlayColor="transparent"
			        	onPress={() => { if (index > 0) { navigator.pop() } }}
						>
			        	<Text style={ styles.leftNavButtonText }>{'<'} Back</Text>
			        </TouchableHighlight>)
		    	} else if (route.name == 'Main') {
					return (
					<TouchableHighlight
			        	underlayColor="transparent"
			        	onPress={() => { navigator.push({name: 'List'}) }}
						>
			        	<Text style={ styles.leftNavButtonText }>List</Text>
			        </TouchableHighlight>)
				} else { return null }
			},
			RightButton(route, navigator, index, navState) {
			    if (route.onPress) return (
			      <TouchableHighlight
					  underlayColor="transparent"
			         onPress={ () => route.onPress(navigator) }>
			         <Text style={ styles.rightNavButtonText }>
			              { route.rightText || 'Right Button' }
			         </Text>
			       </TouchableHighlight>)
			},
			Title(route, navigator, index, navState) {
		    	return <Text style={ styles.navBarTitle	 }>SpendSmart</Text>
		  	}
		};

	    return (
			<Navigator
		    	style={{ flex:1 }}
		        initialRoute={{
					name: 'Main',
					rightText: 'Add +',
					onPress: nav => {nav.push({ name: 'Add' })}
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
