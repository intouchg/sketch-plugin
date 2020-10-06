import type { ThemeValue, ThemeGroup, ThemeComponent, ThemeVariant, ThemeSnippet, ThemeColor } from '@i/theme'

export type ThemeState = {
	canUndo: boolean
	canRedo: boolean
	values: ThemeValue[]
	groups: ThemeGroup[]
	components: ThemeComponent[]
	variants: ThemeVariant[]
	snippets: ThemeSnippet[]
	selectedColor: ThemeColor
	deletingValue: { id: string, message?: string }
	selectedComponent: { id: string }
}

export const initialState: ThemeState = {
	canUndo: false,
	canRedo: false,
	values: [] as ThemeValue[],
	groups: [] as ThemeGroup[],
	components: [] as ThemeComponent[],
	variants: [] as ThemeVariant[],
	snippets: [] as ThemeSnippet[],
	selectedColor: {} as ThemeColor,
	deletingValue: { id: '', message: '' },
	selectedComponent: { id: '' },
}
