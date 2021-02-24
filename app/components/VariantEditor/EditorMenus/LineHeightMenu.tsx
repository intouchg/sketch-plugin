import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Stack, Box, Text, Button } from '@i/components'
import { DropdownMenu } from '../EditorMenus'

const LineHeightItem = ({
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
			<Text minWidth="46px">
				{value || 'none'}
			</Text>
			<Text lineHeight={value}>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit.
			</Text>
		</Button>
	)
}

const LineHeightMenu = ({
	id,
	onChange,
}: {
	id: string
	onChange: (id: string) => void
}) => {
	const lineHeights = useSelector((state) => state.theme.values.lineHeights)
	const [ show, setShow ] = useState(false)
	const value = !id ? id : lineHeights.find((c) => c.id === id)!.value

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
					<LineHeightItem
						value=""
						onClick={() => onChange('')}
					/>
					{lineHeights.map((lineHeight) => (
						<LineHeightItem
							key={lineHeight.id}
							value={lineHeight.value}
							onClick={() => onChange(lineHeight.id)}
						/>
                    ))}
				</Stack>
			</DropdownMenu>
		</Box>
	)
}

export { LineHeightMenu }
