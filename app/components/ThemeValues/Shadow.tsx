import React from 'react'
import { Stack, Flex, Box } from '@i/components'
import { AccentText, SecondaryText } from '../Texts'
import type { ThemeShadow } from '@i/theme'

const Shadow = ({
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
				width="80px"
				height="80px"
				backgroundColor="Card"
				borderWidth="1px"
				borderStyle="solid"
				borderColor="Accent"
				borderRadius="Small"
				boxShadow={value}
				marginRight={4}
				flexShrink={0}
			/>
			<Flex
				width="100%"
				justifyContent="space-between"
				paddingX={5}
				paddingY={3}
				backgroundColor="Background"
				borderRadius="Large"
				textAlign="center"
			>
				<Stack flexGrow={1}>
					<Flex
						alignItems="center"
						justifyContent="space-around"
					>
						<Stack>
							<SecondaryText>
								{x}px
							</SecondaryText>
							<AccentText textTransform="unset">
								x
							</AccentText>
						</Stack>
						<Stack>
							<SecondaryText>
								{y}px
							</SecondaryText>
							<AccentText textTransform="unset">
								y
							</AccentText>
						</Stack>
						<Stack>
							<SecondaryText>
								{blur}px
							</SecondaryText>
							<AccentText textTransform="unset">
								blur
							</AccentText>
						</Stack>
						<Stack>
							<SecondaryText>
								{spread}px
							</SecondaryText>
							<AccentText textTransform="unset">
								spread
							</AccentText>
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
							<AccentText textTransform="unset">
								{color}
							</AccentText>
						</Stack>
					</Flex>
				</Stack>
			</Flex>
		</Flex>
	)
}

export { Shadow }
