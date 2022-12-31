// services/api-service.js

const axios = require('axios')
const authService = require('./auth-service')

async function getPrivateData() {
	const result = await axios.get('http://localhost:5000/private', {
		headers: {
			'Authorization': `Bearer ${authService.getAccessToken()}`,
		},
	})

	console.log(result.data)

	return result.data
}

module.exports = {
	getPrivateData,
}