import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function InstrumentCreatePage() {
	const [name, setName] = useState('')
	const brand = name.split(' ').slice(0, 1)[0]
	const [price, setPrice] = useState(0)
	const [quantity, setQuantity] = useState(0)
	const [imageURL, setImageURL] = useState('')

	const navigate = useNavigate()

	return (
		<div className="flex flex-col items-center justify-center gap-3 mt-12">
			<h2 className="text-3xl font-semibold font-serif mb-4">
				Create new instrument
			</h2>
			<form
				onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
					e.preventDefault()
					try {
						const res = await fetch(
							'https://kodbazis.hu/api/instruments',
							{
								method: 'POST',
								credentials: 'include',
								body: JSON.stringify({
									name,
									brand,
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
						onChange={(e) => setPrice(+e.target.value)}
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
						onChange={(e) => setQuantity(+e.target.value)}
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
						Create
					</button>
				</div>
			</form>
		</div>
	)
}
