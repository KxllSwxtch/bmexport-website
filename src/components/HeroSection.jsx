import { motion } from 'framer-motion'
import { FaInstagram, FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const cars = [
	'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=3015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	'https://images.unsplash.com/photo-1590656371803-0ae2ae004989?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
]

const HeroSection = () => {
	const settings = {
		dots: false,
		infinite: true,
		speed: 600,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2500,
		arrows: false,
	}

	return (
		<div className='relative min-h-screen bg- flex flex-col items-center text-center px-6'>
			{/* Логотип */}
			<motion.img
				src='https://res.cloudinary.com/pomegranitedesign/image/upload/v1738886297/bmexport/logo.png'
				alt='BMExport Logo'
				className='w-48 md:w-56 mt-10'
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 1 }}
			/>

			{/* Заголовок */}
			<motion.h1
				className='text-4xl md:text-6xl font-extrabold text-primary mt-6'
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, delay: 0.3 }}
			>
				Лучшие авто из Южной Кореи 🇰🇷
			</motion.h1>

			{/* Подзаголовок */}
			<motion.p
				className='text-lg md:text-2xl text-gray-700 mt-4 max-w-2xl'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, delay: 0.6 }}
			>
				Мы подбираем и доставляем автомобили <b>по лучшей цене</b>, гарантируем{' '}
				<b>качество и надёжность</b>.
			</motion.p>

			{/* Кнопки */}
			<motion.div
				className='mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 w-full max-w-md md:max-w-none md:justify-center'
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 1, delay: 1 }}
			>
				<a
					href='https://t.me/Big_motors_korea'
					target='_blank'
					className='relative w-full md:w-auto text-center px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl active:scale-95'
				>
					🚘 Заказать авто
					<span className='absolute inset-0 bg-white opacity-0 rounded-full transition duration-300 hover:opacity-10'></span>
				</a>

				<a
					href='/catalog'
					className='relative w-full md:w-auto text-center px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-gray-800 to-black rounded-full shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl active:scale-95'
				>
					📋 Смотреть каталог
					<span className='absolute inset-0 bg-white opacity-0 rounded-full transition duration-300 hover:opacity-10'></span>
				</a>
			</motion.div>

			{/* Социальные сети */}
			<motion.div
				className='mt-10 flex space-x-6 text-3xl'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1, delay: 2 }}
			>
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
			</motion.div>

			{/* Блок преимуществ */}
			<motion.div
				className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-5xl'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1, delay: 1.3 }}
			>
				<div className='bg-white shadow-lg p-6 rounded-lg flex flex-col items-center'>
					<h3 className='text-xl font-bold text-primary'>🔥 Надёжность</h3>
					<p className='text-gray-600 mt-2'>
						Работаем напрямую с проверенными поставщиками.
					</p>
				</div>
				<div className='bg-white shadow-lg p-6 rounded-lg flex flex-col items-center'>
					<h3 className='text-xl font-bold text-primary'>
						🚀 Быстрая доставка
					</h3>
					<p className='text-gray-600 mt-2'>
						Автомобили прибывают в срок без задержек.
					</p>
				</div>
				<div className='bg-white shadow-lg p-6 rounded-lg flex flex-col items-center'>
					<h3 className='text-xl font-bold text-primary'>💰 Лучшие цены</h3>
					<p className='text-gray-600 mt-2'>
						Экономьте на покупке, получая премиум-качество.
					</p>
				</div>
			</motion.div>

			{/* Карусель автомобилей */}
			<motion.div
				className='mt-12 w-full max-w-3xl'
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, delay: 1.5 }}
			>
				<Slider {...settings}>
					{cars.map((car, index) => (
						<div key={index} className='p-2'>
							<img
								src={car}
								alt={`Car ${index}`}
								className='rounded-xl shadow-xl hover:scale-105 transition duration-500'
							/>
						</div>
					))}
				</Slider>
			</motion.div>
		</div>
	)
}

export default HeroSection
