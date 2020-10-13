import React, { useState } from 'react'
import styled from 'styled-components'
import { Stack, Flex, Box } from '@i/components'
import { AccentText, SecondaryText } from '../Texts'
import type { ThemeShadow } from '@i/theme'

const LowercaseAccentText = styled(AccentText)`
	text-transform: unset;
`

const Shadow = ({
	id,
	value,
	index,
}: {
	id: string
	value: string
	index: number
}) => {
	const [ x, y, blur, spread, color ] = value.split('px').map((s) => s.trim())

	return (
		<Flex
			width="480px"
			marginBottom={4}
			flexShrink={0}
		>
			<Stack
				width="64px"
				height="64px"
				backgroundColor="Card"
				border="1px solid"
				borderColor="Background"
				borderRadius="Small"
				boxShadow={value}
				marginRight={3}
				flexShrink={0}
			>
				{index}
			</Stack>
			<Flex
				width="100%"
				justifyContent="space-between"
				paddingX={5}
				paddingY={3}
				backgroundColor="Accent"
				borderRadius="Large"
				textAlign="center"
			>
				<Stack>
					<SecondaryText>
						{x}px
					</SecondaryText>
					<LowercaseAccentText>
						x
					</LowercaseAccentText>
				</Stack>
				<Stack>
					<SecondaryText>
						{y}px
					</SecondaryText>
					<LowercaseAccentText>
						y
					</LowercaseAccentText>
				</Stack>
				<Stack>
					<SecondaryText>
						{blur}px
					</SecondaryText>
					<LowercaseAccentText>
						blur
					</LowercaseAccentText>
				</Stack>
				<Stack>
					<SecondaryText>
						{spread}px
					</SecondaryText>
					<LowercaseAccentText>
						spread
					</LowercaseAccentText>
				</Stack>
				<Flex>
					<Box
						width="32px"
						height="32px"
						backgroundColor={color}
						borderRadius="Small"
						marginRight={2}
					/>
					<Stack justifyContent="center">
						<LowercaseAccentText>
							{color}
						</LowercaseAccentText>
					</Stack>
				</Flex>
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
			{shadows.map(({ id, value }, index) => (
				<Shadow
					key={id}
					id={id}
					value={value}
					index={index}
				/>
			))}
		</Stack>
	)
}

export { Shadows }
