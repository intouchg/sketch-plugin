import React from 'react'
import { StyledIcon } from './StyledIcon'
import type { IconProps } from './StyledIcon'

const SketchIcon = (props: IconProps) => (
	<StyledIcon
		viewBox="0 0 12 11"
		{...props}
	>
		<g>
			<polygon
				fill="#FDB300"
				points="2.61290324 0.356806748 5.98790324 0 9.36290324 0.356806748 11.9758064 3.8643985 5.98790324 10.837249 0 3.8643985"
			/>
			<g transform="translate(0.000000, 3.864398)">
				<polygon
					fill="#EA6C00"
					points="2.42540102 0 5.98790863 6.97285279 0 0"
				/>
				<polygon
					fill="#EA6C00"
					transform="translate(8.981847, 3.486426) scale(-1, 1) translate(-8.981847, -3.486426) "
					points="8.41329344 0 11.9758011 6.97285279 5.98789243 0"
				/>
				<polygon
					fill="#FDAD00"
					points="2.42540102 0 9.55041624 0 5.98790863 6.97285279"
				/>
			</g>
			<g>
				<polygon
					fill="#FDD231"
					points="5.98790863 0 2.6128934 0.35680203 2.42540102 3.86439594"
				/>
				<polygon
					fill="#FDD231"
					transform="translate(7.769144, 1.932198) scale(-1, 1) translate(-7.769144, -1.932198) "
					points="9.55039785 0 6.17538262 0.35680203 5.98789023 3.86439594"
				/>
				<polygon
					fill="#FDAD00"
					transform="translate(10.669354, 2.110599) scale(-1, 1) translate(-10.669354, -2.110599) "
					points="9.36289243 3.86439594 11.9758163 0.35680203 11.7882934 3.86439594"
				/>
				<polygon
					fill="#FDAD00"
					points="0 3.86439594 2.6128934 0.35680203 2.42540102 3.86439594"
				/>
				<polygon
					fill="#FEEEB7"
					points="5.98790863 0 2.42540102 3.86439594 9.55041624 3.86439594"
				/>
			</g>
		</g>
	</StyledIcon>
)

export { SketchIcon }