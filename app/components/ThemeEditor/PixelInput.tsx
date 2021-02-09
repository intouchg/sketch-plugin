import React from 'react'
import { Label, Input, Text } from '@i/components'

const PixelInput = ({
	value,
	onChange,
	onBlur,
	width = '62px',
	...props
}: React.ComponentProps<typeof Label> & {
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onBlur: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {
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
				autoCorrect="off"
				autoCapitalize="off"
				autoComplete="off"
				spellCheck="false"
				value={value}
				onChange={onChange}
				onBlur={onBlur}
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
