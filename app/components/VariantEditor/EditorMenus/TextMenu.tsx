import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Stack, Box, Text, Button } from '@i/components'
import { DropdownMenu } from '../EditorMenus'

const TextItem = ({
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
			padding={2}
			textAlign="left"
			borderRadius={2}
			sx={{
                '&:hover': {
                    backgroundColor: 'Primary Lighter',
                },
            }}
			onClick={onClick}
		>
			<Text>
				{value || 'none'}
			</Text>
		</Button>
	)
}

const TextMenu = ({
	propertyNames,
	value,
	onChange,
}: {
	propertyNames: string[]
	value: string
	onChange: (value: string) => void
}) => {
	const [ show, setShow ] = useState(false)

	return (
		<Box>
			<Button
				padding={2}
				fontSize={2}
				fontWeight={4}
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
					width="136px"
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
					<TextItem
						value=""
						onClick={() => onChange('')}
					/>
					{propertyNames.map((propertyName) => (
						<TextItem
							key={propertyName}
							value={propertyName}
							onClick={() => onChange(propertyName)}
						/>
                    ))}
				</Stack>
			</DropdownMenu>
		</Box>
	)
}

export { TextMenu }
