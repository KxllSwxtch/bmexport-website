import { useParams } from 'react-router-dom'

const CarDetails = () => {
	const { id } = useParams()

	return (
		<div className='text-center p-10'>
			<h1 className='text-4xl font-bold text-primary'>
				Детальная информация о авто
			</h1>
			<p className='text-lg text-dark mt-4'>Автомобиль ID: {id}</p>
		</div>
	)
}

export default CarDetails
