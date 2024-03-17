import axios from 'axios';

export const apiClient = axios.create({
	baseURL: 'https://reqres.in/api/',
	timeout: 1000,
	headers: {
		'Content-type': 'application/json',
	},
});
