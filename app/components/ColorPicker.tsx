import React from 'react'
import { SketchPicker } from 'react-color'
import { Box } from '@intouchg/components'
import type { SketchPickerProps, ColorResult } from 'react-color'

export const parseColorPickerInput = (color: string) => {
	if (color === '' || color === 'transparent' || color.charAt(0) === '#') {
		return color
	}

	const [ r, g, b, a ] = color.substr(5).slice(0, -1).split(',').map((s) => s.trim())
	let alpha = Number(a).toFixed(2)

	if (a.includes('%')) {
		alpha = (Number(a.split('%')[0]) / 100).toFixed(2)
	}

	return { r: Number(r), g: Number(g), b: Number(b), a: Number(alpha) }
}

export const parseColorPickerOutput = (data: ColorResult) => {
	const { r, g, b, a } = data.rgb

	if (a !== undefined && a < 1) {
		const alpha = (a * 100).toFixed(0)
		return `rgba(${r}, ${g}, ${b}, ${alpha}%)`
	}

	return data.hex
}

const ColorPicker = ({
	color,
	onChange,
	onChangeComplete = () => {},
	presetColors = [],
	styles,
	...props
}: {
    color: string
    onChange: (color: string) => void
    onChangeComplete?: (color: string) => void
	presetColors?: SketchPickerProps['presetColors']
} & Pick<SketchPickerProps, 'styles' | 'presetColors' | 'onSwatchHover'>) => (
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
                ...styles,
            }}
			color={parseColorPickerInput(color)}
			presetColors={presetColors}
			onChange={(data) => onChange(parseColorPickerOutput(data))}
			onChangeComplete={(data) => onChangeComplete(parseColorPickerOutput(data))}
			{...props}
		/>
	</Box>
)

export { ColorPicker }
