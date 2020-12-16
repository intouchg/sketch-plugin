import React from 'react'
import { Icon } from '@i/components'

const StyledIcon = ({
	fill = 'Primary',
	width,
	height,
	viewBox,
	style,
	children,
}: {
	fill?: string
	width?: string | number
	height?: string | number
	viewBox: string
    style?: React.CSSProperties
    children: React.ReactNode
}) => {
	return (
		<Icon
			fill={fill}
			viewBox={viewBox}
			width={width}
			height={height}
			style={style}
		>
			{children}
		</Icon>
	)
}

export type IconProps = Omit<React.ComponentProps<typeof StyledIcon>, 'children' | 'viewBox'>

export { StyledIcon }
