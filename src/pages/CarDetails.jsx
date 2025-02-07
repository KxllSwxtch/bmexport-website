import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Loader } from '../components'

const CarDetails = () => {
	const { id } = useParams() // Получаем ID автомобиля из URL
	const [car, setCar] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchCarDetails = async () => {
			setLoading(true)
			try {
				const response = await axios.get(
					`https://api.encar.com/v1/readside/inspection/vehicle/${id}`,
				)
				console.log(response.data)

				setCar(response.data)
			} catch (err) {
				setError('Ошибка при загрузке данных')
			} finally {
				setLoading(false)
			}
		}

		fetchCarDetails()
	}, [id])

	if (loading) return <Loader />
	if (error) return <p className='text-center text-red-500'>{error}</p>
	if (!car) return <p className='text-center'>Автомобиль не найден</p>

	// Извлекаем данные
	const { master, images } = car
	const { detail } = master

	return (
		<section className='py-12 bg-gray-100'>
			<div className='container mx-auto px-6'>
				{/* Заголовок */}
				<h2 className='text-4xl font-bold text-primary text-center mb-8'>
					{detail.modelYear} {master.supplyNum}
				</h2>

				{/* Фото автомобиля */}
				<div className='flex justify-center gap-4'>
					{images.map((img, index) => (
						<img
							key={index}
							src={`https://ci.encar.com${img.path}`}
							alt={img.title}
							className='w-1/2 md:w-1/3 rounded-xl shadow-lg'
						/>
					))}
				</div>

				{/* Основные характеристики */}
				<div className='mt-8 bg-white p-6 rounded-lg shadow-md'>
					<h3 className='text-2xl font-bold text-gray-900'>Характеристики</h3>
					<p className='text-lg text-gray-700'>VIN: {detail.vin}</p>
					<p className='text-lg text-gray-700'>Двигатель: {detail.motorType}</p>
					<p className='text-lg text-gray-700'>
						Пробег: {detail.mileage.toLocaleString()} км
					</p>
					<p className='text-lg text-gray-700'>
						Дата регистрации: {detail.firstRegistrationDate}
					</p>
					<p className='text-lg text-gray-700'>
						Гарантия: {detail.guarantyType.title}
					</p>
					<p className='text-lg text-gray-700'>
						Состояние: {detail.carStateType.title}
					</p>
				</div>
			</div>
		</section>
	)
}

export default CarDetails
