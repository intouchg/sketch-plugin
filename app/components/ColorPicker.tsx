import React from 'react'
import { SketchPicker } from 'react-color'
import { Box } from '@i/components'
import type { SketchPickerProps } from 'react-color'

const ColorPicker = (props: SketchPickerProps) => (
	<Box fontFamily="Avenir Next">
		<SketchPicker
			styles={{
                default: {
                    picker: {
                        width: '100%',
                        padding: 0,
                        border: 0,
                        fontFamily: 'inherit',
                        boxShadow: 'none',
                    },
                    activeColor: {
                        boxShadow: 'none',
                        border: '1px solid #dddddd',
                    },
                },
            }}
			{...props}
		/>
	</Box>
)

export { ColorPicker }
