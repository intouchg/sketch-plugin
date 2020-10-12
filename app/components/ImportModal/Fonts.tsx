import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex, Box, Text } from '@i/components'
import type { ThemeFont, ThemeFontWeight } from '@i/theme'

const Fonts = ({
	fonts = [],
	fontWeights = [],
}: {
	fonts: ThemeFont[]
	fontWeights: ThemeFontWeight[]
}) => {
	return (
		<Text>
			Fonts
		</Text>
	)
}

export { Fonts }
