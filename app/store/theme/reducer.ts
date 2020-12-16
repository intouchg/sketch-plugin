import { enablePatches, produce, applyPatches } from 'immer'
import { createThemeValue } from '@i/theme'
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
	SAVE_THEME_DATA,
} from './actions'
import { initialThemeState } from './state'
import type { ThemeValue, StyleProperty } from '@i/theme'
import type { ThemeActionType } from './actions'
import type { ThemeState } from './state'
import type { SystemFontsDictionary } from '../../sketchApi'

enablePatches()

const findThemeValueByIdError = (id: string) => new Error(`Could not locate ThemeValue with id "${id}"`)

const changeHistory: { [key: number]: any } = {}
let currentVersion = -1
const maxNumberOfVersions = 100

const UNDOABLE_ACTIONS = [
	CREATE_THEME_VALUE,
	UPDATE_THEME_VALUE,
	DELETE_THEME_VALUE,
]

const SAVEABLE_ACTIONS = [
	UNDO,
	REDO,
	SAVE_IMPORTED_SKETCH_VALUES,
	CREATE_THEME_VALUE,
	UPDATE_THEME_VALUE,
	DELETE_THEME_VALUE,
]

/* eslint-disable complexity */
export const themeReducer = (
	state: ThemeState = initialThemeState,
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
				const { values, components, variants } = action.payload

				nextState.values = values
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
				const systemFonts = action.payload
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
					fonts: fonts.map((value) => createThemeValue([], 'font', { name: value, value, family: value })),
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
				const { values } = nextState

				action.payload.forEach((newThemeValue) => {
					if (!newThemeValue.willOverwriteByName) {
						delete newThemeValue.willOverwriteByName
						values.push(newThemeValue)
						return
					}

					const { name } = newThemeValue as (ThemeValue & { name: string })
					const index = values.findIndex((v) => (v as any).name === name)

					if (index === undefined) {
						throw new Error(`Could not locate ThemeValue with name "${name}"`)
					}

					values[index].value = newThemeValue.value
				})

				nextState.importedSketchValues = initialThemeState.importedSketchValues
				break
			}

			case CREATE_THEME_VALUE: {
				const value = createThemeValue(
					nextState.values,
					action.payload.type,
					action.payload,
				)
				nextState.values.push(value)
				break
			}

			case UPDATE_THEME_VALUE: {
				const { values } = nextState
				const { id } = action.payload

				const index = values.findIndex((value) => value.id === id)

				if (index === undefined) {
					throw findThemeValueByIdError(id)
				}

				values[index] = action.payload
				break
			}

			case DELETE_THEME_VALUE: {
				const { values, components, variants } = nextState
				const { id } = action.payload

				const index = values.findIndex((value) => value.id === id)

				if (index === -1) {
					throw findThemeValueByIdError(id)
				}

				values.splice(index, 1)

				// Update any ThemeComponent style which references the deleted ThemeValue
				components.forEach((component) => {
					Object.entries(component.styles).forEach(([ styleProperty, value ]) => {
						if (value === id) {
							component.styles[styleProperty as StyleProperty] = ''
						}
					})
				})

				// Update any ThemeVariant style which references the deleted ThemeValue
				variants.forEach((variant) => {
					Object.entries(variant.styles).forEach(([ styleProperty, value ]) => {
						if (value === id) {
							variant.styles[styleProperty as StyleProperty] = ''
						}
					})
				})

				break
			}

			case SAVE_THEME_DATA: {
				sketchRequest('saveThemeData', {
					values: state.values,
					components: state.components,
					variants: state.variants,
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

		if (SAVEABLE_ACTIONS.includes(action.type)) {
			sketchRequest('saveThemeData', {
				values: nextState.values,
				components: nextState.components,
				variants: nextState.variants,
			})
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
