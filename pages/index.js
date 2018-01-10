import React from 'react'
import { Link } from '../routes'
export default function HomePage() {
	return (
		<div>
			<p>HomePage</p>
			<Link route="menu/1">
				<a>Vegetables</a>
			</Link>
		</div>
	)
}
