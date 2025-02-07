import { useEffect, useState } from 'react'
import axios from 'axios'
import { CarListItem, Loader } from '../components'

const CarList = () => {
	const [cars, setCars] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [carType, setCarType] = useState('korean') // "korean" или "foreign"
	const [page, setPage] = useState(1) // Пагинация
	const limit = 20 // Количество авто на странице

	// API-ссылки с параметрами пагинации
	const API_URLS = {
		korean: `https://api.encar.com/search/car/list/general?count=true&q=(And.Hidden.N._.CarType.Y.)&sr=%7CModifiedDate%7C0%7C20&page=${page}&limit=${limit}`,
		foreign: `https://api.encar.com/search/car/list/premium?count=true&q=(And.Hidden.N._.CarType.N.)&sr=%7CModifiedDate%7C0%7C20&page=${page}&limit=${limit}`,
	}

	// Функция загрузки автомобилей
	useEffect(() => {
		const fetchCars = async () => {
			setLoading(true)
			setError(null)
			try {
				const response = await axios.get(API_URLS[carType])
				setCars(response.data.SearchResults)
			} catch (err) {
				setError('Ошибка при загрузке автомобилей')
			} finally {
				setLoading(false)
			}
		}

		fetchCars()
	}, [carType, page])

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}, [carType, page])

	return (
		<section className='py-12 bg-gray-100'>
			<div className='container mx-auto px-6'>
				<h2 className='text-4xl font-bold text-primary text-center mb-8'>
					Список автомобилей
				</h2>

				{/* Фильтр по типу авто */}
				<div className='flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 mt-6 mb-6 md:mb-10'>
					<button
						className={`cursor-pointer w-full md:w-auto px-8 py-4 rounded-full font-semibold shadow-lg transition-all text-lg flex items-center justify-center
      ${
				carType === 'korean'
					? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-orange-500/50'
					: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
			}`}
						onClick={() => setCarType('korean')}
					>
						🇰🇷 Корейские авто
					</button>

					<button
						className={`cursor-pointer w-full md:w-auto px-8 py-4 rounded-full font-semibold shadow-lg transition-all text-lg flex items-center justify-center
      ${
				carType === 'foreign'
					? 'bg-gradient-to-r from-gray-500 to-gray-800 text-white shadow-gray-500/50'
					: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
			}`}
						onClick={() => setCarType('foreign')}
					>
						🌍 Иномарки
					</button>
				</div>

				{/* Загрузка */}
				{loading && <Loader />}

				{/* Ошибка */}
				{error && <p className='text-center text-red-500'>{error}</p>}

				{/* Список автомобилей */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					{cars?.map((car, index) => (
						<CarListItem key={index} car={car} index={index} />
					))}
				</div>

				{/* Пагинация */}
				<div className='flex justify-center mt-10 space-x-2'>
					{/* Кнопка "Назад" */}
					<button
						className={`px-4 py-2 rounded-full font-semibold shadow-md transition-all ${
							page === 1
								? 'bg-gray-300 text-gray-500 cursor-not-allowed'
								: 'bg-primary text-white hover:bg-red-600'
						}`}
						onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
						disabled={page === 1}
					>
						◀ Назад
					</button>

					{/* Нумерация страниц */}
					{[1, 2, 3, 4, 5].map((num) => (
						<button
							key={num}
							className={`px-4 py-2 rounded-full font-semibold shadow-md transition-all ${
								page === num
									? 'bg-gradient-to-r from-orange-500 to-red-500 text-white scale-110 shadow-2xl'
									: 'bg-gray-300 text-gray-800 hover:bg-gray-400'
							} active:scale-95`}
							onClick={() => setPage(num)}
						>
							{num}
						</button>
					))}

					{/* Кнопка "Вперёд" */}
					<button
						className='px-4 py-2 bg-primary text-white rounded-full font-semibold shadow-md transition-all hover:bg-red-600'
						onClick={() => setPage((prev) => (prev < 5 ? prev + 1 : prev))}
					>
						Вперёд ▶
					</button>
				</div>
			</div>
		</section>
	)
}

export default CarList
