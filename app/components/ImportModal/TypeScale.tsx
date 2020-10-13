import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex, Box, Text } from '@i/components'
import type { ThemeFontSize } from '@i/theme'

const TypeScale = ({
	fontSizes = [],
}: {
	fontSizes: ThemeFontSize[]
}) => {
	console.log(fontSizes)
	return (
		<Text>
			Type Scale
		</Text>
	)
}

export { TypeScale }
