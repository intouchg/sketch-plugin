import * as React from 'react'
import { Icon } from '@i/components'

const Dot = (props) => (
	<Icon
		viewBox="0 0 8 8"
		{...props}
	><circle
		cx={8}
		cy={8}
		r={4}
		transform="translate(-4 -4)"
		fill="#8D46FF"
		fillRule="nonzero"
	/>
	</Icon>
)

export default Dot
