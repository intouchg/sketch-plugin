import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex, Box, Text } from '@i/components'
import type { ThemeFont, ThemeFontWeight } from '@i/theme'

const Fonts = ({
	fonts = [],
	fontWeights = [],
}: {
	fonts: (ThemeFont & { imported?: boolean })[]
	fontWeights: (ThemeFontWeight & { imported?: boolean })[]
}) => {
	return (
		<Text>
			Fonts
		</Text>
	)
}

export { Fonts }
