import { FaInstagram, FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
	return (
		<footer className='bg-gray-900 text-white py-10 mt-10'>
			<div className='container mx-auto flex flex-col md:flex-row items-center md:justify-between text-center md:text-left px-6'>
				{/* Логотип и краткое описание */}
				<div className='mb-6 md:mb-0'>
					<Link
						to='/'
						className='text-2xl font-bold text-primary flex items-center'
					>
						<img
							src='https://res.cloudinary.com/pomegranitedesign/image/upload/v1738886297/bmexport/logo.png'
							alt='BMExport Logo'
							className='w-40 h-20 mr-2'
						/>
					</Link>
					<p className='text-gray-400 mt-2 text-sm'>
						Автомобили из Кореи под ключ 🚗✨
					</p>
				</div>

				{/* Навигация */}
				<div className='grid grid-cols-2 md:flex md:flex-row md:space-x-8 space-y-4 md:space-y-0 text-sm font-medium text-gray-300'>
					{['Главная', 'Каталог', 'О нас', 'Контакты', 'Отзывы'].map(
						(item, index) => (
							<Link
								key={index}
								to={item === 'Главная' ? '/' : `/${item.toLowerCase()}`}
								className='relative transition hover:text-white hover:scale-105'
							>
								{item}
								<span className='absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 hover:w-full'></span>
							</Link>
						),
					)}
				</div>

				{/* Социальные сети */}
				<div className='mt-6 md:mt-0 flex space-x-6 text-2xl'>
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
