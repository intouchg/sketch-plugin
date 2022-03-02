import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Flex, Box, Button } from '@intouchg/components'
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
		backgroundColor={value ? value : 'Card'}
		{...(value === 'transparent' ? {
			backgroundSize: '22px 22px',
			backgroundPosition: '0 0, 0 11px, 11px -11px, -11px 0',
			backgroundImage: `
				linear-gradient(45deg, #dddddd 25%, transparent 25%),
				linear-gradient(-45deg, #dddddd 25%, transparent 25%),
				linear-gradient(45deg, transparent 75%, #dddddd 75%),
				linear-gradient(-45deg, transparent 75%, #dddddd 75%)
			`,
		} : {})}
		borderWidth="1px"
		borderStyle="solid"
		borderColor={value === 'transparent' ? '#dddddd' : 'rgba(0, 0, 0, 10%)'}
		borderRadius={2}
		style={{ cursor: 'pointer' }}
		onClick={onClick}
		{...props}
	>
		{!value && (
			<Icon
				icon="CloseIcon"
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
	const value = !id || id === 'transparent' ? id : colors.find((c) => c.id === id)!.value

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
					width="270px"
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
					<ColorSwatch
						margin="2px"
						value="transparent"
						onClick={() => onChange('transparent')}
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
