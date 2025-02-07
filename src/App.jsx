import { Routes, Route } from 'react-router-dom'
import { Home, About, CarList, Contacts, Reviews, CarDetails } from './pages/'
import { Footer, Navbar, ScrollToTop } from './components'

const App = () => {
	return (
		<div className='flex flex-col min-h-screen'>
			<ScrollToTop />
			<Navbar />
			<main className='flex-1'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/catalog' element={<CarList />} />
					<Route path='/car/:id' element={<CarDetails />} />
					<Route path='/about' element={<About />} />
					<Route path='/contacts' element={<Contacts />} />
					<Route path='/reviews' element={<Reviews />} />
				</Routes>
			</main>
			<Footer />
		</div>
	)
}

export default App
