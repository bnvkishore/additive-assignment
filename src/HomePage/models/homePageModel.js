import axios from 'axios';
import { config } from '../../utils/config';
export default {
	state: {
		employeesList: [],
		subordinatesList: []
	},
	selectors: {
		getEmployeesList() {
			return state => state.homePage.employeesList
		},
		getSubordinatesList() {
			return state => state.homePage.subordinatesList;
		}
	},
	reducers: {
		setEmployeesList(prevState, newState) {
			return {
				...prevState,
				employeesList: newState
			}
		},
		setSubordinatesList(prevState, newState) {
			return {
				...prevState,
				subordinatesList: newState
			}
		}
	},
	effects: dispatch => ({
		async fetchEmployees() {
			try {
				const response = await axios.get(`${config.endpoint}/employees`);
				console.log('data', response.data);
				dispatch.homePage.setEmployeesList(response.data);
			}catch (e) {
				throw(e);
			}
		},
		async fetchSubordinate(name) {
			try {
				const response = await axios.get(`${config.endpoint}/employees/${name}`);
				dispatch.homePage.setSubordinatesList(response.data);
			}catch (e) {
				throw(e);
			}
		}
	})
}