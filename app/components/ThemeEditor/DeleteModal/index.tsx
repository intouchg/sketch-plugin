import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Stack, Flex, Heading, Text, Button, Box } from '@i/components'
import { Color, BorderWidth, Font, FontSize, LineHeight, LetterSpacing, Radius, Shadow } from '../../ThemeValues'
import { ModalBackground } from '../../ModalBackground'
import { CloseModalButton } from '../../CloseModalButton'
import { deleteThemeValue } from '../../../store'
import { sortAlphabetical, titleCase } from '@i/utility'
import { Icon } from '../../Icon'
import { VariantStyleTable } from './VariantStyleTable'
import type { ThemeValue, ThemeVariant, ThemeStyleObject, StyleProperty } from '@i/theme'

const componentConfig = {
	color: Color,
	space: BorderWidth,
	font: (props: any) => (
		<Font
			_name={props.value}
			style={props.value}
			{...props}
		/>
	),
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

	const confirmDelete = () => {
		dispatch(deleteThemeValue(deleteValue))
		setDeleteValue(null)
	}

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
				<Box overflow="scroll">
					<Stack
						flexGrow={1}
						alignItems="center"
						padding={6}
						flexShrink={0}
					>
						<Icon
							icon="Warning"
							width="100px"
							fill="Critical"
						/>
						<Heading
							variant="Secondary"
							paddingTop={3}
							paddingBottom={4}
							lineHeight="2.5rem"
							textAlign="center"
						>
							Warning!<br />
							You must inform developers before deleting this value.
						</Heading>
						<Text
							fontSize="1.5rem"
							lineHeight={4}
							textAlign="center"
							paddingBottom={6}
						>
							Deleting a theme value is a dangerous operation.<br />
							Developers might be using this value, even if you&apos;re not.
						</Text>
						<Stack paddingBottom={4}>
							<Flex>
								<Text
									fontSize="1.5rem"
									lineHeight={4}
								>
									Type:&nbsp;
								</Text>
								<Text
									fontSize="1.5rem"
									lineHeight={4}
								>
									{titleCase(deleteValue.type)}
								</Text>
							</Flex>
							{deleteValue.hasOwnProperty('name') && (
								<Flex>
									<Text
										fontSize="1.5rem"
										lineHeight={4}
									>
										Name:&nbsp;
									</Text>
									<Text
										fontSize="1.5rem"
										lineHeight={4}
									>
										{(deleteValue as any).name}
									</Text>
								</Flex>
							)}
							<Flex>
								<Text
									fontSize="1.5rem"
									lineHeight={4}
								>
									Value:&nbsp;
								</Text>
								<Text
									fontSize="1.5rem"
									lineHeight={4}
								>
									{deleteValue.value.includes('rem') ? `${Number(deleteValue.value.split('rem')[0]) * 16}px` : deleteValue.value}
								</Text>
							</Flex>
						</Stack>
						<Stack
							width="90%"
							alignItems="center"
							justifyContent="center"
							padding={6}
							marginX="auto"
							marginBottom={6}
							backgroundColor="Background"
							border="1px solid"
							borderColor="Accent"
							borderRadius={3}
						>
							<Flex
								alignItems="center"
								justifyContent="center"
								width={deleteValue.type === 'color' ? '140px' : '600px'}
								height={deleteValue.type === 'color' ? '140px' : 'auto'}
							>
								<Component {...deleteValue} />
							</Flex>
						</Stack>
						<Text
							fontSize="1.5rem"
							textAlign="center"
							marginBottom={6}
						>
							This value is used {usageCount} times.
						</Text>
						{usageCount > 0 && (
							<VariantStyleTable variants={sortedFilteredVariants} />
						)}
						<Button
							backgroundColor="Critical"
							borderColor="Critical"
							onClick={confirmDelete}
						>
							Delete
						</Button>
					</Stack>
				</Box>
			</Stack>
		</ModalBackground>
	)
}

export { DeleteModal }
