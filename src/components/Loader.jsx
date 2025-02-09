import { motion } from 'framer-motion'

const Loader = () => {
	return (
		<div className='fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50'>
			<motion.div
				className='relative w-16 h-16'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				<motion.div
					className='absolute w-full h-full border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full'
					animate={{ rotate: 360 }}
					transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
				/>
				<motion.div
					className='absolute w-full h-full border-4 border-transparent border-b-blue-500 border-l-purple-500 rounded-full opacity-50'
					animate={{ rotate: -360 }}
					transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
				/>
			</motion.div>
		</div>
	)
}

export default Loader
