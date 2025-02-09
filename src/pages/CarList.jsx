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
		window.scrollTo({ top: 0, behavior: 'smooth' })
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
				{cars
					.sort((a, b) => (a.MONTH > b.MONTH ? 1 : -1))
					.map((car, index) => (
						<CarListItem key={car.ID} car={car} index={index} />
					))}
			</div>

			{/* Пагинация */}
			<div className='flex justify-center mt-10 space-x-2 items-center'>
				{/* Кнопка "Назад" */}
				<button
					className={`px-4 py-2 rounded-lg font-semibold shadow-md transition ${
						page === 1
							? 'bg-gray-300 text-gray-500 cursor-not-allowed'
							: 'bg-primary text-black hover:bg-red-600'
					}`}
					onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
					disabled={page === 1}
				>
					◀ Назад
				</button>

				{/* Первая страница */}
				<button
					className={`px-4 py-2 rounded-lg font-semibold shadow-md transition ${
						page === 1
							? 'bg-primary text-black'
							: 'bg-gray-300 text-gray-800 hover:bg-gray-400'
					}`}
					onClick={() => setPage(1)}
				>
					1
				</button>

				{/* Если текущая страница больше 4, показываем "..." */}
				{page > 4 && <span className='px-2 text-gray-500'>...</span>}

				{/* Отображаем 3 страницы до и 3 после текущей */}
				{[...Array(5)].map((_, i) => {
					const pageNumber = page - 2 + i
					if (pageNumber > 1 && pageNumber < 100) {
						return (
							<button
								key={pageNumber}
								className={`cursor-pointer px-4 py-2 w-10 h-10 rounded-lg font-semibold shadow-md flex items-center justify-center transition ${
									page === pageNumber
										? 'bg-primary text-black'
										: 'bg-gray-300 text-gray-800 hover:bg-gray-400'
								}`}
								onClick={() => setPage(pageNumber)}
							>
								{pageNumber}
							</button>
						)
					}
					return null
				})}

				{/* Если текущая страница меньше 96, показываем "..." перед 100 */}
				{page < 96 && <span className='px-2 text-gray-500'>...</span>}

				{/* Последняя страница */}
				<button
					className={`cursor-pointer px-4 py-2 rounded-lg font-semibold shadow-md transition ${
						page === 100
							? 'bg-primary text-white'
							: 'bg-gray-300 text-gray-800 hover:bg-gray-400'
					}`}
					onClick={() => setPage(100)}
				>
					100
				</button>

				{/* Кнопка "Вперёд" */}
				<button
					className='cursor-pointer px-4 py-2 bg-primary text-white rounded-lg font-semibold shadow-md transition bg-red-500 hover:bg-red-600'
					onClick={() => setPage((prev) => prev + 1)}
				>
					Вперёд ▶
				</button>
			</div>
		</div>
	)
}

export default CarList
