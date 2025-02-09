import { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import { CarListItem } from '../components'

const CarList = () => {
	const [cars, setCars] = useState([])
	const [loading, setLoading] = useState(true)
	const [page, setPage] = useState(1)

	// 🚀 Фетч данных
	useEffect(() => {
		const fetchCars = async () => {
			setLoading(true)
			try {
				const response = await fetch(
					`https://corsproxy.io/?${encodeURIComponent(
						`https://api.darvin.digital/api.php?method=get_cars&page=${page}`,
					)}`,
				)

				const data = await response.json()
				setCars(data)
			} catch (error) {
				console.error('Ошибка загрузки данных', error)
			} finally {
				setLoading(false)
			}
		}

		fetchCars()
	}, [page])

	if (loading) return <Loader />

	return (
		<div className='container mx-auto px-6 py-12'>
			{/* Заголовок */}
			<h1 className='text-3xl font-bold text-center mb-6'>
				Список автомобилей
			</h1>

			{/* Список автомобилей */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{cars.map((car, index) => (
					<CarListItem key={car.ID} car={car} index={index} />
				))}
			</div>

			{/* Пагинация */}
			<div className='flex justify-center mt-8 space-x-4'>
				<button
					className={`px-4 py-2 rounded-md font-semibold shadow-md transition ${
						page === 1
							? 'bg-gray-300 text-gray-500 cursor-not-allowed'
							: 'bg-primary text-white hover:bg-red-600'
					}`}
					onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
					disabled={page === 1}
				>
					◀ Назад
				</button>

				{/* Отображаем страницы 1-5 */}
				{[...Array(5)].map((_, i) => (
					<button
						key={i}
						className={`px-4 py-2 rounded-md font-semibold shadow-md transition ${
							page === i + 1
								? 'bg-primary text-white'
								: 'bg-gray-300 text-gray-800 hover:bg-gray-400'
						}`}
						onClick={() => setPage(i + 1)}
					>
						{i + 1}
					</button>
				))}

				<button
					className='px-4 py-2 bg-primary text-white rounded-md font-semibold shadow-md transition hover:bg-red-600'
					onClick={() => setPage((prev) => prev + 1)}
				>
					Вперёд ▶
				</button>
			</div>
		</div>
	)
}

export default CarList
