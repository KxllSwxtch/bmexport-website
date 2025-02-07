import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const CarListItem = ({ car, index }) => {
	const { t } = useTranslation()

	// Функция для получения ID автомобиля из `Photo`
	const getVehicleId = (photoPath) => {
		if (!photoPath) return null
		const parts = photoPath.split('/') // Разделяем по "/"
		const fileName = parts[parts.length - 1] // Получаем последний элемент
		return fileName.split('_')[0] // Берём ID до "_"
	}

	const vehicleId = getVehicleId(car.Photo) // Получаем корректный ID

	// Функция для формирования URL изображения
	const getCarImage = (photoPath) => {
		return photoPath
			? `https://ci.encar.com${photoPath}001.jpg`
			: 'https://via.placeholder.com/300'
	}

	// Функция для перевода названия производителя
	const translateManufacturer = (name) => {
		const translations = {
			현대: 'Hyundai',
			기아: 'KIA',
			제네시스: 'Genesis',
			'쉐보레(GM대우)': 'Chevrolet (Korea)',
			'르노코리아(삼성)': 'Renault (Samsung)',
			'KG모빌리티(쌍용)': 'SsangYong',
		}
		return translations[name] || name // Если нет перевода, оставить как есть
	}

	const formattedCarFuelType =
		car.FuelType === '가솔린'
			? 'Бензин'
			: car.FuelType === '디젤'
			? 'Дизель'
			: car.FuelType.includes('LPG')
			? 'Газ'
			: car.FuelType === '가솔린+전기'
			? 'Гибрид'
			: ''

	return (
		<motion.div
			className='bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300'
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
		>
			<img
				src={getCarImage(car.Photo)}
				alt={car.Model}
				className='w-full h-56 object-cover'
			/>
			<div className='p-4'>
				<h3 className='text-xl font-bold text-gray-900'>
					{translateManufacturer(car.Manufacturer)} {car.Model}
				</h3>
				<p className='text-gray-600'>
					{car.Badge} {car.BadgeDetail}
				</p>
				<p className='text-sm text-gray-500'>
					{car.FormYear} • {car.Mileage.toLocaleString()} км •{' '}
					{formattedCarFuelType}
				</p>
				<p className='text-lg font-semibold text-primary'>
					{(car.Price * 10000).toLocaleString()} ₩
				</p>

				{/* Кнопка "Подробнее" */}
				<Link
					to={`/car/${vehicleId}`} // Используем ID для перехода
					className='mt-5 block text-center px-6 py-3 text-lg font-semibold text-white 
             bg-blue-600 rounded-full shadow-md transition-transform duration-300 
             hover:bg-blue-700 hover:scale-105 active:scale-95'
				>
					Подробнее
				</Link>
			</div>
		</motion.div>
	)
}

// 📌 Добавляем PropTypes для проверки типов props
CarListItem.propTypes = {
	car: PropTypes.shape({
		Manufacturer: PropTypes.string.isRequired,
		Model: PropTypes.string.isRequired,
		Badge: PropTypes.string,
		BadgeDetail: PropTypes.string,
		FormYear: PropTypes.number.isRequired,
		Mileage: PropTypes.number.isRequired,
		FuelType: PropTypes.string.isRequired,
		Price: PropTypes.number.isRequired,
		Photo: PropTypes.string,
		Id: PropTypes.number,
	}).isRequired,
	getCarImage: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
}

export default CarListItem
