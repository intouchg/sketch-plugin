import React from 'react'
import { Stack, Text, Box } from '@intouchg/components'
import { titleCase } from '@intouchg/utility'
import type { ThemeVariant } from '@intouchg/theme'

const VariantStyleTable = ({
	variants,
}: {
	variants: ThemeVariant[]
}) => {
	const componentVariants: { [key in ThemeVariant['variantType']]: ThemeVariant[] } = {} as any

	variants.forEach((variant) => {
		const { variantType } = variant

		if (!componentVariants.hasOwnProperty(variantType)) {
			componentVariants[variantType] = [ variant ]
		}
		else {
			componentVariants[variantType].push(variant)
		}
	})

	return (
		<Box
			as="table"
			width="100%"
			marginBottom={6}
			style={{ borderCollapse: 'collapse' }}
		>
			<Box
				as="thead"
				textAlign="left"
			>
				<Box
					as="tr"
					borderBottom="1px solid"
					borderColor="Accent"
				>
					<Box
						as="th"
						padding={3}
						width="130px"
					>
						Component Type
					</Box>
					<Box
						as="th"
						padding={3}
						width="130px"
					>
						Variant Name
					</Box>
					<Box
						as="th"
						padding={3}
						width="220px"
					>
						Variant Styles
					</Box>
				</Box>
			</Box>
			<Box
				as="tbody"
				verticalAlign="top"
			>
				{Object.entries(componentVariants).map(([ variantType, variants ]) => variants.map((variant, index) => (
					<Box
						as="tr"
						key={variant.id}
						borderBottom="1px solid"
						borderColor="Accent"
					>
						{index === 0 && (
							<Box
								as="td"
								padding={3}
								rowSpan={variants.length}
							>
								{titleCase(variantType)}
							</Box>
						)}
						<Box
							as="td"
							padding={3}
						>
							{variant.name}
						</Box>
						<Stack
							as="td"
							padding={3}
						>
							{Object.keys(variant.styles).map((styleProperty) => (
								<Text
									key={styleProperty}
									lineHeight={3}
								>
									{styleProperty}
								</Text>
							))}
						</Stack>
					</Box>
				)))}
			</Box>
		</Box>
	)
}

export { VariantStyleTable }
