import React from 'react'
// @ts-ignore
import * as Icons from '../icons'
import type { Icon } from '@i/components'

const MetaIcon = ({ icon, ...props }: React.ComponentProps<typeof Icon> & { icon: string }) => {
	const IconComponent = Icons[icon]
	return <IconComponent {...props} />
}

MetaIcon.displayName = 'MetaIcon'

export { MetaIcon as Icon }
