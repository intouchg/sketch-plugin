import React from 'react'
import { Flex, Button, Text } from '@i/components'
import type { ThemeFontSize } from '@i/theme'

const ResponsiveValueMenu = ({
	values,
	parseValueForDisplay,
}: {
    values: (ThemeFontSize | { id: string, value: undefined, inherited: boolean })[]
	parseValueForDisplay: (value: any) => string
}) => {
	return (
		<Flex>
			{values.map((value, index) => (
				<Button
					key={value.id}
					flexShrink={0}
					padding={1}
					marginX="2px"
					fontSize={2}
					fontWeight={4}
					color={value.hasOwnProperty('inherited') ? 'Text Light' : 'Text'}
					backgroundColor="Background"
					borderStyle="none"
					borderRadius={2}
					lineHeight="1"
					textTransform="lowercase"
				>
					{parseValueForDisplay(value)}
				</Button>
            ))}
		</Flex>
	)
}

export { ResponsiveValueMenu }
