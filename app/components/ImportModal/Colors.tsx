import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex, Box, Text } from '@i/components'
import type { ThemeColor } from '@i/theme'

const Colors = ({
	colors = [],
}: {
	colors: ThemeColor[]
}) => {
	return (
		<Flex>
			{colors.map(({ id, value }) => (
				<Box
					key={id}
					width="30px"
					height="30px"
					backgroundColor={value}
				/>
			))}
		</Flex>
	)
}

export { Colors }
