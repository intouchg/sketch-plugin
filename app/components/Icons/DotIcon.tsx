import React from 'react'
import { StyledIcon } from './StyledIcon'
import type { IconProps } from './StyledIcon'

const DotIcon = (props: IconProps) => (
	<StyledIcon
		viewBox="0 0 8 8"
		{...props}
	>
		<g transform="translate(-4.000000, -4.000000)">
			<circle
				cx="8"
				cy="8"
				r="4"
			/>
		</g>
	</StyledIcon>
)

export { DotIcon }
