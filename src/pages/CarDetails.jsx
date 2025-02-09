import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// Функция форматирования месяца и года
const formatYearMonth = (yearMonth) => {
	if (!yearMonth || yearMonth.length !== 6) return 'Неизвестная дата' // Проверяем, что yearMonth корректный

	const months = [
		'Январь',
		'Февраль',
		'Март',
		'Апрель',
		'Май',
		'Июнь',
		'Июль',
		'Август',
		'Сентябрь',
		'Октябрь',
		'Ноябрь',
		'Декабрь',
	]
	const year = yearMonth.substring(0, 4)
	const month = parseInt(yearMonth.substring(4, 6)) - 1

	return months[month] ? `${months[month]} ${year}` : 'Неизвестная дата'
}

const CarDetails = () => {
	const { id: lot } = useParams() // Получаем LOT вместо ID
	const [car, setCar] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchCarDetails = async () => {
			try {
				const response = await fetch(
					`https://api.encar.com/v1/readside/vehicle/${lot}`,
				)
				const data = await response.json()
				console.log(data)
				setCar(data)
			} catch (error) {
				console.error('Ошибка загрузки данных', error)
			} finally {
				setLoading(false)
			}
		}

		fetchCarDetails()
	}, [lot])

	if (loading) return <Loader />
	if (!car)
		return <p className='text-center text-xl text-red-500'>Авто не найдено</p>

	// Извлекаем данные
	const {
		advertisement: { price },
		category: {
			yearMonth,
			manufacturerEnglishName,
			modelGroupEnglishName,
			gradeEnglishName,
			gradeDetailEnglishName,
		},
		spec: { mileage, displacement, fuelName },
		photos,
	} = car

	const formattedCarFuelType =
		fuelName === '가솔린'
			? 'Бензин'
			: fuelName === '디젤'
			? 'Дизель'
			: fuelName.includes('LPG')
			? 'Газ'
			: fuelName === '가솔린+전기'
			? 'Гибрид'
			: ''

	return (
		<div className='container mx-auto px-6 py-12'>
			<h1 className='text-2xl md:text-3xl font-bold text-center text-gray-900'>
				{manufacturerEnglishName.toUpperCase()}{' '}
				{modelGroupEnglishName.toUpperCase()}{' '}
				{gradeDetailEnglishName?.toUpperCase()}
				<br />
				{gradeEnglishName.toUpperCase()}
			</h1>

			{/* Карусель изображений */}
			<div className='mt-8 mb-20'>
				<Slider
					infinite={true}
					arrows={true}
					speed={600}
					slidesToShow={1}
					slidesToScroll={1}
					autoplay={true}
					autoplaySpeed={3000}
					className='max-w-4xl mx-auto'
				>
					{photos?.map((photo, index) => (
						<div key={index}>
							<img
								src={`https://ci.encar.com${photo.path}`}
								alt={`Car ${index}`}
								className='w-full h-auto object-cover rounded-xl shadow-lg'
							/>
						</div>
					))}
				</Slider>
			</div>

			{/* Информация */}
			<div className='mt-10 bg-white shadow-xl p-6 rounded-xl max-w-2xl mx-auto'>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					Характеристики
				</h2>
				<ul className='text-lg text-gray-700 space-y-2'>
					<li>
						<b>Цена:</b> {(price * 10000).toLocaleString()} KRW
					</li>
					<li>
						<b>Пробег:</b> {mileage.toLocaleString()} км
					</li>
					<li>
						<b>Объём двигателя:</b> {(displacement / 1000).toFixed(1)} л
					</li>
					<li>
						<b>Топливо:</b> {formattedCarFuelType}
					</li>
					<li>
						<b>Дата регистрации:</b> {formatYearMonth(yearMonth)}
					</li>
				</ul>
			</div>
		</div>
	)
}

export default CarDetails
