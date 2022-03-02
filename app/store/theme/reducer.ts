import { enablePatches, produce, applyPatches } from 'immer'
import { createThemeValue, createThemeVariant, ThemeSelectorObject, ThemeStyleObject, themeTypePropertyMap } from '@intouchg/theme'
import { sortAlphabetical } from '@intouchg/utility'
import {
	UNDO,
	REDO,
	SET_THEME_DATA,
	SET_IMPORTED_SKETCH_VALUES,
	SAVE_IMPORTED_SKETCH_VALUES,
	RESET_THEME_STATE,
	CREATE_THEME_VALUE,
	UPDATE_THEME_VALUE,
	DELETE_THEME_VALUE,
	CREATE_THEME_VARIANT,
	UPDATE_THEME_VARIANT,
	DELETE_THEME_VARIANT,
	SET_RECENT_PROJECTS,
	SET_SKETCH_DOCUMENT_NAMES,
	SET_SYSTEM_FONTS,
} from './actions'
import { initialThemeState } from './state'
import type { ThemeValue, StyleProperty } from '@intouchg/theme'
import type { ThemeActionType } from './actions'
import type { ThemeState } from './state'
import type { SystemFontsDictionary } from '../../sketchApi'

enablePatches()

const findThemeValueByIdError = (id: string) => new Error(`Could not locate ThemeValue with id "${id}"`)

const findThemeVariantByIdError = (id: string) => new Error(`Could not locate ThemeVariant with id "${id}"`)

const deleteValueFromVariantStyles = (
	id: string,
	styleObject: ThemeStyleObject & ThemeSelectorObject,
) => {
	Object.entries(styleObject).forEach(([ styleProperty, styleValue ]) => {
		if (styleValue === id) {
			styleObject[styleProperty as StyleProperty] = ''
		}
		else if (Array.isArray(styleValue) && styleValue.includes(id)) {
			for (let i = 0; i < styleValue.length; i++) {
				if (styleValue[i] === id) {
					styleValue[i] = ''
				}
			}

			if (styleValue.every((v) => v === '')) {
				styleObject[styleProperty as StyleProperty] = ''
			}
		}
		else if (typeof styleValue === 'object') {
			deleteValueFromVariantStyles(id, styleValue as ThemeStyleObject)
		}
	})
}

const changeHistory: { [key: string]: any } = {}
let currentVersion = -1
const maxNumberOfVersions = 100

const resetChangeHistory = (nextState: ThemeState) => {
	Object.keys(changeHistory).forEach((key) => void delete changeHistory[key])
	currentVersion = -1
	nextState.canUndo = false
	nextState.canRedo = false
}

// All UNDOABLE_ACTIONS must also be SAVEABLE_ACTIONS
const UNDOABLE_ACTIONS = [
	CREATE_THEME_VALUE,
	UPDATE_THEME_VALUE,
	DELETE_THEME_VALUE,
	CREATE_THEME_VARIANT,
	UPDATE_THEME_VARIANT,
	DELETE_THEME_VARIANT,
	SAVE_IMPORTED_SKETCH_VALUES,
]

export const SAVEABLE_ACTIONS = [
	UNDO,
	REDO,
	...UNDOABLE_ACTIONS,
]

/* eslint-disable complexity */
export const themeReducer = (
	state: ThemeState = initialThemeState,
	action: ThemeActionType,
): ThemeState => {
	return produce(state, (nextState) => {
		switch (action.type) {
			case UNDO: {
				if (!changeHistory[currentVersion]) {
					break
				}

				return produce(
					applyPatches(state, changeHistory[currentVersion--].undo),
					(nextState: ThemeState) => {
						nextState.canUndo = changeHistory.hasOwnProperty(currentVersion)
						nextState.canRedo = true
					},
				) as any
			}

			case REDO: {
				if (!changeHistory[currentVersion + 1]) {
					break
				}

				return produce(
					applyPatches(state, changeHistory[++currentVersion].redo),
					(nextState: ThemeState) => {
						nextState.canUndo = true
						nextState.canRedo = changeHistory.hasOwnProperty(currentVersion + 1)
					},
				) as any
			}

			case SET_THEME_DATA: {
				const { values, variants, skipResetChangeHistory } = action.payload

				if (!skipResetChangeHistory) {
					resetChangeHistory(nextState)
				}

				// TO DO: Make sure this doesn't confuse you later...
				// Some ThemeValue['type']s are filtered out here, like zIndex

				Object.keys(nextState.values).forEach((key: keyof typeof nextState['values']) => {
					nextState.values[key] = []
				})

				values.forEach((value) => {
					const key = themeTypePropertyMap[value.type]

					if (nextState.values.hasOwnProperty(key)) {
						nextState.values[key].push(value as any)
					}
				})

				nextState.variants = variants
				break
			}

			case RESET_THEME_STATE: {
				resetChangeHistory(nextState)
				nextState.values = initialThemeState.values
				nextState.variants = initialThemeState.variants
				nextState.importedSketchValues = initialThemeState.importedSketchValues
				nextState.importedSketchFontFamilyNames = initialThemeState.importedSketchFontFamilyNames
				break
			}

			case SET_IMPORTED_SKETCH_VALUES: {
				const { colors, fonts, fontSizes, fontWeights, lineHeights, letterSpacings, borderWidths, shadows } = action.payload
				const { systemFonts } = state

				// These are stored separately because we need systemFonts to update importedSketchValues.fonts
				nextState.importedSketchFontFamilyNames = fonts

				const typefaces = fonts.map((fontFamilyName) => systemFonts[fontFamilyName]).filter((v) => v !== undefined).map((sf) => sf.typefaces).flat()

				nextState.importedSketchValues = {
					colors: colors.map(([ name, value ]) => createThemeValue([], 'color', { name, value })),
					// Fonts are also updated in SET_SYSTEM_FONTS once systemFonts have loaded
					fonts: typefaces.map(({ _name, family }) => createThemeValue([], 'font', { name: _name, typeface: _name, family, value: _name })),
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
				action.payload.forEach((newThemeValue) => {
					const key = themeTypePropertyMap[newThemeValue.type]

					if (!newThemeValue.willOverwriteByName) {
						delete newThemeValue.willOverwriteByName
						nextState.values[key].push(newThemeValue as any)
						return
					}

					const { name } = newThemeValue as (ThemeValue & { name: string })
					const index = nextState.values[key].findIndex((v: ThemeValue) => (v as any).name === name)

					if (index === undefined) {
						throw Error(`Could not locate ThemeValue with name "${name}"`)
					}

					nextState.values[key][index].value = newThemeValue.value
				})

				nextState.importedSketchValues = initialThemeState.importedSketchValues
				break
			}

			case CREATE_THEME_VALUE: {
				const key = themeTypePropertyMap[action.payload.type]
				const value = createThemeValue(
					nextState.values[key],
					action.payload.type,
					action.payload,
				)
				nextState.values[key].push(value as any)
				break
			}

			case UPDATE_THEME_VALUE: {
				const { id, type } = action.payload
				const key = themeTypePropertyMap[type]

				const index = nextState.values[key].findIndex((value: ThemeValue) => value.id === id)

				if (index === undefined) {
					throw findThemeValueByIdError(id)
				}

				nextState.values[key][index] = action.payload
				break
			}

			case DELETE_THEME_VALUE: {
				const { id, type } = action.payload
				const key = themeTypePropertyMap[type]

				const index = nextState.values[key].findIndex((value: ThemeValue) => value.id === id)

				if (index === -1) {
					throw findThemeValueByIdError(id)
				}

				nextState.values[key].splice(index, 1)

				// Update any ThemeVariant style which references the deleted ThemeValue
				nextState.variants.forEach((variant) => deleteValueFromVariantStyles(id, variant.styles))

				break
			}

			case CREATE_THEME_VARIANT: {
				const value = createThemeVariant(
					nextState.variants,
					action.payload.variantType,
					action.payload,
				)
				nextState.variants.push(value)
				break
			}

			case UPDATE_THEME_VARIANT: {
				const { id } = action.payload

				const index = nextState.variants.findIndex((variant) => variant.id === id)

				if (index === undefined) {
					throw findThemeVariantByIdError(id)
				}

				nextState.variants[index] = action.payload
				break
			}

			case DELETE_THEME_VARIANT: {
				const { id } = action.payload

				const index = nextState.variants.findIndex((variant) => variant.id === id)

				if (index === -1) {
					throw findThemeVariantByIdError(id)
				}

				nextState.variants.splice(index, 1)

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

				// Update importedSketchValues.fonts now that systemFonts have loaded
				const typefaces = state.importedSketchFontFamilyNames.map((fontFamilyName) => systemFontsDictionary[fontFamilyName]).filter((v) => v !== undefined).map((sf) => sf.typefaces).flat()
				nextState.importedSketchValues.fonts = typefaces.map(({ _name, family }) => createThemeValue([], 'font', { name: _name, typeface: _name, family, value: _name }))

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
