import React from 'react'
import { Stack, Flex, Box, Text } from '@i/components'
import type { ThemeShadow } from '@i/theme'

const Shadow = ({
	name,
	value,
	...props
}: ThemeShadow) => {
	const [ x, y, blur, spread, color ] = value.split('px').map((s) => s.trim())

	return (
		<Flex
			alignItems="center"
			flexGrow={1}
		>
			<Flex
				alignItems="center"
				justifyContent="center"
				width="90px"
				height="90px"
				backgroundColor="Card"
				borderWidth="1px"
				borderStyle="solid"
				borderColor="Accent"
				borderRadius="Small"
				boxShadow={value}
				marginRight={[ 4, null, null, 6 ]}
				flexShrink={0}
			/>
			<Flex
				width="100%"
				maxWidth="360px"
				justifyContent="space-between"
				textAlign="center"
			>
				<Stack
					flexGrow={1}
					alignItems="center"
				>
					<Text variant="Secondary">
						{name}
					</Text>
					<Flex
						width="100%"
						minWidth="210px"
						maxWidth="280px"
						alignItems="center"
						justifyContent="space-between"
						paddingTop={3}
					>
						<Stack>
							<Text variant="Secondary">
								{x}px
							</Text>
							<Text
								variant="Accent"
								textTransform="unset"
							>
								x
							</Text>
						</Stack>
						<Stack>
							<Text variant="Secondary">
								{y}px
							</Text>
							<Text
								variant="Accent"
								textTransform="unset"
							>
								y
							</Text>
						</Stack>
						<Stack>
							<Text variant="Secondary">
								{blur}px
							</Text>
							<Text
								variant="Accent"
								textTransform="unset"
							>
								blur
							</Text>
						</Stack>
						<Stack>
							<Text variant="Secondary">
								{spread}px
							</Text>
							<Text
								variant="Accent"
								textTransform="unset"
							>
								spread
							</Text>
						</Stack>
					</Flex>
					<Flex
						justifyContent="center"
						paddingTop={3}
					>
						<Box
							width="32px"
							height="32px"
							backgroundColor={color}
							borderRadius="Small"
							marginRight={3}
						/>
						<Stack justifyContent="center">
							<Text
								variant="Accent"
								textTransform="unset"
							>
								{color}
							</Text>
						</Stack>
					</Flex>
				</Stack>
			</Flex>
		</Flex>
	)
}

export { Shadow }
