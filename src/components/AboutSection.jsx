import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const AboutSection = () => {
	return (
		<section className='relative w-full h-screen flex items-center justify-center text-white'>
			{/* Фоновое видео */}
			<video
				autoPlay
				loop
				muted
				className='absolute top-0 left-0 w-full h-full object-cover'
			>
				<source
					src='https://res.cloudinary.com/pomegranitedesign/video/upload/v1738891208/bmexport/instavideo.mp4'
					type='video/mp4'
				/>
			</video>

			{/* Затемнение для лучшей читабельности */}
			<div className='absolute inset-0 bg-black/60'></div>

			{/* Контент */}
			<motion.div
				className='relative z-10 bg-white/10 backdrop-blur-md p-10 md:p-20 rounded-lg shadow-lg max-w-4xl text-center'
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
			>
				<h2 className='text-5xl font-bold text-white mb-6'>
					О компании BMExport
				</h2>
				<p className='text-lg text-gray-200 mb-6 leading-relaxed'>
					BMExport – это команда профессионалов, специализирующихся на подборе и
					доставке автомобилей из Южной Кореи. Мы предоставляем полный спектр
					услуг: от выбора идеального авто до его доставки в вашу страну.
				</p>
				<p className='text-lg text-gray-200 mb-6 leading-relaxed'>
					Более 5 лет опыта, сотни довольных клиентов и десятки успешных
					поставок каждый месяц. Доставляем в Россию, Казахстан, Кыргызстан и
					другие страны. Наши эксперты контролируют процесс на каждом этапе,
					гарантируя прозрачность и надёжность.
				</p>
				<Link
					to='/about'
					className='bg-[#FF6600] text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl transition-transform transform hover:scale-105 md:mt-10 md:block w-[50%] m-auto'
				>
					Подробнее о нас
				</Link>
			</motion.div>
		</section>
	)
}

export default AboutSection
