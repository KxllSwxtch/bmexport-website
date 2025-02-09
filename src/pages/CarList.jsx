import { useCallback, useEffect, useState } from 'react'
import Loader from '../components/Loader'
import { CarListItem } from '../components'
import { brands, models } from '../utils'
import { h1 } from 'framer-motion/client'

const CarList = () => {
	const [cars, setCars] = useState([])
	const [loading, setLoading] = useState(true)
	const [page, setPage] = useState(1)

	// Состояние для фильтров
	const [filters, setFilters] = useState({
		marka_id: 0,
		model_id: 0,
		year_from: 0,
		year_to: 0,
		mileage_from: 0,
		mileage_to: 0,
		engine_from: 0,
		engine_to: 0,
	})

	// Временные фильтры (изменяются в инпутах, но не применяются сразу)
	const [tempFilters, setTempFilters] = useState(filters)

	// 🚀 Фетч данных (useCallback to prevent re-renders)
	const fetchCars = useCallback(async () => {
		setLoading(true)
		try {
			// Формируем параметры запроса
			const params = new URLSearchParams({ method: 'get_cars', page })

			Object.entries(filters).forEach(([key, value]) => {
				if (value) params.append(key, value)
			})

			const response = await fetch(
				`https://cors-anywhere.herokuapp.com/https://api.darvin.digital/api.php?${params.toString()}`,
			)

			const data = await response.json()
			setCars(data)
		} catch (error) {
			console.error('Ошибка загрузки данных', error)
		} finally {
			setLoading(false)
		}
	}, [page, filters])

	useEffect(() => {
		fetchCars()
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}, [page, fetchCars])

	// Обработчик изменения временных фильтров
	const handleTempFilterChange = (e) => {
		const { name, value } = e.target
		setTempFilters((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	// Применить фильтры
	const applyFilters = () => {
		setFilters(tempFilters) // Копируем временные фильтры в основные
	}

	// Сброс фильтров
	const resetFilters = () => {
		setTempFilters({
			marka_id: '',
			model_id: '',
			year_from: '',
			year_to: '',
			mileage_from: '',
			mileage_to: '',
			engine_from: '',
			engine_to: '',
		})
		setFilters({
			marka_id: '',
			model_id: '',
			year_from: '',
			year_to: '',
			mileage_from: '',
			mileage_to: '',
			engine_from: '',
			engine_to: '',
		})
	}

	// Генерация списка годов
	const currentYear = new Date().getFullYear()
	const years = Array.from(
		{ length: currentYear - 2001 },
		(_, i) => 2002 + i,
	).reverse()

	if (loading) return <Loader />

	return (
		<div className='container mx-auto px-6 py-12'>
			{/* Заголовок */}
			<h1 className='text-3xl font-bold text-center mb-6'>
				Список автомобилей
			</h1>

			{/* Фильтры */}
			<div className='bg-gray-100 p-6 rounded-lg shadow-md mb-8'>
				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
					{/* Марка */}
					<div>
						<label className='block text-gray-700'>Марка</label>
						<select
							name='marka_id'
							value={tempFilters.marka_id}
							onChange={handleTempFilterChange}
							className='w-full p-2 border rounded-md'
						>
							<option value=''>Любая</option>
							{brands.map((brand) => (
								<option key={brand.marka_id} value={brand.marka_id}>
									{brand.name}
								</option>
							))}
						</select>
					</div>

					{/* Модель */}
					<div>
						<label className='block text-gray-700'>Модель</label>
						<select
							name='model_id'
							value={tempFilters.model_id}
							onChange={handleTempFilterChange}
							className='w-full p-2 border rounded-md'
							disabled={!tempFilters.marka_id}
						>
							<option value=''>Любая</option>
							{models
								.filter((m) => m.marka_id === parseInt(tempFilters.marka_id))
								.flatMap((m) => m.models)
								.map((model) => (
									<option key={model.model_id} value={model.model_id}>
										{model.model_id}
									</option>
								))}
						</select>
					</div>

					{/* Год производства */}
					<div>
						<label className='block text-gray-700'>Год от</label>
						<select
							name='year_from'
							value={tempFilters.year_from}
							onChange={handleTempFilterChange}
							className='w-full p-2 border rounded-md'
						>
							<option value=''>Любой</option>
							{years.map((year) => (
								<option key={year} value={year}>
									{year}
								</option>
							))}
						</select>
					</div>

					<div>
						<label className='block text-gray-700'>Год до</label>
						<select
							name='year_to'
							value={tempFilters.year_to}
							onChange={handleTempFilterChange}
							className='w-full p-2 border rounded-md'
						>
							<option value=''>Любой</option>
							{years.map((year) => (
								<option key={year} value={year}>
									{year}
								</option>
							))}
						</select>
					</div>

					{/* Пробег */}
					<div>
						<label className='block text-gray-700'>Пробег от</label>
						<input
							type='number'
							name='mileage_from'
							value={tempFilters.mileage_from}
							onChange={handleTempFilterChange}
							className='w-full p-2 border rounded-md'
							min={0}
						/>
					</div>

					<div>
						<label className='block text-gray-700'>Пробег до</label>
						<input
							type='number'
							name='mileage_to'
							value={tempFilters.mileage_to}
							onChange={handleTempFilterChange}
							className='w-full p-2 border rounded-md'
							min={tempFilters.mileage_from || 0}
						/>
					</div>
				</div>

				{/* Кнопки */}
				<div className='flex justify-end mt-4 space-x-4'>
					<button
						onClick={applyFilters}
						className='px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition'
					>
						Применить
					</button>
					<button
						onClick={resetFilters}
						className='px-6 py-2 bg-gray-400 text-white rounded-md shadow-md hover:bg-gray-500 transition'
					>
						Сбросить
					</button>
				</div>
			</div>

			{/* Список автомобилей */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{cars
					.sort((a, b) => (a.MONTH > b.MONTH ? 1 : -1))
					.map((car, index) => (
						<CarListItem key={car.ID} car={car} index={index} />
					))}
			</div>

			{/* Пагинация */}
			{cars.length > 0 ? (
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
			) : (
				<h1>Авто не найдены</h1>
			)}
		</div>
	)
}

export default CarList
