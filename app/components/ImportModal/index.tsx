import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex, Box } from '@i/components'
import { RightToolbar } from './RightToolbar'
import { Colors } from './Colors'
import { Fonts } from './Fonts'
import { TypeScale } from './TypeScale'
import { Shadows } from './Shadows'
import { Borders } from './Borders'
import { Radii } from './Radii'

const ResponsiveContainer = styled(Box)`
    flex-grow: 1;
    overflow-y: scroll;
`

const views = {
	Colors: Colors,
	Fonts: Fonts,
	'Type Scale': TypeScale,
	Shadows: Shadows,
	Borders: Borders,
	Radii: Radii,
} as const

export const routes = Object.keys(views) as (keyof typeof views)[]

const ImportModal = ({
	closeImportModal,
}: {
	closeImportModal: () => void
}) => {
	const [ route, setRoute ] = useState<typeof routes[number]>('Colors')
	const ImportView = views[route]

	return (
		<Flex
			position="fixed"
			top="0"
			width="100vw"
			height="100vh"
			alignItems="center"
			justifyContent="center"
			backgroundColor="rgba(0, 0, 0, 0.3)"
			zIndex={4}
		>
			<Flex
				width="calc(100vw - 308px)"
				height="calc(100vh - 100px)"
				backgroundColor="Card"
				boxShadow="Medium"
				borderRadius="Large"
			>
				<ResponsiveContainer>
					<ImportView />
				</ResponsiveContainer>
				<RightToolbar
					route={route}
					setRoute={setRoute}
					closeImportModal={closeImportModal}
				/>
			</Flex>
		</Flex>
	)
}

export { ImportModal }
