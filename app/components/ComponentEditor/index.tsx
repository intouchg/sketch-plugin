import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { themeTypePropertyMap } from '@i/theme'
import { Flex, Box, Button, Text, Heading, Link, Icon, Input } from '@i/components'
import { titleCase, camelCase } from '@i/utility'
import { LeftNavigation } from '../LeftNavigation'
import { ComponentView } from './ComponentView'
import { ComponentStyles } from './ComponentStyles'
import { topNavHeight } from '../TopNavigation'
import type { Theme, ThemeValue, ThemeGroup } from '@i/theme'

export const componentEditorLeftNavWidth = '180px'

export const componentEditorRightNavWidth = '240px'

// TO DO: abstract this into the @i/components module
const componentList = {
	button: Button,
	heading: Heading,
	text: Text,
	link: Link,
	icon: Icon,
} as const

// TO DO: after abstracting componentList into @i/components,
// update LeftNavigation and Routes to be derived from that abstraction
const ComponentEditor = ({
	theme,
}: {
	theme: Theme | undefined
}) => {
	// TO DO: Update this so that it renders every component
	// in the component library. Currently it only renders
	// components that have styles data in the theme components
	// file, i.e. src/theme/components.json
	const { components, values } = useSelector((state) => state.theme)
	const [ componentSearchString, setComponentSearchString ] = useState('')

	if (!theme) {
		return null
	}

	const searchComponents = (event: React.ChangeEvent<HTMLInputElement>) => setComponentSearchString(event.target.value)

	const filteredComponents = components.filter(({ name }) => {
		return name.toLowerCase().includes(componentSearchString.toLowerCase().replace(/\s/g, ''))
	})

	return (
		<>
			<Box
				position="relative"
				top={topNavHeight}
				left={componentEditorLeftNavWidth}
				width={`calc(100vw - (${componentEditorLeftNavWidth} + ${componentEditorRightNavWidth}))`}
				height="100%"
				padding={4}
			>
				<Switch>
					{components.map(({ id, name, styles }) => (
						<Route
							key={id}
							path={`/components/${camelCase(name)}`}
						>
							<ComponentView
								name={name}
								theme={theme}
							/>
							<Box
								position="fixed"
								width={componentEditorRightNavWidth}
								height="100%"
								top={0}
								right={0}
								backgroundColor="grey.1"
								boxShadow="small"
							>
								<ComponentStyles
									name={name}
									styles={styles}
									values={values}
								/>
							</Box>
						</Route>
					))}
				</Switch>
				<LeftNavigation
					items={filteredComponents.map(({ name }) => ([
						titleCase(name),
						'/components/' + camelCase(name),
					]))}
					width={componentEditorLeftNavWidth}
				/>
				<Input
					position="fixed"
					width={`calc(${componentEditorLeftNavWidth} - 2em)`}
					top={topNavHeight}
					left="1em"
					padding={2}
					marginTop={4}
					border="1px solid"
					borderColor="grey.3"
					borderRadius="small"
					type="text"
					placeholder="Search"
					value={componentSearchString}
					onChange={searchComponents}
				/>
			</Box>
		</>
	)
}

export { ComponentEditor }
