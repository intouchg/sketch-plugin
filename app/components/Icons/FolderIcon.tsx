import React from 'react'
import { StyledIcon } from './StyledIcon'
import type { IconProps } from './StyledIcon'

const FolderIcon = (props: IconProps) => (
	<StyledIcon
		viewBox="0 0 21 17"
		{...props}
	>
		<g transform="translate(-4.000000, -4.000000)">
			<path d="M22.6132812,21 C23.0039062,21 23.3359375,20.8632812 23.609375,20.5898438 C23.8828125,20.3164062 24.0195312,19.984375 24.0195312,19.59375 L24.0195312,8.65625 C24.0195312,8.265625 23.8828125,7.93359375 23.609375,7.66015625 C23.3359375,7.38671875 23.0039062,7.25 22.6132812,7.25 L13.5703125,7.25 L13.0820312,5.7265625 C12.9908854,5.44010417 12.8216146,5.20572917 12.5742188,5.0234375 C12.3268229,4.84114583 12.046875,4.75 11.734375,4.75 L5.42578125,4.75 C5.03515625,4.75 4.703125,4.88671875 4.4296875,5.16015625 C4.15625,5.43359375 4.01953125,5.765625 4.01953125,6.15625 L4.01953125,19.59375 C4.01953125,19.984375 4.15625,20.3164062 4.4296875,20.5898438 C4.703125,20.8632812 5.03515625,21 5.42578125,21 L22.6132812,21 Z M12.0859375,7.25 L5.42578125,7.25 L5.42578125,6.15625 L11.734375,6.15625 L12.0859375,7.25 Z M22.6132812,19.59375 L5.42578125,19.59375 L5.42578125,8.65625 L22.6132812,8.65625 L22.6132812,19.59375 Z" />
		</g>
	</StyledIcon>
)

export { FolderIcon }
