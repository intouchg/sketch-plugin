import React from 'react'
import { Box, Text } from '@i/components'
import { AccentText } from './index'

const ColorSwatch = ({
    name,
    color,
}: {
    name: string
    color: string
}) => {
	return (
		<Box
            width="196px"
            height="128px"
            borderRadius="Small"
            backgroundColor={color}
            border="1px solid Accent"
        >
            <Text>
                {name}
            </Text>
            <AccentText>
                {color}
            </AccentText>
        </Box>
	)
}

export { ColorSwatch }
