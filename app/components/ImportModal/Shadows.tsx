import React, { useState } from 'react'
import { Stack, Flex, Box, Text } from '@i/components'
import { AccentText, SecondaryText } from '../Texts'
import type { ThemeShadow } from '@i/theme'

const Shadow = ({
	id,
	index,
	value,
	...rest
}: ThemeShadow & {
	index: number
}) => {
	const [ x, y, blur, spread, color ] = value.split('px').map((s) => s.trim())

	return (
		<Flex
			width="480px"
			alignItems="center"
			marginBottom={4}
			flexShrink={0}
		>
			<Flex
				alignItems="center"
				justifyContent="center"
				width="64px"
				height="64px"
				backgroundColor="Card"
				border="1px solid"
				borderColor="Accent"
				borderRadius="Small"
				boxShadow={value}
				marginRight={3}
				flexShrink={0}
			>
				<Text>
					{index}
				</Text>
			</Flex>
			<Flex
				width="100%"
				justifyContent="space-between"
				paddingX={5}
				paddingY={3}
				backgroundColor="Background"
				borderRadius="Large"
				textAlign="center"
			>
				<Stack>
					<Flex
						alignItems="center"
						justifyContent="space-between"
						flexGrow={1}
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
					<Flex>
						<Box
							width="32px"
							height="32px"
							backgroundColor={color}
							borderRadius="Small"
							marginRight={2}
						/>
						<Stack justifyContent="center">
							<AccentText textTransform="unset">
								{color.includes('rgb') ? color.split(',').map((s) => s.trim()).join(',') : color}
							</AccentText>
						</Stack>
					</Flex>
				</Stack>
			</Flex>
		</Flex>
	)
}

const Shadows = ({
	shadows = [],
}: {
	shadows: ThemeShadow[]
}) => {
	return (
		<Stack
			alignItems="center"
			paddingY="146px"
		>
			{shadows.map(({ id, ...rest }, index) => (
				<Shadow
					key={id}
					id={id}
					index={index}
					{...rest}
				/>
			))}
		</Stack>
	)
}

export { Shadows }
