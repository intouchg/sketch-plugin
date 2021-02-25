import React from 'react'
import { Flex, Button, Box, Text } from '@i/components'
import { titleCase } from '@i/utility'
import type { SelectorProperty } from '@i/theme'

const StateSelector = ({
	selectors,
	selectorProperty,
	setSelectorProperty,
}: {
    selectors: SelectorProperty[]
    selectorProperty: SelectorProperty | ''
    setSelectorProperty: React.Dispatch<React.SetStateAction<SelectorProperty | ''>>
}) => (
	<Box paddingX={3}>
		<Flex
			flexShrink={0}
			alignItems="center"
			justifyContent="center"
			color="Text Light"
		>
			<Button
				invisible
				padding={2}
				paddingLeft={3}
				backgroundColor={selectorProperty === '' ? 'Primary' : 'Background'}
				borderTopLeftRadius="9999px"
				borderBottomLeftRadius="9999px"
				onClick={() => setSelectorProperty('')}
			>
				<Text color={selectorProperty === '' ? 'Card' : 'Text'}>
					Default
				</Text>
			</Button>
			{selectors.map((selector, index) => (
				<Button
					invisible
					key={selector}
					padding={2}
					paddingRight={index === selectors.length - 1 ? 3 : 2}
					backgroundColor={selectorProperty === selector ? 'Primary' : 'Background'}
					borderTopRightRadius={index === selectors.length - 1 ? '9999px' : 0}
					borderBottomRightRadius={index === selectors.length - 1 ? '9999px' : 0}
					onClick={() => setSelectorProperty(selector)}
				>
					<Text color={selectorProperty === selector ? 'Card' : 'Text'}>
						{titleCase(selector.split('&:')[1])}
					</Text>
				</Button>
            ))}
		</Flex>
	</Box>
)

export { StateSelector }
