import './App.css';
import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Landing from './components/Landing';

function App() {
	// const location = useLocation()

	return (
		<>
			<span>Hi</span>
			<button onClick={() => {
				window.electron.logOut()
			}}>Logout</button>
		</>
		// <Landing></Landing>
		// <Routes location={location} key={location.pathname}>
		// 	{/* <Route path='*' element={<NotFound />} /> */}
		// 	<Route path='/' element={<Landing />} />
		// 	{/* <Route path='/login' element={<Login />} />
		// 		<Route path='/register' element={<Register />} />
		// 		<Route path='/dashboard' element={user?.sessionId ? <Dashboard /> : <Navigate replace to="/login" />} />
		// 		<Route path='/d/:id' element={<UserDocument />} />
		// 		<Route path='/tos' element={<TOS />} /> */}
		// </Routes>
		// <div className="App">
		// 	<header className="App-header">
		// 		<img src={logo} className="App-logo" alt="logo" />

		// 		<p>Edit <code>src/App.js</code> and save to reload.</p>

		// 		<button onClick={() => {
		// 			// alert(window.electron.)
		// 			window.electron.nativeCall('println', 'hello world!')

		// 			document.dispatchEvent(new Event('abcdef'))
		// 		}}>Click me please!</button>
		// 	</header>
		// </div>
	)
}

export default App;