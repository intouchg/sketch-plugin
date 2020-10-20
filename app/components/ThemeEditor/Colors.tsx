import React from 'react'
import { useSelector } from 'react-redux'

const Colors = () => {
	const colors = useSelector((state) => state.theme.values.filter((v) => v.type === 'color'))

	return (
		<>
			Colors
		</>
	)
}

export { Colors }
