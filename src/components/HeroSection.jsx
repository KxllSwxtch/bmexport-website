import { motion } from 'framer-motion'
import { FaInstagram, FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const cars = [
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1738893493/bmexport/2.jpg',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1738893493/bmexport/4.jpg',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1738893493/bmexport/1.jpg',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1738893493/bmexport/3.jpg',
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
		<div className='relative min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-24'>
			{/* Левый блок (Текст, кнопки, соцсети) */}
			<div className='md:w-1/2 text-center md:text-left'>
				{/* Логотип */}
				<motion.img
					src='https://res.cloudinary.com/pomegranitedesign/image/upload/v1738886297/bmexport/logo.png'
					alt='BMExport Logo'
					className='w-48 md:w-56 mx-auto md:mx-0'
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
					className='text-lg md:text-2xl text-gray-700 mt-4 max-w-lg'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 0.6 }}
				>
					Мы подбираем и доставляем автомобили <b>по лучшей цене</b>,
					гарантируем <b>качество и надёжность</b>.
				</motion.p>

				{/* Кнопки */}
				<motion.div
					className='mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6'
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1, delay: 1 }}
				>
					<a
						href='https://t.me/Big_motors_korea'
						target='_blank'
						className='relative px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl active:scale-95 text-center'
					>
						🚘 Заказать авто
					</a>

					<a
						href='/catalog'
						className='relative px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-gray-800 to-black rounded-full shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl active:scale-95 text-center'
					>
						📋 Смотреть каталог
					</a>
				</motion.div>

				{/* Социальные сети */}
				<motion.div
					className='mt-10 flex justify-center md:justify-start space-x-6 text-3xl'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, delay: 1.5 }}
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
			</div>

			{/* Правый блок (Карусель автомобилей) */}
			<motion.div
				className='mt-5 md:mt-0 md:w-1/2 max-w-xl'
				initial={{ opacity: 0, x: 50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 1, delay: 1 }}
			>
				<Slider {...settings}>
					{cars.map((car, index) => (
						<div key={index} className='p-2'>
							<img
								src={car}
								alt={`Car ${index}`}
								className='rounded-xl shadow-xl transition duration-500 h-96 md:w-full md:h-full mx-auto'
							/>
						</div>
					))}
				</Slider>
			</motion.div>
		</div>
	)
}

export default HeroSection
