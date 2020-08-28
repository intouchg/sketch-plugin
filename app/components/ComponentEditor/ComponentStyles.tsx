import React from 'react'
import { Box, Flex, Text, Input } from '@i/components'
import { getThemePropertyByStyleProperty } from '@i/theme'
import { titleCase } from '@i/utility'
import type { Theme, ThemeComponent, ThemeValue } from '@i/theme'

const Edit = ({
	property,
	// options,
	value,
}: {
	property: string
	// options: any
	value: ThemeValue | undefined
}) => {
	console.log(property)
	console.log(value)
	// console.log(options)

	const preventDefault = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(event)
		event.preventDefault()
	}

	return (
		<Flex
			width="200px"
			padding={2}
			justifyContent="flex-start"
		>
			<Input
				width={30}
				height={30}
				marginRight={2}
				backgroundColor="transparent"
				type="color"
				value={value && value.value as any}
				onChange={preventDefault}
			/>
			<Text paddingRight={2}>
				{titleCase(property)}
			</Text>
		</Flex>
	)
}

const ComponentStyles = ({
	name,
	styles,
	values,
}: {
	name: string
	styles: ThemeComponent['styles']
	values: ThemeValue[]
}) => {
	return (
		<Box
			position="relative"
			top={80}
			padding={2}
		>
			{Object.entries(styles).map(([ property, valueId ]) => (
				<Edit
					key={property}
					property={property}
					// options={themeData[getThemePropertyByStyleProperty(property) as keyof Theme]}
					value={values.find((value) => value.id === valueId)}
				/>
			))}
		</Box>
	)
}

export { ComponentStyles }
