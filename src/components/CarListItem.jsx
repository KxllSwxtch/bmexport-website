import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const CarListItem = ({ car, index }) => {
	// 📌 Функция для получения списка изображений
	const getCarImages = (images) => {
		return images ? images.split('#') : []
	}

	const carImages = getCarImages(car.IMAGES)

	// 📌 Форматируем цену в вонах
	const formattedPrice = car.FINISH
		? car.FINISH.toLocaleString() + ' ₩'
		: 'Цена уточняется'

	// 📌 Пробег
	const formattedMileage = car.MILEAGE
		? car.MILEAGE.toLocaleString() + ' км'
		: '—'

	// 📌 Объём двигателя (из cc в литры)
	const formattedEngineVolume = car.ENG_V
		? (car.ENG_V / 1000).toFixed(1) + ' л'
		: '—'

	// 📌 Основное фото (первое из списка)
	const mainImage =
		carImages.length > 0 ? carImages[0] : 'https://via.placeholder.com/300'

	const formattedYearMonth = car?.MONTH

	console.log(car?.LOT)

	return (
		<motion.div
			className='bg-white shadow-xl overflow-hidden flex flex-col h-full'
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
		>
			{/* Фото */}
			<div className='relative'>
				<img
					src={mainImage}
					alt={`${car.MARKA_NAME} ${car.MODEL_NAME}`}
					className='w-full aspect-[16/9] object-cover rounded-t-3xl'
				/>
			</div>

			{/* Контент */}
			<div className='p-6 flex flex-col flex-grow'>
				<h3 className='text-2xl font-bold text-gray-900'>
					{car.MARKA_NAME} {car.MODEL_NAME} {car.GRADE}
				</h3>
				<p className='text-gray-500 text-lg'>{formattedYearMonth}</p>
				<p className='text-gray-600 text-lg font-medium'>
					{formattedEngineVolume} • {formattedMileage}
				</p>
				<p className='text-2xl font-bold text-primary mt-2'>{formattedPrice}</p>

				{/* Кнопка "Подробнее" */}
				<div className='mt-auto pt-6'>
					<Link
						to={`/car/${car?.LOT}`}
						target='_blank'
						rel='noopener noreferrer'
						className='block text-center bg-blue-500 p-2 rounded hover:bg-blue-600 transition-colors text-white'
					>
						Подробнее
					</Link>
				</div>
			</div>
		</motion.div>
	)
}

// 📌 PropTypes
CarListItem.propTypes = {
	car: PropTypes.shape({
		ID: PropTypes.number.isRequired,
		MARKA_NAME: PropTypes.string.isRequired,
		MODEL_NAME: PropTypes.string.isRequired,
		GRADE: PropTypes.string,
		ENG_V: PropTypes.number,
		MILEAGE: PropTypes.number,
		FINISH: PropTypes.number,
		IMAGES: PropTypes.string,
		MONTH: PropTypes.string,
		LOT: PropTypes.number,
	}).isRequired,
	index: PropTypes.number.isRequired,
}

export default CarListItem
