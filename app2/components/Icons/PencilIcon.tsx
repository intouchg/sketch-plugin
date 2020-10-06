import React from 'react'
import { Icon } from '@i/components'

const PencilIcon = ({
	fill = 'Primary',
	width = 96,
	height = 96,
	style,
}: {
	fill?: string
	width?: string | number
	height?: string | number
	style?: React.CSSProperties
}) => {
	return (
		<Icon
			fill={fill}
			viewBox="0 0 24 24"
			width={width}
			height={height}
			style={style}
		>
			<path d="M 18.414062 2 C 18.158188 2 17.902031 2.0974687 17.707031 2.2929688 L 16 4 L 20 8 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.925594 2.0974687 18.669937 2 18.414062 2 z M 14.5 5.5 L 3 17 L 3 21 L 7 21 L 18.5 9.5 L 14.5 5.5 z" />
		</Icon>
	)
}

export { PencilIcon }
