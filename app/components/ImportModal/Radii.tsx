import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex, Box, Text } from '@i/components'
import type { ThemeRadius } from '@i/theme'

const Radii = ({
	radii = [],
}: {
	radii: ThemeRadius[]
}) => {
	return (
		<Text>
			Radii
		</Text>
	)
}

export { Radii }
