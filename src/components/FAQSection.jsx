import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPlus, FaMinus } from 'react-icons/fa'

const faqData = [
	{
		question: 'Как заказать авто из Кореи?',
		answer:
			'Выберите автомобиль на нашем сайте или отправьте запрос. Мы подберём лучшие варианты, проверим состояние и организуем доставку.',
	},
	{
		question: 'Какие гарантии?',
		answer:
			'Мы работаем только с проверенными продавцами. Все автомобили проходят тщательную диагностику перед отправкой.',
	},
	{
		question: 'Сколько по времени занимает доставка?',
		answer:
			'Средний срок доставки составляет 10-30 дней в зависимости от страны назначения и выбранного способа транспортировки.',
	},
]

const FAQSection = () => {
	const [openIndex, setOpenIndex] = useState(null)

	const toggleFAQ = (index) => {
		setOpenIndex(openIndex === index ? null : index)
	}

	return (
		<section className='py-20 bg-gradient-to-b from-gray-50 to-gray-200'>
			<div className='container mx-auto px-6 text-center'>
				<h2 className='text-4xl font-extrabold text-primary mb-12 uppercase tracking-wide'>
					Как заказать авто?
				</h2>

				<div className='max-w-3xl mx-auto space-y-4'>
					{faqData.map((item, index) => (
						<motion.div
							key={index}
							className='bg-white/80 backdrop-blur-lg shadow-xl rounded-xl overflow-hidden transition-all duration-300 border border-gray-200 hover:border-primary'
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.3, delay: index * 0.1 }}
						>
							<button
								onClick={() => toggleFAQ(index)}
								className='cursor-pointer w-full text-left px-6 py-5 flex justify-between items-center text-lg font-semibold text-gray-800 hover:bg-gray-100 transition'
							>
								{item.question}
								<span className='text-primary text-xl'>
									{openIndex === index ? <FaMinus /> : <FaPlus />}
								</span>
							</button>
							<motion.div
								className={`overflow-hidden transition-all ${
									openIndex === index
										? 'max-h-96 opacity-100 py-4'
										: 'max-h-0 opacity-0'
								}`}
								initial={{ height: 0, opacity: 0 }}
								animate={{
									height: openIndex === index ? 'auto' : 0,
									opacity: openIndex === index ? 1 : 0,
								}}
								transition={{ duration: 0.3 }}
							>
								<p className='px-6 pb-4 text-gray-600'>{item.answer}</p>
							</motion.div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}

export default FAQSection
