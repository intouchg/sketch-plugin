import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Stack, Box, Text, Button } from '@i/components'
import { DropdownMenu } from '../EditorMenus'

const TextTransformItem = ({
	value,
	onClick,
}: {
    value: string
    onClick: () => void
}) => {
	return (
		<Button
			invisible
			flexShrink={0}
			display="flex"
			width="100%"
			alignItems="center"
			justifyContent="center"
			marginY={2}
			textAlign="left"
			onClick={onClick}
		>
			<Text>
				{value || 'none'}
			</Text>
		</Button>
	)
}

const textTransformValues = [ 'capitalize', 'uppercase', 'lowercase' ]

const TextTransformMenu = ({
	value,
	onChange,
}: {
	value: string
	onChange: (value: string) => void
}) => {
	const [ show, setShow ] = useState(false)

	return (
		<Box>
			<Button
				padding={2}
				fontSize={2}
				fontWeight={3}
				color={value ? 'Text' : 'Text Light'}
				backgroundColor="Background"
				borderStyle="none"
				borderRadius={2}
				lineHeight="1"
				textTransform="lowercase"
				onClick={() => setShow((s) => !s)}
			>
				{value === '' ? 'none' : value}
			</Button>
			<DropdownMenu
				show={show}
				setShow={setShow}
			>
				<Stack
					width="120px"
					maxHeight="240px"
					padding={2}
					backgroundColor="Card"
					borderWidth="1px"
					borderStyle="solid"
					borderColor="Accent"
					borderRadius={2}
					boxShadow="0px 8px 16px -6px rgba(0, 0, 0, 10%), 0px 4px 8px -3px rgba(0, 0, 0, 10%)"
					overflow="scroll"
					style={{ transform: 'translateX(-100%)' }}
				>
					<TextTransformItem
						value=""
						onClick={() => onChange('')}
					/>
					{textTransformValues.map((value) => (
						<TextTransformItem
							key={value}
							value={value}
							onClick={() => onChange(value)}
						/>
                    ))}
				</Stack>
			</DropdownMenu>
		</Box>
	)
}

export { TextTransformMenu }
