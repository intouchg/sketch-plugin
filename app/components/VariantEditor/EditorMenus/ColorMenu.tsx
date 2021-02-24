import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Flex, Box, Button } from '@i/components'
import { Icon } from '../../Icon'
import { DropdownMenu } from './DropdownMenu'

const ColorSwatch = ({
	value,
	onClick,
}: {
	value: string | null
	onClick: () => void
}) => (
	<Button
		display="flex"
		flexShrink={0}
		width="24px"
		height="24px"
		alignItems="center"
		justifyContent="center"
		padding="0"
		margin="2px"
		backgroundColor={value ? value : 'Accent'}
		borderWidth="1px"
		borderStyle="solid"
		borderColor="rgba(0, 0, 0, 10%)"
		borderRadius={2}
		style={{ cursor: 'pointer' }}
		onClick={onClick}
	>
		{!value && (
			<Icon
				icon="Close"
				fill="Text Light"
				width="16px"
			/>
		)}
	</Button>
)

const ColorMenu = ({
	id,
	onChange,
}: {
	id: string | null
	onChange: (id: string | null) => void
}) => {
	const colors = useSelector((state) => state.theme.values.colors)
	const [ show, setShow ] = useState(false)
	const value = !id ? null : colors.find((c) => c.id === id)!.value

	return (
		<Box>
			<ColorSwatch
				value={value || null}
				onClick={() => setShow((s) => !s)}
			/>
			<DropdownMenu
				show={show}
				setShow={setShow}
			>
				<Flex
					width="184px"
					maxHeight="108px"
					flexWrap="wrap"
					padding={2}
					backgroundColor="Card"
					borderRadius={2}
					boxShadow="0px 8px 16px -6px rgba(0, 0, 0, 10%), 0px 4px 8px -3px rgba(0, 0, 0, 10%)"
					overflow="scroll"
					style={{ transform: 'translateX(-100%)' }}
				>
					<ColorSwatch
						value={null}
						onClick={() => onChange(null)}
					/>
					{colors.map((color) => (
						<ColorSwatch
							key={color.id}
							value={color.value}
							onClick={() => onChange(color.id)}
						/>
					))}
				</Flex>
			</DropdownMenu>
		</Box>
	)
}

export { ColorMenu }
