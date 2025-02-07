import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const popularCars = [
	{
		image:
			'https://ci.encar.com/carpicture/carpicture02/pic3812/38129925_001.jpg?impolicy=heightRate&rh=696&cw=1160&ch=696&cg=Center&wtmk=https://ci.encar.com/wt_mark/w_mark_04.png&t=20240909094901',
		name: 'BMW 5-Series (G60) 530e M Sport',
		price: '₩80,000,000',
		specs: '2.0L Гибрид / 299 л.с. / Автомат',
	},
	{
		image:
			'https://ci.encar.com/carpicture/carpicture08/pic3898/38987458_001.jpg?impolicy=heightRate&rh=696&cw=1160&ch=696&cg=Center&wtmk=https://ci.encar.com/wt_mark/w_mark_04.png&t=20250205153049',
		name: 'Mercedes-Benz AMG G63 Manufaktur',
		price: '₩242,000,000',
		specs: '4.0L Бензин / 577 л.с. / Полный привод',
	},
	{
		image:
			'https://ci.encar.com/carpicture/carpicture08/pic3888/38880726_001.jpg?impolicy=heightRate&rh=696&cw=1160&ch=696&cg=Center&wtmk=https://ci.encar.com/wt_mark/w_mark_04.png&t=20250115092715',
		name: 'Genesis GV80 Coupe',
		price: '₩90,400,000',
		specs: '3.5L Turbo Бензин / 375 л.с. / AWD',
	},
	{
		image:
			'https://ci.encar.com/carpicture/carpicture07/pic3897/38978275_001.jpg?impolicy=heightRate&rh=696&cw=1160&ch=696&cg=Center&wtmk=https://ci.encar.com/wt_mark/w_mark_04.png&t=20250205145119',
		name: 'Hyundai Sonata 2.5 Turbo N-Line',
		price: '₩39,500,000',
		specs: '2.5L Turbo / 290 л.с. / Полный привод',
	},
]

const settings = {
	dots: true,
	infinite: true,
	speed: 600,
	slidesToShow: 3,
	slidesToScroll: 1,
	autoplay: true,
	autoplaySpeed: 3000,
	arrows: false,
	responsive: [
		{ breakpoint: 1024, settings: { slidesToShow: 2 } },
		{ breakpoint: 768, settings: { slidesToShow: 1 } },
	],
}

const PopularCarsSection = () => {
	return (
		<section className='py-20 bg-gradient-to-b from-gray-900 to-gray-700 text-white relative overflow-hidden'>
			<div className='container mx-auto px-6 text-center relative z-10'>
				{/* Заголовок */}
				<motion.h2
					className='text-3xl font-extrabold text-white mb-12 tracking-wide uppercase'
					initial={{ opacity: 0, y: -30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
				>
					Популярные автомобили
				</motion.h2>

				{/* Карусель */}
				<Slider {...settings} className='max-w-6xl mx-auto'>
					{popularCars.map((car, index) => (
						<motion.div
							key={index}
							className='p-4'
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.2 }}
						>
							<div className='relative bg-white/10 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 border border-gray-200/10 hover:border-white/30 flex flex-col h-[450px]'>
								{/* Изображение */}
								<img
									src={car.image}
									alt={car.name}
									className='w-full h-64 object-cover'
								/>

								{/* Контент карточки */}
								<div className='flex flex-col justify-between flex-grow'>
									{/* Название автомобиля */}
									<div className='p-6'>
										<h3 className='text-2xl font-bold text-white'>
											{car.name}
										</h3>
									</div>

									{/* Нижний блок с ценой и характеристиками */}
									<div className='p-4 bg-gray-800/80 backdrop-blur-md text-center rounded-b-xl'>
										<p className='text-lg font-semibold text-white'>
											{car.price}
										</p>
										<p className='text-sm text-gray-300'>{car.specs}</p>
									</div>
								</div>

								{/* Glow-эффект при наведении */}
								<div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition duration-300'></div>
							</div>
						</motion.div>
					))}
				</Slider>

				{/* Кнопка "Смотреть все автомобили" */}
				<div className='mt-12'>
					<Link
						to='/catalog'
						className='bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl'
					>
						Смотреть все автомобили
					</Link>
				</div>
			</div>

			{/* Декоративные элементы */}
			<div className='absolute top-10 left-10 w-20 h-20 bg-blue-500/30 rounded-full blur-2xl animate-pulse'></div>
			<div className='absolute bottom-10 right-10 w-24 h-24 bg-red-500/30 rounded-full blur-2xl animate-bounce'></div>
		</section>
	)
}

export default PopularCarsSection
