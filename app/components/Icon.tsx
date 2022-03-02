import React from 'react'
// @ts-ignore
import * as Icons from '../icons'
import type { Svg } from '@intouchg/components'

const Icon = ({ icon, ...props }: React.ComponentProps<typeof Svg> & { icon: string }) => {
	const IconComponent = Icons[icon]
	return <IconComponent {...props} />
}

Icon.displayName = 'Icon'

export { Icon }
