import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Stack, Box, Text, Button } from '@i/components'
import { NoWrapText } from '../../NoWrapText'
import { DropdownMenu } from '../EditorMenus'

const FontFamilyItem = ({
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
			padding={2}
			sx={{
                '&:hover': {
                    backgroundColor: 'Primary Lighter',
                },
            }}
			onClick={onClick}
		>
			<NoWrapText fontFamily={value}>
				{value || 'none'}
			</NoWrapText>
		</Button>
	)
}

const FontFamilyMenu = ({
	id,
	onChange,
}: {
	id: string
	onChange: (id: string) => void
}) => {
	const fonts = useSelector((state) => state.theme.values.fonts)
	const [ show, setShow ] = useState(false)
	const value = !id ? id : fonts.find((c) => c.id === id)!.value

	return (
		<Box>
			<Button
				maxWidth="152px"
				padding={2}
				fontSize={2}
				fontWeight={4}
				color={value ? 'Text' : 'Text Light'}
				backgroundColor="Background"
				borderStyle="none"
				borderRadius={2}
				lineHeight="1"
				textTransform="none"
				overflow="hidden"
				style={{
					textOverflow: 'ellipsis',
					whiteSpace: 'nowrap',
				}}
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
					<FontFamilyItem
						value=""
						onClick={() => onChange('')}
					/>
					{fonts.map((font) => (
						<FontFamilyItem
							key={font.id}
							value={font.value}
							onClick={() => onChange(font.id)}
						/>
                    ))}
				</Stack>
			</DropdownMenu>
		</Box>
	)
}

export { FontFamilyMenu }
