import { FaInstagram, FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
	return (
		<footer className='bg-gray-900 text-white py-10 mt-10'>
			<div className='container mx-auto px-6 flex flex-col md:flex-row md:justify-between text-center md:text-left space-y-8 md:space-y-0'>
				{/* Логотип и краткое описание */}
				<div className='flex flex-col items-center md:items-start'>
					<Link
						to='/'
						className='text-2xl font-bold text-primary flex items-center'
					>
						<img
							src='https://res.cloudinary.com/pomegranitedesign/image/upload/v1738886297/bmexport/logo.png'
							alt='BMExport Logo'
							className='w-30 h-16'
						/>
					</Link>
					<p className='text-gray-400 mt-3 text-sm max-w-xs'>
						Автомобили из Кореи под ключ 🚗✨
					</p>
				</div>

				{/* Навигация */}
				<div className='grid grid-cols-2 md:grid-cols-1 md:flex md:space-x-6 text-sm font-medium text-gray-300'>
					{['Главная', 'Каталог', 'О нас', 'Контакты', 'Отзывы'].map(
						(item, index) => (
							<Link
								key={index}
								to={item === 'Главная' ? '/' : `/${item.toLowerCase()}`}
								className='relative transition hover:text-white hover:scale-105 text-center md:text-left'
							>
								{item}
								<span className='absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 hover:w-full'></span>
							</Link>
						),
					)}
				</div>

				{/* Социальные сети */}
				<div className='flex justify-center md:justify-start space-x-6 text-2xl'>
					<a
						href='https://www.instagram.com/big.motors.export/'
						target='_blank'
						className='text-pink-500 hover:scale-110 transition'
					>
						<FaInstagram />
					</a>
					<a
						href='https://t.me/Big_motors_korea'
						target='_blank'
						className='text-blue-500 hover:scale-110 transition'
					>
						<FaTelegramPlane />
					</a>
					<a
						href='https://wa.me/821075834466'
						target='_blank'
						className='text-green-500 hover:scale-110 transition'
					>
						<FaWhatsapp />
					</a>
				</div>
			</div>

			{/* Копирайт */}
			<div className='text-gray-500 text-sm text-center mt-8'>
				© 2025 BMExport. Все права защищены.
			</div>
		</footer>
	)
}

export default Footer
