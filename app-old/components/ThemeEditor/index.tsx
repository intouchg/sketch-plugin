import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { themeTypePropertyMap } from '@i/theme'
import { Box } from '@i/components'
import { LeftNavigation } from '../LeftNavigation'
import { Colors } from './Colors'
import { Borders } from './Borders'
import { Typography } from './Typography'
import { Sizes } from './Sizes'
import { Radii } from './Radii'
import { Shadows } from './Shadows'
import { Space } from './Space'
import { topNavHeight } from '../TopNavigation'
import type { ThemeValue, ThemeGroup } from '@i/theme'

export const themeEditorLeftNavWidth = '160px'

const ThemeEditor = ({
	values,
	groups,
}: {
	values: ThemeValue[]
	groups: ThemeGroup[]
}) => {
	const themeValues = {} as any
	const themeGroups = {} as any

	values.forEach((value) => {
		const key = themeTypePropertyMap[value.type]

		if (!themeValues[key]) {
			themeValues[key] = []
		}

		themeValues[key].push(value)
	})

	groups.forEach((group) => {
		const key = themeTypePropertyMap[group.groupType]

		if (!themeGroups[key]) {
			themeGroups[key] = []
		}

		themeGroups[key].push(group)
	})

	return (
		<>
			<LeftNavigation
				items={[
                    [ 'Colors', '/theme/colors' ],
                    [ 'Typography', '/theme/typography' ],
                    [ 'Sizes', '/theme/sizes' ],
                    [ 'Radii', '/theme/radii' ],
                    [ 'Borders', '/theme/borders' ],
                    [ 'Shadows', '/theme/shadows' ],
                ]}
				width={themeEditorLeftNavWidth}
			/>
			<Box
				position="relative"
				top={topNavHeight}
				left={themeEditorLeftNavWidth}
				width={`calc(100vw - ${themeEditorLeftNavWidth})`}
				height="100%"
				padding={4}
			>
				<Switch>
					<Route path="/theme/colors">
						<Colors
							colors={themeValues.colors || []}
							groups={themeGroups.colors || []}
						/>
					</Route>
					{/* <Route path="/theme/typography">
						<Typography
							fonts={themeValues.fonts}
							fontSizes={themeValues.fontSizes}
							fontWeights={themeValues.fontWeights}
							lineHeights={themeValues.lineHeights}
							letterSpacings={themeValues.letterSpacings}
						/>
					</Route>
					<Route path="/theme/space">
						<Space space={themeValues.space} />
					</Route>
					<Route path="/theme/sizes">
						<Sizes sizes={themeValues.sizes} />
					</Route>
					<Route path="/theme/borders">
						<Borders
							borders={themeValues.borders}
							borderWidths={themeValues.borderWidths}
							borderStyles={themeValues.borderStyles}
						/>
					</Route>
					<Route path="/theme/radii">
						<Radii radii={themeValues.radii} />
					</Route>
					<Route path="/theme/shadows">
						<Shadows shadows={themeValues.shadows} />
					</Route> */}
				</Switch>
			</Box>
		</>
	)
}

export { ThemeEditor }
