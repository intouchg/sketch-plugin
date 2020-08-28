import React from 'react'
import { Box, Heading } from '@i/components'
import type { ThemeShadowProperties } from '@i/theme'

const ThemeShadows = ({
	shadows,
}: ThemeShadowProperties) => {
	return (
		<Box
			width={1}
			backgroundColor="grey.1"
		/>
	)
}

const Shadows = ({
	shadows,
}: ThemeShadowProperties) => (
	<Box>
		<Heading>
			Shadows
		</Heading>
		<ThemeShadows shadows={shadows} />
	</Box>
)

export { Shadows }
