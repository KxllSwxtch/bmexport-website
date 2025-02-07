import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			{/* Фиксированный Navbar */}
			<nav className='fixed top-0 left-0 w-full bg-white/80 backdrop-blur-lg shadow-lg z-50'>
				<div className='container mx-auto px-6 py-4 flex justify-between items-center'>
					{/* Логотип */}
					<Link
						to='/'
						className='text-2xl font-extrabold text-primary flex items-center'
					>
						<img
							src='https://res.cloudinary.com/pomegranitedesign/image/upload/v1738886297/bmexport/logo.png'
							alt='BMExport Logo'
							className='w-20 h-12 mr-2 transition-transform hover:scale-110'
						/>
					</Link>

					{/* Десктопное меню */}
					<div className='hidden md:flex space-x-6 text-lg font-semibold'>
						{['Главная', 'Каталог', 'О нас', 'Контакты', 'Отзывы'].map(
							(item, index) => (
								<Link
									key={index}
									to={item === 'Главная' ? '/' : `/${item.toLowerCase()}`}
									className='relative transition hover:text-primary'
								>
									{item}
									<span className='absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 hover:w-full'></span>
								</Link>
							),
						)}
					</div>

					{/* Бургер-меню (мобильная версия) */}
					<button
						className='md:hidden text-2xl focus:outline-none'
						onClick={() => setIsOpen(true)}
					>
						<FaBars />
					</button>
				</div>
			</nav>

			{/* Отступ для контента, чтобы Navbar не перекрывал страницу */}
			<div className='mt-20'></div>

			{/* Анимированное мобильное меню */}
			<div
				className={`fixed top-0 left-0 w-full h-screen bg-white shadow-xl flex flex-col items-center justify-center text-lg font-semibold transition-transform ${
					isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
				} duration-300 z-50`}
			>
				{/* Кнопка закрытия */}
				<button
					className='absolute top-6 right-6 text-3xl text-primary'
					onClick={() => setIsOpen(false)}
				>
					<FaTimes />
				</button>

				{['Главная', 'Каталог', 'О нас', 'Контакты', 'Отзывы'].map(
					(item, index) => (
						<Link
							key={index}
							to={item === 'Главная' ? '/' : `/${item.toLowerCase()}`}
							className='transition hover:text-primary text-2xl py-3'
							onClick={() => setIsOpen(false)}
						>
							{item}
						</Link>
					),
				)}
			</div>
		</>
	)
}

export default Navbar
