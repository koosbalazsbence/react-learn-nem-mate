import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

interface Instrument {
	id: number
	brand: string
	name: string
	price: number
	quantity: number
	imageURL: string
}

export default function InstrumentListPage() {
	const [instruments, setInstruments] = useState([] as Instrument[])
	const [isFetchPending, setFetchPending] = useState(false)

	useEffect(() => {
		setFetchPending(true)
		fetch('https://kodbazis.hu/api/instruments', { credentials: 'include' })
			.then((res) => res.json())
			.then((instruments) => setInstruments(instruments as Instrument[]))
			.catch(console.log)
			.finally(() => {
				setFetchPending(false)
			})
	}, [])

	return (
		<>
			<div className="flex flex-col items-center p-5 m-auto">
				{isFetchPending ? (
					<div className="animate-spin h-5 w-5 border-2 rounded-full border-gray-500 border-t-gray-900"></div>
				) : (
					<>
						<h1 className="text-3xl font-semibold font-serif mb-12">
							Instruments
						</h1>
						<div className="grid w-2/4 grid-cols-1 xl:grid-cols-3 gap-4">
							{instruments.map((instrument) => (
								<NavLink
									key={instrument.id}
									to={`/instrument/${instrument.id}`}
									className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out flex items-center justify-center"
								>
									<div className="flex flex-col items-center p-3">
										<h6 className="text-gray-600 text-xs text-center font-light">
											{instrument.brand}
										</h6>
										<h5 className="text-gray-900 font-semibold text-base text-center mb-1 m-2">
											{instrument.name}
										</h5>
										<div className="text-blue-400 text-sm font-semibold">
											{instrument.price} ft -
										</div>
										<div className="text-blue-400 text-xs font-light">
											Stock: {instrument.quantity} pieces
										</div>
										<div className="w-full p-2 mt-4">
											<img
												className="w-full h-64 object-contain mx-auto"
												src={
													instrument.imageURL
														? instrument.imageURL
														: 'https://via.placeholder.com/400x800'
												}
											/>
										</div>
									</div>
								</NavLink>
							))}
						</div>
					</>
				)}
			</div>
		</>
	)
}
