import React from 'react'
import { StyledIcon } from './StyledIcon'
import type { IconProps } from './StyledIcon'

const CloudIcon = (props: IconProps) => (
	<StyledIcon
		viewBox="0 0 23 14"
		{...props}
	>
		<g transform="translate(0.000000, 0.000000)">
			<path d="M17.65625,13.75 C18.71875,13.75 19.625,13.3671875 20.375,12.6015625 C21.125,11.8359375 21.5,10.921875 21.5,9.859375 C21.5,8.765625 21.125,7.8359375 20.375,7.0703125 C19.625,6.3046875 18.71875,5.921875 17.65625,5.921875 L17.65625,5.921875 L17.65625,5.78125 C17.65625,4.25 17.1328125,2.9453125 16.0859375,1.8671875 C15.0390625,0.7890625 13.765625,0.25 12.265625,0.25 C11.203125,0.25 10.2265625,0.5390625 9.3359375,1.1171875 C8.4453125,1.6953125 7.78125,2.453125 7.34375,3.390625 C6.90625,3.171875 6.5,3.0625 6.125,3.0625 C5.4375,3.0625 4.8359375,3.2890625 4.3203125,3.7421875 C3.8046875,4.1953125 3.484375,4.765625 3.359375,5.453125 C2.515625,5.734375 1.828125,6.2421875 1.296875,6.9765625 C0.765625,7.7109375 0.5,8.546875 0.5,9.484375 C0.5,10.640625 0.9140625,11.640625 1.7421875,12.484375 C2.5703125,13.328125 3.5625,13.75 4.71875,13.75 L4.71875,13.75 L17.65625,13.75 Z" />
		</g>
	</StyledIcon>
)

export { CloudIcon }
