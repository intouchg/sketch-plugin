import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Stack, Box, Text, Button } from '@i/components'
import { NoWrapText } from '../../NoWrapText'
import { DropdownMenu } from '../EditorMenus'

const LetterSpacingItem = ({
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
			<NoWrapText
				width="100%"
				fontWeight={5}
				letterSpacing={value}
				textAlign="left"
			>
				Lorem ipsum dolor sit amet
			</NoWrapText>
		</Button>
	)
}

const LetterSpacingMenu = ({
	id,
	onChange,
}: {
	id: string
	onChange: (id: string) => void
}) => {
	const letterSpacings = useSelector((state) => state.theme.values.letterSpacings)
	const [ show, setShow ] = useState(false)
	const value = !id ? id : letterSpacings.find((c) => c.id === id)!.value

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
					<LetterSpacingItem
						value=""
						onClick={() => onChange('')}
					/>
					{letterSpacings.map((letterSpacing) => (
						<LetterSpacingItem
							key={letterSpacing.id}
							value={letterSpacing.value}
							onClick={() => onChange(letterSpacing.id)}
						/>
                    ))}
				</Stack>
			</DropdownMenu>
		</Box>
	)
}

export { LetterSpacingMenu }
