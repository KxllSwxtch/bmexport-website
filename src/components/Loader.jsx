import { motion } from 'framer-motion'

const Loader = () => {
	return (
		<div className='flex justify-center items-center h-40'>
			<motion.div
				className='w-12 h-12 border-4 border-t-primary border-gray-300 rounded-full animate-spin'
				initial={{ rotate: 0 }}
				animate={{ rotate: 360 }}
				transition={{ repeat: Infinity, duration: 1 }}
			></motion.div>
		</div>
	)
}

export default Loader
