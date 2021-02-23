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
					invisible
					key={value.id}
					flexShrink={0}
					paddingX="2px"
				>
					<Flex
						width="24px"
						height="24px"
						alignItems="center"
						justifyContent="center"
						backgroundColor="Background"
						borderRadius={2}
					>
						<Text color={value.hasOwnProperty('inherited') ? 'Text Light' : 'Text'}>
							{parseValueForDisplay(value)}
						</Text>
					</Flex>
				</Button>
            ))}
		</Flex>
	)
}

export { ResponsiveValueMenu }
