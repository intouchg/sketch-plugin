import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex, Box, Text, Stack } from '@i/components'
import type { ThemeBorderWidth } from '@i/theme'

const BorderWidth = ({
	id,
	value,
	imported,
	...rest
}: ThemeBorderWidth & { imported?: boolean }) => {
	return (
		<Flex
			width="398px"
			alignItems="center"
			justifyContent="space-around"
			borderRadius="Large"
			backgroundColor="Background"
			paddingX={4}
			paddingY={3}
			marginBottom={2}
		>
			<Text>
				{value}
			</Text>
			<Box
				width="270px"
				height={value}
				backgroundColor="#232323"
			/>
		</Flex>
	)
}

const Borders = ({
	borderWidths = [],
}: {
	borderWidths: (ThemeBorderWidth & { imported?: boolean })[]
}) => {
	return (
		<Stack
			alignItems="center"
			paddingY="146px"
		>
			{borderWidths.map(({ id, ...props }) => (
				<BorderWidth
					key={id}
					id={id}
					{...props}
				/>
			))}
		</Stack>
	)
}

export { Borders }
