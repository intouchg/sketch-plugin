import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Flex, Stack, Box, Text, Button } from '@i/components'
import { DropdownMenu } from '../EditorMenus'
import type { ThemeVariant } from '@i/theme'

const BorderWidthItem = ({
	value,
	onClick,
}: {
    value: string
    onClick: () => void
}) => {
	return (
		<Flex
			flexShrink={0}
			width="100%"
			alignItems="center"
			justifyContent="center"
			marginY={2}
			onClick={onClick}
		>
			<Text minWidth="46px">
				{value || 'none'}
			</Text>
			<Box
				flexGrow={1}
				height={value || 0}
				backgroundColor="Text"
			/>
		</Flex>
	)
}

const BorderWidthMenu = ({
	id,
	onChange,
}: {
	id: string
	onChange: (id: string | null) => void
}) => {
	const borderWidths = useSelector((state) => state.theme.values.borderWidths)
	const [ show, setShow ] = useState(false)
	const value = !id || id === '0px' ? id : borderWidths.find((c) => c.id === id)!.value

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
					width="208px"
					maxHeight="240px"
					padding={2}
					backgroundColor="Card"
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
