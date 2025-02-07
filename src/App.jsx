import { Routes, Route } from 'react-router-dom'
import { Home, About, CarList, Contacts, Reviews, CarDetails } from './pages/'
import { Footer, Navbar } from './components'

const App = () => {
	return (
		<div className='bg-light min-h-screen'>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/catalog' element={<CarList />} />
				<Route path='/car/:id' element={<CarDetails />} />
				<Route path='/about' element={<About />} />
				<Route path='/contacts' element={<Contacts />} />
				<Route path='/reviews' element={<Reviews />} />
			</Routes>
			<Footer />
		</div>
	)
}

export default App
