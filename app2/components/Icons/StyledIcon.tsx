import React from 'react'
import { Icon } from '@i/components'
import type { ComponentProps } from 'react'

const StyledIcon = ({
	fill = 'Primary',
	width = 96,
	height = 96,
    style,
    children,
}: {
	fill?: string
	width?: string | number
	height?: string | number
    style?: React.CSSProperties
    children: React.ReactNode
}) => {
	return (
		<Icon
			fill={fill}
			viewBox="0 0 26 26"
			width={width}
			height={height}
			style={style}
		>
			{children}
		</Icon>
	)
}

export type IconProps = Omit<ComponentProps<typeof StyledIcon>, 'children'>

export { StyledIcon }