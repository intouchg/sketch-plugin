import type { ThemeValue, ThemeGroup, ThemeComponent, ThemeSnippet } from '@i/theme'
import type { ThemeState } from './state'

export const UNDO = 'UNDO'
export type UndoAction = {
    type: typeof UNDO
    payload: undefined
}
export const undoAction = (): UndoAction => ({
	type: UNDO,
	payload: undefined,
})

export const REDO = 'REDO'
export type RedoAction = {
    type: typeof REDO
    payload: undefined
}
export const redoAction = (): RedoAction => ({
	type: REDO,
	payload: undefined,
})

export const SET_THEME_DATA = 'SET_THEME_DATA'
export type SetThemeAction = {
    type: typeof SET_THEME_DATA
    payload: {
        values: ThemeValue[]
        groups: ThemeGroup[]
        components: ThemeComponent[]
        snippets: ThemeSnippet[]
    }
}
export const setThemeData = (theme: SetThemeAction['payload']): SetThemeAction => ({
	type: SET_THEME_DATA,
	payload: theme,
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
export const updateThemeValue = (value: ThemeValue): UpdateThemeValueAction => ({
	type: UPDATE_THEME_VALUE,
	payload: value,
})

export const DELETE_THEME_VALUE = 'DELETE_THEME_VALUE'
export type DeleteThemeValueAction = {
    type: typeof DELETE_THEME_VALUE
    payload: { id: string }
}
export const deleteThemeValue = ({ id }: DeleteThemeValueAction['payload']): DeleteThemeValueAction => ({
	type: DELETE_THEME_VALUE,
	payload: { id },
})

export const CREATE_THEME_GROUP = 'CREATE_THEME_GROUP'
export type CreateThemeGroupAction = {
    type: typeof CREATE_THEME_GROUP
    payload: Partial<ThemeGroup> & { groupType: ThemeGroup['groupType'] }
}
export const createThemeGroup = (value: CreateThemeGroupAction['payload']): CreateThemeGroupAction => ({
	type: CREATE_THEME_GROUP,
	payload: value,
})

export const UPDATE_THEME_GROUP = 'UPDATE_THEME_GROUP'
export type UpdateThemeGroupAction = {
    type: typeof UPDATE_THEME_GROUP
    payload: ThemeGroup
}
export const updateThemeGroup = (group: ThemeGroup): UpdateThemeGroupAction => ({
	type: UPDATE_THEME_GROUP,
	payload: group,
})

export const DELETE_THEME_GROUP = 'DELETE_THEME_GROUP'
export type DeleteThemeGroupAction = {
    type: typeof DELETE_THEME_GROUP
    payload: { id: string }
}
export const deleteThemeGroup = ({ id }: DeleteThemeGroupAction['payload']): DeleteThemeGroupAction => ({
	type: DELETE_THEME_GROUP,
	payload: { id },
})

export const SET_SELECTED_COLOR = 'SET_SELECTED_COLOR'
export type SetSelectedColorAction = {
    type: typeof SET_SELECTED_COLOR
    payload: { id: string, value: string }
}
export const setSelectedColor = ({ id, value }: SetSelectedColorAction['payload']): SetSelectedColorAction => ({
	type: SET_SELECTED_COLOR,
	payload: { id, value },
})

export const SET_DELETING_VALUE = 'SET_DELETING_VALUE'
export type SetDeletingValueAction = {
    type: typeof SET_DELETING_VALUE
    payload: ThemeState['deletingValue']
}
export const setDeletingValue = ({ id, message }: SetDeletingValueAction['payload']): SetDeletingValueAction => ({
	type: SET_DELETING_VALUE,
	payload: { id, message },
})

export const SET_SELECTED_COMPONENT = 'SET_SELECTED_COMPONENT'
export type SetSelectedComponentAction = {
    type: typeof SET_SELECTED_COMPONENT
    payload: ThemeState['selectedComponent']
}
export const setSelectedComponent = ({ id }: SetSelectedComponentAction['payload']): SetSelectedComponentAction => ({
	type: SET_SELECTED_COMPONENT,
	payload: { id },
})

export const SAVE_THEME_DATA = 'SAVE_THEME_DATA'
export type SaveThemeDataAction = {
    type: typeof SAVE_THEME_DATA
    payload: undefined
}
export const saveThemeData = (): SaveThemeDataAction => ({
	type: SAVE_THEME_DATA,
	payload: undefined,
})

export type ThemeActionType =
    UndoAction
    | RedoAction
    | SetThemeAction
    | CreateThemeValueAction
    | UpdateThemeValueAction
    | DeleteThemeValueAction
    | CreateThemeGroupAction
    | UpdateThemeGroupAction
    | DeleteThemeGroupAction
    | SetSelectedColorAction
    | SetDeletingValueAction
    | SetSelectedComponentAction
    | SaveThemeDataAction
