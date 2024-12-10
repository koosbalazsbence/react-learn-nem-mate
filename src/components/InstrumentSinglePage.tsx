import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

	if (!id) {
		return null
	}

	const navigate = useNavigate()

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
							className="w-full h-96 object-contain rounded-lg mt-4"
							src={
								instrument.imageURL
									? instrument.imageURL
									: 'https://via.placeholder.com/400x800'
							}
						/>
					</div>
					<div className="flex items-center justify-between w-56 max-w-full mx-auto mt-6">
						<form
							onSubmit={async (
								e: React.FormEvent<HTMLFormElement>
							) => {
								e.preventDefault()
								try {
									const res = await fetch(
										`https://kodbazis.hu/api/instruments/${id}`,
										{
											method: 'DELETE',
											credentials: 'include',
										}
									)
									if (res.ok) {
										navigate('/')
									} else {
										console.log(
											'Failed to delete the instrument.'
										)
									}
								} catch (err) {
									console.log(err)
								}
							}}
						>
							<button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
								Delete
							</button>
						</form>
						<button onClick={() => navigate(`/edit-instrument/${id}`)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
							Edit product
						</button>
					</div>
				</div>
			)}
		</div>
	)
}
