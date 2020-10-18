import { enablePatches, produce, applyPatches } from 'immer'
import { createThemeValue, createThemeGroup } from '@i/theme'
import { sortAlphabetical } from '@i/utility'
import { sketchRequest } from '../../sketchApi'
import {
	UNDO,
	REDO,
	SET_THEME_DATA,
	SET_RECENT_PROJECTS,
	SET_SKETCH_DOCUMENT_NAMES,
	SET_IMPORTED_SKETCH_VALUES,
	SAVE_IMPORTED_SKETCH_VALUES,
	SET_SYSTEM_FONTS,
	CREATE_THEME_VALUE,
	UPDATE_THEME_VALUE,
	DELETE_THEME_VALUE,
	CREATE_THEME_GROUP,
	UPDATE_THEME_GROUP,
	DELETE_THEME_GROUP,
	SET_SELECTED_COLOR,
	SET_DELETING_VALUE,
	SET_SELECTED_COMPONENT,
	SAVE_THEME_DATA,
} from './actions'
import { initialState } from './state'
import type { StyleProperty, ThemeColor } from '@i/theme'
import type { ThemeActionType } from './actions'
import type { ThemeState } from './state'
import type { SystemFontsDictionary } from '../../sketchApi'

enablePatches()

const findThemeValueError = (id: string) => new Error(`Could not locate ThemeValue with id "${id}"`)

const findThemeGroupError = (id: string) => new Error(`Could not locate ThemeGroup with id "${id}"`)

const changeHistory: { [key: number]: any } = {}
let currentVersion = -1
const maxNumberOfVersions = 100

const UNDOABLE_ACTIONS = [
	CREATE_THEME_VALUE,
	UPDATE_THEME_VALUE,
	DELETE_THEME_VALUE,
	CREATE_THEME_GROUP,
	UPDATE_THEME_GROUP,
	DELETE_THEME_GROUP,
]

/* eslint-disable complexity */
export const themeReducer = (
	state: ThemeState = initialState,
	action: ThemeActionType,
): ThemeState => {
	return produce(state, (nextState) => {
		switch (action.type) {
			case UNDO: {
				return produce(
					applyPatches(state, changeHistory[currentVersion--].undo),
					(nextState: ThemeState) => {
						nextState.canUndo = changeHistory.hasOwnProperty(currentVersion)
						nextState.canRedo = true
					},
				) as any
			}

			case REDO: {
				return produce(
					applyPatches(state, changeHistory[++currentVersion].redo),
					(nextState: ThemeState) => {
						nextState.canUndo = true
						nextState.canRedo = changeHistory.hasOwnProperty(currentVersion + 1)
					},
				) as any
			}

			case SET_THEME_DATA: {
				const { values, groups, components, variants } = action.payload

				nextState.values = values
				nextState.groups = groups
				nextState.components = components
				nextState.variants = variants
				break
			}

			case SET_RECENT_PROJECTS: {
				nextState.recentProjects = action.payload
				break
			}

			case SET_SKETCH_DOCUMENT_NAMES: {
				nextState.sketchDocumentNames = action.payload
				break
			}

			case SET_SYSTEM_FONTS: {
				const systemFonts = action.payload.SPFontsDataType
				const systemFontsDictionary: SystemFontsDictionary = {}

				systemFonts.slice().sort((a, b) => sortAlphabetical(a, b, '_name')).forEach((systemFont) => {
					const { typefaces } = systemFont

					if (!typefaces) {
						return
					}

					typefaces.forEach((typeface) => {
						const fontFamily = typeface.family

						if (systemFontsDictionary[fontFamily]) {
							systemFontsDictionary[fontFamily].typefaces.push(typeface)
						}
						else {
							systemFontsDictionary[fontFamily] = {
								name: fontFamily,
								path: systemFont.path,
								typefaces: [ typeface ],
							}
						}
					})
				})

				nextState.systemFonts = systemFontsDictionary
				break
			}

			case SET_IMPORTED_SKETCH_VALUES: {
				const { colors, fonts, fontSizes, fontWeights, lineHeights, letterSpacings, borderWidths, shadows } = action.payload

				nextState.importedSketchValues = {
					colors: colors.map(([ name, value ]) => createThemeValue([], 'color', { name, value })),
					fonts: fonts.map((value) => createThemeValue([], 'font', { value })),
					fontSizes: fontSizes.map((value) => createThemeValue([], 'fontSize', { value })),
					fontWeights: fontWeights.map((value) => createThemeValue([], 'fontWeight', { value })),
					lineHeights: lineHeights.map((value) => createThemeValue([], 'lineHeight', { value })),
					letterSpacings: letterSpacings.map((value) => createThemeValue([], 'letterSpacing', { value })),
					borderWidths: borderWidths.map((value) => createThemeValue([], 'borderWidth', { value })),
					shadows: shadows.map((value) => createThemeValue([], 'shadow', { value })),
				}

				break
			}

			case SAVE_IMPORTED_SKETCH_VALUES: {
				nextState.values.concat(action.payload)
				nextState.importedSketchValues = initialState.importedSketchValues
				break
			}

			case CREATE_THEME_VALUE: {
				const value = createThemeValue(
					nextState.values,
					action.payload.type,
					action.payload,
				)
				nextState.values.push(value)

				if (value.hasOwnProperty('groups')) {
					(value as any).groups.forEach((id: string) => {
						const group = nextState.groups.find((group) => group.id === id)

						if (group) {
							group.members.push(value.id)
						}
					})
				}

				if (value.type === 'color') {
					nextState.selectedColor = value
				}

				break
			}

			case UPDATE_THEME_VALUE: {
				const { values, selectedColor } = nextState
				const { id } = action.payload

				const index = values.findIndex((value) => value.id === id)

				if (index === undefined) {
					throw findThemeValueError(id)
				}

				values[index] = action.payload

				if (id === selectedColor.id) {
					selectedColor.value = action.payload.value as string
				}

				break
			}

			case DELETE_THEME_VALUE: {
				const { values, groups, components } = nextState
				const { id } = action.payload

				const index = values.findIndex((value) => value.id === id)

				if (index === -1) {
					throw findThemeValueError(id)
				}

				values.splice(index, 1)

				// Update any ThemeGroup which references the deleted ThemeValue
				groups.forEach((group) => {
					const index = group.members.indexOf(id)

					if (index !== -1) {
						group.members.splice(index, 1)
					}
				})

				// Update any ThemeComponent style which references the deleted ThemeValue
				components.forEach((component) => {
					Object.entries(component.styles).forEach(([ styleProperty, value ]) => {
						if (value === id) {
							component.styles[styleProperty as StyleProperty] = ''
						}
					})
				})

				if (nextState.selectedColor.id === id) {
					nextState.selectedColor = initialState.selectedColor
				}

				if (nextState.deletingValue.id === id) {
					nextState.deletingValue = initialState.deletingValue
				}

				break
			}

			case CREATE_THEME_GROUP: {
				const group = createThemeGroup(
					nextState.groups,
					action.payload.groupType,
					action.payload,
				)

				nextState.groups.push(group)

				break
			}

			case UPDATE_THEME_GROUP: {
				const { groups } = nextState
				const { id } = action.payload

				const index = groups.findIndex((group) => group.id === id)

				if (index === undefined) {
					throw findThemeGroupError(id)
				}

				groups[index] = action.payload

				break
			}

			case DELETE_THEME_GROUP: {
				const { values, groups } = nextState
				const { id } = action.payload

				const index = groups.findIndex((group) => group.id === id)

				if (index === -1) {
					throw findThemeGroupError(id)
				}

				// Update any ThemeValue which references the deleted ThemeGroup
				groups[index].members.forEach((valueId) => {
					const value = values.find((value) => value.id === valueId)!

					if (value && value.hasOwnProperty('groups')) {
						const groupIndex = (value as any).groups.indexOf(id)

						if (groupIndex !== -1) {
							(value as any).groups.splice(groupIndex, 1)
						}
					}
				})

				groups.splice(index, 1)

				break
			}

			case SET_SELECTED_COLOR: {
				const { id, value } = action.payload

				if (id === '') {
					nextState.selectedColor = initialState.selectedColor
				}
				else {
					const color = state.values.find((color) => color.id === id) as ThemeColor

					nextState.selectedColor = {
						...color,
						value,
					}
				}

				break
			}

			case SET_DELETING_VALUE: {
				nextState.deletingValue = action.payload
				break
			}

			case SET_SELECTED_COMPONENT: {
				nextState.selectedComponent = action.payload
				break
			}

			case SAVE_THEME_DATA: {
				sketchRequest('saveThemeData', {
					values: state.values,
					groups: state.groups,
					components: state.components,
				})

				break
			}

			default: {
				break
			}
		}

		if (UNDOABLE_ACTIONS.includes(action.type)) {
			nextState.canUndo = true
			nextState.canRedo = false
		}
	}, (patches, inversePatches) => {
		if (UNDOABLE_ACTIONS.includes(action.type)) {
			currentVersion++

			changeHistory[currentVersion] = {
				redo: patches,
				undo: inversePatches,
			}

			delete changeHistory[currentVersion + 1]
			delete changeHistory[currentVersion - maxNumberOfVersions]
		}
	})
}
/* eslint-disable complexity */
