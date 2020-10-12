import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex, Box, Text } from '@i/components'
import type { ThemeBorder, ThemeBorderStyle, ThemeBorderWidth } from '@i/theme'

const Borders = ({
	borders = [],
	borderStyles = [],
	borderWidths = [],
}: {
	borders: ThemeBorder[]
	borderStyles: ThemeBorderStyle[]
	borderWidths: ThemeBorderWidth[]
}) => {
	return (
		<Text>
			Borders
		</Text>
	)
}

export { Borders }
