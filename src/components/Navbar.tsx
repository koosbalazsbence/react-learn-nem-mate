import { NavLink } from 'react-router-dom'

export default function Navbar() {
	return (
		<nav className="p-4 bg-[#c53a3a] text-[#272525] font-semibold flex justify-between items-center">
			<ul className="flex gap-4">
				<li>
					<NavLink
						to="/"
						className={({ isActive }) =>
							isActive ? ' text-white' : ''
						}
						end
					>
						Instruments
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/new-instrument"
						className={({ isActive }) =>
							isActive ? ' text-white' : ''
						}
						end
					>
						New Instrument
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}
