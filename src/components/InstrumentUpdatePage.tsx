import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function InstrumentUpdatePage() {
	const { instrumentId } = useParams()
	const [name, setName] = useState('')
	const [price, setPrice] = useState(0)
	const [quantity, setQuantity] = useState(0)
	const [imageURL, setImageURL] = useState('')
	const [fetchPending, setFetchPending] = useState(false)

	const navigate = useNavigate()

	useEffect(() => {
		setFetchPending(true)
		fetch(`https://kodbazis.hu/api/instruments/${instrumentId}`, {
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((instrument) => {
				setName(instrument.name)
				setPrice(instrument.price)
				setQuantity(instrument.quantity)
				setImageURL(instrument.imageURL)
			})
			.catch(console.log)
			.finally(() => {
				setFetchPending(false)
			})
	}, [])

	return (
		<div className="flex flex-col items-center justify-center gap-3 mt-12">
			<h2 className="text-3xl font-semibold font-serif mb-4">
				Update instrument
			</h2>
			{fetchPending ? (
				<div className="animate-spin h-5 w-5 border-2 rounded-full border-gray-500 border-t-gray-900"></div>
			) : (
				<form
					onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
						e.preventDefault()
						try {
							const res = await fetch(
								`https://kodbazis.hu/api/instruments/${instrumentId}`,
								{
									method: 'PUT',
									credentials: 'include',
									body: JSON.stringify({
										name,
										price,
										quantity,
										imageURL,
									}),
								}
							)
							await res.json()
							navigate('/')
						} catch (err) {
							console.log(err)
						}
					}}
					className="bg-white shadow-md rounded w-3/4 px-8 pt-6 pb-8 mb-4"
				>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="name"
						>
							Name
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="name"
							type="text"
							placeholder="Gibson Les Paul"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="price"
						>
							Price
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="price"
							type="number"
							placeholder="150000"
							value={price}
							min={25000}
							onChange={(e) => setPrice(+e.target.valueAsNumber)}
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="quantity"
						>
							Quantity
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="quantity"
							type="number"
							placeholder="1"
							value={quantity}
							min={1}
							onChange={(e) => setQuantity(+e.target.valueAsNumber)}
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="imageURL"
						>
							Image URL
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="imageURL"
							type="text"
							placeholder="https://via.placeholder.com/150"
							value={imageURL}
							onChange={(e) => setImageURL(e.target.value)}
						/>
					</div>
					<div className="flex items-center justify-between">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto"
							type="submit"
						>
							Update
						</button>
					</div>
				</form>
			)}
		</div>
	)
}
