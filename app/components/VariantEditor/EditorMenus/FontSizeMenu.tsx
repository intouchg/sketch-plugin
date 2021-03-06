import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Flex, Stack, Text, Box } from '@intouchg/components'
import { Icon } from '../../Icon'
import { DropdownMenu } from './DropdownMenu'
import { ResponsiveValueMenu } from './ResponsiveValueMenu'
import { updateThemeVariant } from '../../../store'
import { createUuid } from '@intouchg/utility'
import type { ThemeFontSize, ThemeVariant, ThemeValue, ThemeBreakpoint } from '@intouchg/theme'

const FontSize = ({
	value,
	onClick,
}: {
    value?: string
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
					icon="CloseIcon"
					fill="Accent"
				/>
            ) : (
                Number((value).split('rem')[0]) * 16
            )}
		</Flex>
	</Stack>
)

const getResponsiveValues = (
	variantStyleValue: string | string[] | undefined,
	breakpoints: ThemeBreakpoint[],
	themeValues: ThemeValue[],
) => {
	const responsiveValues: any[] = []

	new Array(breakpoints.length + 1).fill(1).forEach((_, index) => {
		if (index === 0 && typeof variantStyleValue === 'string' && variantStyleValue !== '') {
			responsiveValues.push(themeValues.find((v) => v.id === variantStyleValue)!)
		}
		else if (typeof variantStyleValue === 'object') {
			responsiveValues.push(themeValues.find((v) => v.id === variantStyleValue[index])!)
		}
		else {
			responsiveValues.push({
				id: createUuid(),
				value: responsiveValues[index - 1].value,
				inherited: true,
			})
		}
	})

	return responsiveValues
}

const parseFontSizeForDisplay = (value: ThemeFontSize) =>
	String(Number((value.value || '1rem').split('rem')[0]) * 16)

const FontSizeMenu = ({
	variant,
}: {
	variant: ThemeVariant
}) => {
	const dispatch = useDispatch()
	const values = useSelector((state) => state.theme.values)
	const fontSizeValues = getResponsiveValues(variant.styles.fontSize, values.breakpoints, values.fontSizes)
	const [ show, setShow ] = useState(false)

	const updateFontSize = (id?: string) => {
		console.log('update')
	}

	return (
		<Box>
			<ResponsiveValueMenu
				values={fontSizeValues}
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
					borderWidth="1px"
					borderStyle="solid"
					borderColor="Accent"
					borderRadius={2}
					boxShadow="0px 8px 16px -6px rgba(0, 0, 0, 10%), 0px 4px 8px -3px rgba(0, 0, 0, 10%)"
					overflow="scroll"
					style={{ transform: 'translateX(-100%)' }}
				>
					<FontSize
						value={undefined}
						onClick={() => updateFontSize(undefined)}
					/>
					{values.fontSizes.map((fontSize) => (
						<FontSize
							key={fontSize.id}
							value={fontSize.value}
							onClick={() => updateFontSize(fontSize.id)}
						/>
                    ))}
				</Flex>
			</DropdownMenu>
		</Box>
	)
}

export { FontSizeMenu }
