import { Link } from 'react-router-dom'

const Navbar = () => {
	return (
		<nav className='bg-dark text-white p-4 flex justify-between'>
			<Link to='/' className='text-xl font-bold text-primary'>
				BMExport
			</Link>
			<div className='space-x-4'>
				<Link to='/' className='hover:text-primary'>
					Главная
				</Link>
				<Link to='/catalog' className='hover:text-primary'>
					Каталог
				</Link>
				<Link to='/about' className='hover:text-primary'>
					О нас
				</Link>
				<Link to='/contacts' className='hover:text-primary'>
					Контакты
				</Link>
				<Link to='/reviews' className='hover:text-primary'>
					Отзывы
				</Link>
			</div>
		</nav>
	)
}

export default Navbar
