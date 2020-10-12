import React from 'react'
import { Box } from '@i/components'

const Divider = ({
	width = '100%',
	marginX = 0,
	backgroundColor = 'grey.1',
}: {
	width?: string | number
	marginX?: string | number
	backgroundColor?: string
}) => (
	<Box
		width={width}
		height="1px"
		marginY={4}
		marginX={marginX}
		backgroundColor={backgroundColor}
	/>
)

export { Divider }
