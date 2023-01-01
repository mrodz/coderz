import './App.css'
import { useEffect } from 'react'

function App() {
	useEffect(() => {
		(window.electron.getProfile() as Promise<unknown>).then(profile => {
			console.log(JSON.stringify(profile))
		}).catch(e => {
			console.error(e)
		})

		const client = new WebSocket('ws://localhost:5000')

		client.onopen = () => {
			client.send('hi')
		}

		client.onmessage = (message) => {
			alert(JSON.stringify(message))
		}

	}, [])

	return (
		<>
			<span>Hi</span>
			<button onClick={() => {
				window.electron.logOut()
			}}>Logout</button>
			<button onClick={async () => {
				let x = JSON.stringify(await window.electron.getPrivateData())
				console.log(x)
			}}>Secret</button>
		</>
	)
}

export default App