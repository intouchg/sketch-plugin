import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Flex, Stack, Text, Box } from '@i/components'
import { Icon } from '../../Icon'
import { DropdownMenu } from './DropdownMenu'
import { ResponsiveValueMenu } from './ResponsiveValueMenu'
import type { ThemeFontSize } from '@i/theme'

const FontSize = ({
	value,
	onClick,
}: {
    value: string | null
    onClick: () => void
}) => (
	<Stack onClick={onClick}>
		<Text
			fontSize={value ? value : '0'}
			color={value ? 'Text' : 'transparent'}
		>
			a
		</Text>
		<Flex
			width="24px"
			height="24px"
			alignItems="center"
			justifyContent="center"
			backgroundColor="Background"
			borderRadius={2}
		>
			{!value ? (
				<Icon
					width="16px"
					icon="Close"
					fill="Accent"
				/>
            ) : (
                Number((value).split('rem')[0]) * 16
            )}
		</Flex>
	</Stack>
)

const parseFontSizeForDisplay = (value: ThemeFontSize) =>
	String(Number((value.value || '1rem').split('rem')[0]) * 16)

const FontSizeMenu = ({
	values,
	onChange,
}: {
    values: (ThemeFontSize | { id: string, value: undefined, inherited: boolean })[]
	onChange: (id: string | null) => void
}) => {
	const fontSizes = useSelector((state) => state.theme.values.fontSizes)
	const [ show, setShow ] = useState(false)

	return (
		<Box>
			<ResponsiveValueMenu
				values={values}
				parseValueForDisplay={parseFontSizeForDisplay}
			/>
			<DropdownMenu
				show={show}
				setShow={setShow}
			>
				<Flex
					width="380px"
					maxHeight="120px"
					flexWrap="wrap"
					padding={2}
					backgroundColor="Card"
					borderRadius={2}
					boxShadow="0px 8px 16px -6px rgba(0, 0, 0, 10%), 0px 4px 8px -3px rgba(0, 0, 0, 10%)"
					overflow="scroll"
					style={{ transform: 'translateX(-100%)' }}
				>
					<FontSize
						value={null}
						onClick={() => onChange(null)}
					/>
					{fontSizes.map((fontSize) => (
						<FontSize
							key={fontSize.id}
							value={fontSize.value}
							onClick={() => onChange(fontSize.id)}
						/>
                    ))}
				</Flex>
			</DropdownMenu>
		</Box>
	)
}

export { FontSizeMenu }
