import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex, Box, Text } from '@i/components'
import type { ThemeShadow } from '@i/theme'

const Shadows = ({
	shadows = [],
}: {
	shadows: ThemeShadow[]
}) => {
	return (
		<Text>
			Shadows
		</Text>
	)
}

export { Shadows }
