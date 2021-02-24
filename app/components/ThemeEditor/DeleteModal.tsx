import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Stack, Flex, Heading, Text } from '@i/components'
import { Color, BorderWidth, Font, FontSize, LineHeight, LetterSpacing, Radius, Shadow } from '../ThemeValues'
import { ModalBackground } from '../ModalBackground'
import { CloseModalButton } from '../CloseModalButton'
import { deleteThemeValue } from '../../store'
import { sortAlphabetical, titleCase } from '@i/utility'
import type { ThemeValue, ThemeVariant, ThemeStyleObject, StyleProperty } from '@i/theme'

const componentConfig = {
	color: Color,
	space: BorderWidth,
	font: Font,
	fontSize: FontSize,
	lineHeight: LineHeight,
	letterSpacing: LetterSpacing,
	borderWidth: BorderWidth,
	radius: Radius,
	shadow: Shadow,
}

const DeleteModal = ({
	deleteValue,
	setDeleteValue,
}: {
	deleteValue: ThemeValue
	setDeleteValue: React.Dispatch<React.SetStateAction<ThemeValue | null>>
}) => {
	const dispatch = useDispatch()
	const variants = useSelector((state) => state.theme.variants)
	const id = deleteValue.id
	const Component = (componentConfig as any)[deleteValue.type]

	let usageCount = 0
	const filteredVariants: ThemeVariant[] = []

	variants.forEach((variant) => {
		const styles: { [key: string]: string | string[] | ThemeStyleObject } = {}

		Object.entries(variant.styles).forEach(([ styleProperty, styleValue ]) => {
			if (styleValue === id || (Array.isArray(styleValue) && styleValue.includes(id))) {
				++usageCount
				styles[styleProperty] = styleValue
			}
			else if (typeof styleValue === 'object') {
				styles[styleProperty] = {}

				Object.entries(styleValue).forEach(([ styleProp, styleVal ]) => {
					if (styleVal === id || (Array.isArray(styleVal) && styleVal.includes(id))) {
						++usageCount;
						(styles[styleProperty] as ThemeStyleObject)[styleProp as StyleProperty] = styleVal
					}
				})
			}
		})

		if (Object.values(styles).length) {
			filteredVariants.push({ ...variant, styles })
		}
	})

	const sortedFilteredVariants = filteredVariants.slice().sort((a, b) => sortAlphabetical(a, b, 'variantType'))

	const confirmDelete = () => dispatch(deleteThemeValue(deleteValue))

	return (
		<ModalBackground>
			<Stack
				width="calc(100vw - 308px)"
				minWidth="800px"
				height="calc(100vh - 100px)"
				minHeight="500px"
				backgroundColor="Card"
				boxShadow="Downward Accent"
				borderRadius={3}
				overflow="hidden"
			>
				<Flex
					width="100%"
					height="48px"
					alignItems="center"
					justifyContent="space-between"
					flexShrink={0}
					boxShadow="Inset X Accent"
				>
					<Heading paddingX={3}>
						Delete confirmation
					</Heading>
					<CloseModalButton
						position="relative"
						width="16px"
						padding={2}
						marginRight={2}
						onClick={() => setDeleteValue(null)}
					/>
				</Flex>
				<Stack
					flexGrow={1}
					alignItems="center"
				>
					<Text>
						Warning! Deleting a theme value is a dangerous operation.
						You must inform developers of this deletion.
					</Text>
					<Flex
						width={deleteValue.type === 'color' ? '140px' : '600px'}
						height={deleteValue.type === 'color' ? '140px' : 'auto'}
					>
						<Component {...deleteValue} />
					</Flex>
					<Text>
						This value is used {usageCount} times:
					</Text>
					<Stack>
						{sortedFilteredVariants.map((variant) => Object.entries(variant.styles).map(([ styleProperty, styleValue ]) => (
							<Flex key={styleProperty}>
								<Text />
							</Flex>
						)))}
					</Stack>
				</Stack>
			</Stack>
		</ModalBackground>
	)
}

export { DeleteModal }
