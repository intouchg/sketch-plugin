import React from 'react'
import { Label, Input, Text } from '@i/components'

const PixelInput = ({
	value,
	onChange,
	onBlur,
	min,
	max,
	width = '62px',
	...props
}: React.ComponentProps<typeof Label> & {
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onBlur: (event: React.ChangeEvent<HTMLInputElement>) => void
	min?: number
	max?: number
}) => {
	const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(event.target.value)

		if (min && value < min) {
			event.target.value = String(min)
		}

		if (max && value > max) {
			event.target.value = String(max)
		}

		onBlur(event)
	}

	return (
		<Label
			display="flex"
			width={width}
			padding={2}
			backgroundColor="Background"
			borderRadius="Medium"
			{...props}
		>
			<Input
				width={`calc(${width} - 11px - 18px)`}
				padding="0"
				paddingRight={1}
				fontSize={1}
				fontWeight="Demibold"
				backgroundColor="transparent"
				style={{
                    appearance: 'none',
                    transform: 'scale3d(1, 1, 1)',
                }}
				autoComplete="off"
				value={value}
				onChange={onChange}
				onBlur={handleBlur}
			/>
			<Text
				color="Text Light"
				fontSize="9px"
				fontWeight="Demibold"
				textTransform="uppercase"
			>
				px
			</Text>
		</Label>
	)
}

export { PixelInput }
