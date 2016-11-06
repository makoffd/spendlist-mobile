import { Platform } from 'react-native';

export default {
	loading: {
		fontSize: 40,
		textAlign: 'center',
		margin: 10
	},
	container: {
		flex: 1,
		paddingTop: 60,
		backgroundColor: '#FFF'
	},
	backdrop: {
		flex: 1,
		flexDirection: 'column'
	},
	currency: {
		fontSize: 40,
		textAlign: 'center',
		margin: 10
	},
	plus: {
		fontSize: 80,
		textAlign: 'center',
		margin: 10
	},
	sum: {
		fontSize: 80,
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	},
	categoryCaption: {
		marginLeft: 40,
		marginTop: 10,
		paddingTop: 5,
		paddingBottom: 5,
		fontSize: 20,
		color: '#CCC'
	},
	input: {
		fontSize: 30,
		borderWidth: 0,
		height: 60,
		paddingTop: 10,
		paddingBottom: 5,
		borderBottomWidth: 0
	},
	inputWrap: {
		borderBottomWidth: (Platform.OS === 'ios') ? 1 : 0,
		borderBottomColor: '#CCC',
		marginTop: 10,
		marginLeft: 40,
		marginRight: 40
	},
	pickerWrap: {
		marginTop: 10,
		marginLeft: 40,
		marginRight: 40
	},
	picker: {
	},
	mainInfo: {
		paddingTop: 20
	},
	mainLine: {
		paddingTop: 8,
		paddingBottom: 8,
		marginLeft: 20,
		marginRight: 20,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomColor: '#CCC',
		borderBottomWidth: 1
	},
	mainLineLabel: {
		fontSize: 15,
		flex: 1
	},
	mainLineNumber: {
		fontSize: 20
	},
	navigaror: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	navbar: {
		flex: 1,
		backgroundColor: '#F3FFF0',
		/* eslint-disable */
		height: (Platform.OS === 'ios') ? 60 : 40
		/* eslint-enable */
	},
	navBarTitleWrap: {
		flex: 1
	},
	navBarTitle: {
		width: 200,
		textAlign: 'center',
		fontSize: 20,
		/* eslint-disable */
		marginTop: (Platform.OS === 'ios') ? 5 : 21
		/* eslint-enable */
	},
	leftNavButtonText: {
		fontSize: 20,
		marginLeft: 20,
		marginTop: 5
	},
	rightNavButtonText: {
		fontSize: 20,
		marginRight: 20,
		marginTop: 5
	},
	buttonWrap: {
		flexDirection: 'column',
		margin: 10,
		marginTop: 40,
		backgroundColor: '#A3FF8C',
		height: 50,
		justifyContent: 'center'
	},
	button: {
		fontSize: 20,
		textAlign: 'center',
		lineHeight: 20
	},
	listRow: {
		flexDirection: 'row',
		paddingBottom: 5,
		margin: 5,
		marginLeft: 20,
		marginRight: 20,
		borderBottomColor: '#CCC',
		borderBottomWidth: 1
	},
	listCategory: {
		flex: 1,
		fontSize: 15
	},
	listDate: {
		fontSize: 15,
		width: 50
	},
	listAmount: {
		fontSize: 17
	},
	chart: {
		width: 300,
		height: 300
	},
	addsum: {
		paddingTop: 100
	}
};
