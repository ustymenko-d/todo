import Image from 'next/image';

export default function Home() {
	return (
		<div className='flex items-center justify-center grow'>
			<h1 className='text-4xl font-bold uppercase'>Main page</h1>

			<Image
				src='/next.svg'
				width={200}
				height={50}
				className='fixed right-0 bottom-0'
				alt='Next logo'
			/>
		</div>
	);
}
