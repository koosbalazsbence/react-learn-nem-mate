import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface Instrument {
	id: number
	brand: string
	name: string
	price: number
	quantity: number
	imageURL: string
}

export default function InstrumentSinglePage() {
	const id = useParams().instrumentId
	const [instrument, setInstrument] = useState({} as Instrument)
	const [isPending, setPending] = useState(false)

	useEffect(() => {
		setPending(true)
		fetch(`https://kodbazis.hu/api/instruments/${id}`, {
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((instruments) => setInstrument(instruments as Instrument))
			.catch(console.log)
			.finally(() => {
				setPending(false)
			})
	}, [])

	return (
		<div className="flex flex-col items-center p-5 m-auto">
			{isPending || !instrument.id ? (
				<div className="animate-spin h-5 w-5 border-2 rounded-full border-gray-500 border-t-gray-900"></div>
			) : (
				<div className="shadow-md p-4 w-2/4 bg-white rounded-lg">
					<div className="flex flex-col items-center">
						<h4 className="text-2xl font-bold">
							{instrument.brand}
						</h4>
						<h5 className="text-gray-900 font-semibold text-base text-center mb-1 m-2">
							{instrument.name}
						</h5>
						<div className="text-blue-400 text-sm font-semibold">
							{instrument.price} ft
						</div>
						<p className="text-gray-600 text-sm">
							Stock: {instrument.quantity} pieces
						</p>
						<img
							className="w-full h-64 object-contain rounded-lg mt-4"
							src={
								instrument.imageURL
									? instrument.imageURL
									: 'https://via.placeholder.com/400x800'
							}
						/>
					</div>
				</div>
			)}
		</div>
	)
}
