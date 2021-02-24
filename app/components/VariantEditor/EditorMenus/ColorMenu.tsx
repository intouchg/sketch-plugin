import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Flex, Box, Button } from '@i/components'
import { Icon } from '../../Icon'
import { DropdownMenu } from './DropdownMenu'

const ColorSwatch = ({
	value,
	onClick,
	...props
}: React.ComponentProps<typeof Button> & {
	value: string
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
		backgroundColor={value ? value : 'Accent'}
		borderWidth="1px"
		borderStyle="solid"
		borderColor="rgba(0, 0, 0, 10%)"
		borderRadius={2}
		style={{ cursor: 'pointer' }}
		onClick={onClick}
		{...props}
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
	id: string
	onChange: (id: string) => void
}) => {
	const colors = useSelector((state) => state.theme.values.colors)
	const [ show, setShow ] = useState(false)
	const value = !id ? id : colors.find((c) => c.id === id)!.value

	return (
		<Box>
			<ColorSwatch
				value={value || ''}
				onClick={() => setShow((s) => !s)}
			/>
			<DropdownMenu
				show={show}
				setShow={setShow}
			>
				<Flex
					width="260px"
					maxHeight="108px"
					flexWrap="wrap"
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
					<ColorSwatch
						margin="2px"
						value=""
						onClick={() => onChange('')}
					/>
					{colors.map((color) => (
						<ColorSwatch
							key={color.id}
							margin="2px"
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
