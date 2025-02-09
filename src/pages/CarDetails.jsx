import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/Loader'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// Функция форматирования месяца и года
const formatYearMonth = (yearMonth) => {
	if (!yearMonth || yearMonth.length !== 6) return 'Неизвестная дата'

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

// Функция для очистки формата чисел
const cleanNumber = (value) => {
	if (!value) return 0
	return parseInt(value.replace(/\s/g, '').replace(',', '.'))
}

// Функция для вычисления возраста авто
const calculateAge = (year, month) => {
	const currentDate = new Date()
	const carDate = new Date(year, month - 1, 1)

	const ageInMonths =
		(currentDate.getFullYear() - carDate.getFullYear()) * 12 +
		(currentDate.getMonth() - carDate.getMonth())

	if (ageInMonths < 36) return '0-3'
	if (ageInMonths < 60) return '3-5'
	if (ageInMonths < 84) return '5-7'
	return '7-0'
}

const CarDetails = () => {
	const { id: lot } = useParams()
	const [car, setCar] = useState(null)
	const [customsCost, setCustomsCost] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchCarDetails = async () => {
			try {
				const response = await fetch(
					`https://api.encar.com/v1/readside/vehicle/${lot}`,
				)
				const data = await response.json()
				setCar(data)
			} catch (error) {
				console.error('Ошибка загрузки данных', error)
			} finally {
				setLoading(false)
			}
		}

		fetchCarDetails()
	}, [lot])

	// Запрос на расчёт таможенных платежей
	useEffect(() => {
		if (car) {
			const {
				category: { yearMonth },
				spec: { displacement },
				advertisement: { price },
			} = car

			const carYear = yearMonth.substring(0, 4)
			const carMonth = parseInt(yearMonth.substring(4, 6))
			const engineVolume = displacement
			const carPrice = price * 10000
			const engineType = 1

			const fetchCustomsCost = async () => {
				try {
					const response = await axios.post(
						'https://corsproxy.io/?key=28174bc7&url=https://calcus.ru/calculate/Customs',
						new URLSearchParams({
							owner: 1,
							age: calculateAge(carYear, carMonth),
							engine: engineType,
							power: 1,
							power_unit: 1,
							value: engineVolume,
							price: carPrice,
							curr: 'KRW',
						}).toString(),
						{
							withCredentials: false,
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded',
							},
						},
					)

					setCustomsCost(response.data)
				} catch (error) {
					console.error('Ошибка загрузки таможенных платежей', error)
				}
			}

			fetchCustomsCost()
		}
	}, [car])

	if (loading) return <Loader />
	if (!car)
		return <p className='text-center text-xl text-red-500'>Авто не найдено</p>

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
				{gradeDetailEnglishName?.toUpperCase()} <br />
				{gradeEnglishName.toUpperCase()}
			</h1>

			{/* Карусель изображений */}
			<div className='mt-8 mb-10'>
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
					{photos
						?.sort((a, b) => (a.path > b.path ? 1 : -1))
						.map((photo, index) => (
							<div
								key={index}
								className='w-full h-[500px] flex items-center justify-center'
							>
								<img
									src={`https://ci.encar.com${photo.path}`}
									alt={`Car ${index}`}
									className='w-full h-full object-cover rounded-xl shadow-lg'
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

			{/* Стоимость таможенных платежей */}
			<div className='mt-10 bg-white shadow-xl p-6 rounded-xl max-w-2xl mx-auto'>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					Стоимость таможенных платежей в России
				</h2>
				{customsCost ? (
					<div className='mt-4 p-4 border rounded bg-gray-100'>
						<p>
							<b>Таможенный Сбор:</b>{' '}
							{cleanNumber(customsCost.sbor).toLocaleString()} ₽
						</p>
						<p>
							<b>Таможенная Пошлина:</b>{' '}
							{cleanNumber(customsCost.tax).toLocaleString()} ₽
						</p>
						<p>
							<b>Утилизационный Сбор:</b>{' '}
							{cleanNumber(customsCost.util).toLocaleString()} ₽
						</p>
						<p>
							<b>Итого:</b> {cleanNumber(customsCost.total).toLocaleString()} ₽
						</p>
						<p>
							<b>Автомобиль + Таможенные платежи:</b>{' '}
							{cleanNumber(customsCost.total2).toLocaleString()} ₽
						</p>
					</div>
				) : (
					<p className='text-lg text-gray-500'>Расчёт загружается...</p>
				)}
			</div>
		</div>
	)
}

export default CarDetails
