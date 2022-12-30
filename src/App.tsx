import logo from './logo.svg';
import './App.css';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />

				<p>Edit <code>src/App.js</code> and save to reload.</p>

				<button onClick={() => {
					// alert(window.electron.)
					window.electron.nativeCall('println', 'hello world!')

					document.dispatchEvent(new Event('abcdef'))
				}}>Click me please!</button>
			</header>
		</div>
	)
}

export default App;