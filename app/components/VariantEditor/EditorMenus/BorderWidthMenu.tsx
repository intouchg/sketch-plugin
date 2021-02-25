import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Stack, Box, Text, Button } from '@i/components'
import { DropdownMenu } from '../EditorMenus'

const BorderWidthItem = ({
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
			<Text
				minWidth="46px"
				fontWeight={4}
			>
				{value || 'none'}
			</Text>
			<Box
				flexGrow={1}
				height={value || 0}
				backgroundColor="Text"
			/>
		</Button>
	)
}

const BorderWidthMenu = ({
	id,
	onChange,
}: {
	id: string
	onChange: (id: string) => void
}) => {
	const borderWidths = useSelector((state) => state.theme.values.borderWidths)
	const [ show, setShow ] = useState(false)
	const value = !id || id === '0px' ? id : borderWidths.find((c) => c.id === id)!.value

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
					width="260px"
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
					<BorderWidthItem
						value=""
						onClick={() => onChange('')}
					/>
					<BorderWidthItem
						value="0px"
						onClick={() => onChange('0px')}
					/>
					{borderWidths.map((borderWidth) => (
						<BorderWidthItem
							key={borderWidth.id}
							value={borderWidth.value}
							onClick={() => onChange(borderWidth.id)}
						/>
                    ))}
				</Stack>
			</DropdownMenu>
		</Box>
	)
}

export { BorderWidthMenu }
