import React from 'react'
import { StyledIcon } from './StyledIcon'
import type { IconProps } from './StyledIcon'

const PlusIcon = (props: IconProps) => (
	<StyledIcon
		viewBox="0 0 13 12"
		{...props}
	>
		<g transform="translate(-410.000000, -5.000000)">
			<path d="M416,17 C416.15625,17 416.289062,16.9427083 416.398438,16.828125 C416.507812,16.7135417 416.5625,16.5833333 416.5625,16.4375 L416.5625,11.5625 L421.53125,11.5625 C421.6875,11.5625 421.820312,11.5078125 421.929688,11.3984375 C422.039062,11.2890625 422.09375,11.15625 422.09375,11 C422.09375,10.84375 422.039062,10.7109375 421.929688,10.6015625 C421.820312,10.4921875 421.6875,10.4375 421.53125,10.4375 L416.5625,10.4375 L416.5625,5.59375 C416.5625,5.4375 416.507812,5.3046875 416.398438,5.1953125 C416.289062,5.0859375 416.15625,5.03125 416,5.03125 C415.84375,5.03125 415.710938,5.0859375 415.601562,5.1953125 C415.492188,5.3046875 415.4375,5.4375 415.4375,5.59375 L415.4375,10.4375 L410.5625,10.4375 C410.416667,10.4375 410.286458,10.4921875 410.171875,10.6015625 C410.057292,10.7109375 410,10.84375 410,11 C410,11.15625 410.057292,11.2890625 410.171875,11.3984375 C410.286458,11.5078125 410.416667,11.5625 410.5625,11.5625 L415.4375,11.5625 L415.4375,16.4375 C415.4375,16.5833333 415.492188,16.7135417 415.601562,16.828125 C415.710938,16.9427083 415.84375,17 416,17 Z" />
		</g>
	</StyledIcon>
)

export { PlusIcon }
