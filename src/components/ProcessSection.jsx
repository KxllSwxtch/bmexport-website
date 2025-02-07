import { motion } from 'framer-motion'
import {
	FaSearch,
	FaClipboardCheck,
	FaTruck,
	FaFlagCheckered,
} from 'react-icons/fa'

const steps = [
	{
		icon: <FaSearch className='text-primary text-5xl' />,
		title: 'Подбор авто',
		description: 'Вы выбираете автомобиль, а мы находим лучшие варианты.',
	},
	{
		icon: <FaClipboardCheck className='text-primary text-5xl' />,
		title: 'Проверка',
		description: 'Мы проверяем авто, историю и техническое состояние.',
	},
	{
		icon: <FaTruck className='text-primary text-5xl' />,
		title: 'Доставка',
		description: 'Организуем безопасную и быструю доставку до вашей страны.',
	},
	{
		icon: <FaFlagCheckered className='text-primary text-5xl' />,
		title: 'Получение',
		description: 'Вы получаете авто, полностью готовое к эксплуатации.',
	},
]

const ProcessSection = () => {
	return (
		<section className='py-16 bg-gray-50 mt-10'>
			<div className='container mx-auto px-6 text-center'>
				<h2 className='text-4xl font-bold text-primary mb-12'>
					Как мы работаем?
				</h2>

				<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
					{steps.map((step, index) => (
						<motion.div
							key={index}
							className='p-6 bg-white rounded-lg shadow-md flex flex-col items-center transition-all duration-300 hover:shadow-lg'
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.3 }}
						>
							<div className='w-20 h-20 flex items-center justify-center bg-gray-100 rounded-full mb-4 shadow-md'>
								{step.icon}
							</div>
							<h3 className='text-xl font-bold mb-2'>{step.title}</h3>
							<p className='text-gray-600 text-sm'>{step.description}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}

export default ProcessSection
