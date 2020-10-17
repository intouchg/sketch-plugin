import React from 'react'
import { Flex } from '@i/components'
import { Color } from '../ThemeValues'
import { sortAlphabetical } from '@i/utility'
import type { ThemeColor } from '@i/theme'

const Colors = ({
	values = [],
	importedValues = [],
	selectedImportedValues,
	toggleSelectedImportedValue,
}: {
	values: ThemeColor[]
	importedValues: ThemeColor[]
	selectedImportedValues: ThemeColor[]
	toggleSelectedImportedValue: (color: ThemeColor) => void
}) => {
	return (
		<Flex
			flexWrap="wrap"
			padding={6}
		>
			{values.map(({ id, name, value }) => (
				<Color
					key={id}
					id={id}
					name={name}
					value={value}
				/>
			))}
		</Flex>
	)
}

export { Colors }
