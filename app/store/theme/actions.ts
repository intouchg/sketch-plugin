import type { ThemeValue, ThemeVariant } from '@intouchg/theme'
import type { ThemeData } from './state'
import type { RawImportedSketchValues, DirectoryFilepath, SPFontData } from '../../sketchApi'

export const UNDO = 'UNDO'
export type UndoAction = {
    type: typeof UNDO
    payload: undefined
}
export const undo = (): UndoAction => ({
	type: UNDO,
	payload: undefined,
})

export const REDO = 'REDO'
export type RedoAction = {
    type: typeof REDO
    payload: undefined
}
export const redo = (): RedoAction => ({
	type: REDO,
	payload: undefined,
})

export const RESET_THEME_STATE = 'RESET_THEME_STATE'
export type ResetThemeStateAction = {
    type: typeof RESET_THEME_STATE
    payload: undefined
}
export const resetThemeState = (): ResetThemeStateAction => ({
	type: RESET_THEME_STATE,
	payload: undefined,
})

export const SET_THEME_DATA = 'SET_THEME_DATA'
export type SetThemeDataAction = {
    type: typeof SET_THEME_DATA
    payload: ThemeData & { skipResetChangeHistory?: boolean }
}
export const setThemeData = (payload: SetThemeDataAction['payload']): SetThemeDataAction => ({
	type: SET_THEME_DATA,
	payload: payload,
})

export const SET_RECENT_PROJECTS = 'SET_RECENT_PROJECTS'
export type SetRecentProjectsAction = {
    type: typeof SET_RECENT_PROJECTS
    payload: DirectoryFilepath[]
}
export const setRecentProjects = (recentProjects: SetRecentProjectsAction['payload']): SetRecentProjectsAction => ({
	type: SET_RECENT_PROJECTS,
	payload: recentProjects,
})

export const SET_SKETCH_DOCUMENT_NAMES = 'SET_SKETCH_DOCUMENT_NAMES'
export type SetSketchDocumentNamesAction = {
    type: typeof SET_SKETCH_DOCUMENT_NAMES
    payload: string[]
}
export const setSketchDocumentNames = (sketchDocumentNames: SetSketchDocumentNamesAction['payload']): SetSketchDocumentNamesAction => ({
	type: SET_SKETCH_DOCUMENT_NAMES,
	payload: sketchDocumentNames,
})

export const SET_IMPORTED_SKETCH_VALUES = 'SET_IMPORTED_SKETCH_VALUES'
export type SetImportedSketchValuesAction = {
    type: typeof SET_IMPORTED_SKETCH_VALUES
    payload: RawImportedSketchValues
}
export const setImportedSketchValues = (styles: SetImportedSketchValuesAction['payload']): SetImportedSketchValuesAction => ({
	type: SET_IMPORTED_SKETCH_VALUES,
	payload: styles,
})

export const SAVE_IMPORTED_SKETCH_VALUES = 'SAVE_IMPORTED_SKETCH_VALUES'
export type SaveImportedSketchValuesAction = {
    type: typeof SAVE_IMPORTED_SKETCH_VALUES
    payload: (ThemeValue & { willOverwriteByName?: boolean })[]
}
export const saveImportedSketchValues = (values: SaveImportedSketchValuesAction['payload']): SaveImportedSketchValuesAction => ({
	type: SAVE_IMPORTED_SKETCH_VALUES,
	payload: values,
})

export const SET_SYSTEM_FONTS = 'SET_SYSTEM_FONTS'
export type SetSystemFontsAction = {
    type: typeof SET_SYSTEM_FONTS
    payload: SPFontData
}
export const setSystemFonts = (fonts: SetSystemFontsAction['payload']): SetSystemFontsAction => ({
	type: SET_SYSTEM_FONTS,
	payload: fonts,
})

export const CREATE_THEME_VALUE = 'CREATE_THEME_VALUE'
export type CreateThemeValueAction = {
    type: typeof CREATE_THEME_VALUE
    payload: Partial<ThemeValue> & { type: ThemeValue['type'] }
}
export const createThemeValue = (value: CreateThemeValueAction['payload']): CreateThemeValueAction => ({
	type: CREATE_THEME_VALUE,
	payload: value,
})

export const UPDATE_THEME_VALUE = 'UPDATE_THEME_VALUE'
export type UpdateThemeValueAction = {
    type: typeof UPDATE_THEME_VALUE
    payload: ThemeValue
}
export const updateThemeValue = (value: UpdateThemeValueAction['payload']): UpdateThemeValueAction => ({
	type: UPDATE_THEME_VALUE,
	payload: value,
})

export const DELETE_THEME_VALUE = 'DELETE_THEME_VALUE'
export type DeleteThemeValueAction = {
    type: typeof DELETE_THEME_VALUE
    payload: { id: string, type: ThemeValue['type'] }
}
export const deleteThemeValue = (payload: DeleteThemeValueAction['payload']): DeleteThemeValueAction => ({
	type: DELETE_THEME_VALUE,
	payload,
})

export const CREATE_THEME_VARIANT = 'CREATE_THEME_VARIANT'
export type CreateThemeVariantAction = {
    type: typeof CREATE_THEME_VARIANT
    payload: Partial<ThemeVariant> & { variantType: ThemeVariant['variantType'] }
}
export const createThemeVariant = (variant: CreateThemeVariantAction['payload']): CreateThemeVariantAction => ({
	type: CREATE_THEME_VARIANT,
	payload: variant,
})

export const UPDATE_THEME_VARIANT = 'UPDATE_THEME_VARIANT'
export type UpdateThemeVariantAction = {
    type: typeof UPDATE_THEME_VARIANT
    payload: ThemeVariant
}
export const updateThemeVariant = (variant: UpdateThemeVariantAction['payload']): UpdateThemeVariantAction => ({
	type: UPDATE_THEME_VARIANT,
	payload: variant,
})

export const DELETE_THEME_VARIANT = 'DELETE_THEME_VARIANT'
export type DeleteThemeVariantAction = {
    type: typeof DELETE_THEME_VARIANT
    payload: { id: string }
}
export const deleteThemeVariant = (payload: DeleteThemeVariantAction['payload']): DeleteThemeVariantAction => ({
	type: DELETE_THEME_VARIANT,
	payload,
})

export type ThemeActionType =
    | UndoAction
    | RedoAction
    | ResetThemeStateAction
    | SetThemeDataAction
    | SetRecentProjectsAction
    | SetSketchDocumentNamesAction
    | SetImportedSketchValuesAction
    | SaveImportedSketchValuesAction
    | SetSystemFontsAction
    | CreateThemeValueAction
    | UpdateThemeValueAction
    | DeleteThemeValueAction
    | CreateThemeVariantAction
    | UpdateThemeVariantAction
    | DeleteThemeVariantAction
